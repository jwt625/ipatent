"""Stage 0: cache Google Patents pages and PDFs, print one JSON bibliography record per document.

Usage: python3 -I pipeline/fetch.py [--pdf] [--uspto] [--pause 5] <google-id> ...   (e.g. US8109173B2 EP0200202A2)
Page HTML -> work/_research/google/<id>.html; with --pdf the document -> work/_research/pdf/<id>.pdf.
--uspto: US grants only, PDF straight from the USPTO print endpoint, no Google request at all.
Stops at the first 403/429/503.
Skips anything already cached. Appends every attempt to work/_research/fetch-<timestamp>.jsonl.
sources/<pn>.pdf is written only by hand once a document is accepted, so this never touches ingested data.
"""
import argparse
import html
import json
import re
import time
import urllib.request
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CACHE = ROOT / "work" / "_research"
UA = {"User-Agent": "Mozilla/5.0 (Macintosh) interactive-patents-research"}


def http(url: str) -> bytes:
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60).read()


def metas(page: str, name: str) -> list[str]:
    return [html.unescape(m) for m in re.findall(rf'<meta name="{re.escape(name)}" content="([^"]*)"', page)]


def parse(gid: str, page: str) -> dict:
    title = re.search(r'<span itemprop="title">(.*?)</span>', page, re.S)
    pdf = re.search(r'https://patentimages\.storage\.googleapis\.com/[^"\s]*\.pdf', page)
    claims = re.search(r'<section itemprop="claims"[^>]*>\s*<h2>Claims \(<span itemprop="count">(\d+)', page)
    contrib = metas(page, "DC.contributor")
    assignee = re.findall(r'<dd itemprop="assigneeOriginal"[^>]*>(.*?)</dd>', page) or \
        re.findall(r'itemprop="assigneeCurrent"[^>]*>\s*(.*?)\s*<', page)
    dates = metas(page, "DC.date")
    return {
        "id": gid,
        "title": html.unescape(title.group(1)).strip() if title else None,
        "people": contrib,
        "assignee": [html.unescape(a).strip() for a in assignee[:2]],
        "filed": dates[0] if dates else None,
        "published": dates[-1] if dates else None,
        "status": (re.findall(r'itemprop="status">(.*?)<', page) or [None])[0],
        "expiration": (re.findall(r'itemprop="expiration" datetime="([^"]*)"', page) or [None])[0],
        "drawing_images": len(re.findall(r'<li itemprop="images"', page)),
        "claims": int(claims.group(1)) if claims else None,
        "cited_by": len({m.group(1) for row in re.findall(r'<tr itemprop="forwardReferences[^"]*"[^>]*>(.*?)</tr>', page, re.S)
                         if (m := re.search(r'itemprop="publicationNumber">([^<]*)', row))}),  # tables overlap
        "pdf_url": pdf.group(0) if pdf else None,
        "url": f"https://patents.google.com/patent/{gid}/en",
    }


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("ids", nargs="+")
    ap.add_argument("--pdf", action="store_true")
    ap.add_argument("--uspto", action="store_true")
    ap.add_argument("--pause", type=float, default=5.0, help="seconds between network requests")
    a = ap.parse_args()
    (CACHE / "google").mkdir(parents=True, exist_ok=True)
    (CACHE / "pdf").mkdir(parents=True, exist_ok=True)
    log = CACHE / f"fetch-{datetime.now():%Y%m%dT%H%M%S}.jsonl"
    for gid in a.ids:
        rec = {"id": gid, "at": datetime.now().isoformat(timespec="seconds")}
        try:
            if a.uspto:
                g = CACHE / "pdf" / f"{gid}.pdf"
                rec["pdf"] = "cached"
                if not g.exists():
                    num = re.sub(r"^US|[A-Z]\d?$", "", gid)
                    g.write_bytes(http(f"https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/{num}"))
                    rec["pdf"] = "fetched"
                    time.sleep(a.pause)
                rec["pdf_bytes"] = g.stat().st_size
                print(json.dumps(rec))
                with log.open("a") as out:
                    out.write(json.dumps(rec) + "\n")
                continue
            f = CACHE / "google" / f"{gid}.html"
            if not f.exists():
                f.write_bytes(http(f"https://patents.google.com/patent/{gid}/en"))
                rec["page"] = "fetched"
                time.sleep(a.pause)
            else:
                rec["page"] = "cached"
            info = parse(gid, f.read_text(errors="replace"))
            rec.update(info)
            if a.pdf and info["pdf_url"]:
                g = CACHE / "pdf" / f"{gid}.pdf"
                rec["pdf"] = "cached"
                if not g.exists():
                    g.write_bytes(http(info["pdf_url"]))
                    rec["pdf"] = "fetched"
                    time.sleep(a.pause)
                rec["pdf_bytes"] = g.stat().st_size
        except Exception as e:  # the log records what failed and why
            rec["error"] = f"{type(e).__name__}: {e}"
            time.sleep(a.pause)
        with log.open("a") as out:
            out.write(json.dumps(rec, ensure_ascii=False) + "\n")
        print(json.dumps(rec, ensure_ascii=False))
        if "HTTP Error 403" in rec.get("error", "") or "HTTP Error 429" in rec.get("error", "") \
                or "HTTP Error 503" in rec.get("error", ""):
            raise SystemExit(f"stopping on anti-bot signal at {gid}: {rec['error']}")


if __name__ == "__main__":
    main()
