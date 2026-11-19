# DevLog-002: token and cost usage of the 19-patent batch

| Field | Value |
|---|---|
| Date | 2026-11-04 |
| Status | Done |
| Scope | Tokens and quota used to ingest and trace each patent, from local session transcripts |
| Authors | Claude Code, at Wentao Jiang's request |

## Summary
- Measured: 19 of 32 patents, all from one session, `2abf6585` (DevLog-001 batch; 2026-11-03 07:32 to 17:06 UTC; 112 subagents).
- Total: 679.6M tokens (678.2M Opus 5.5, 1.4M Haiku 5.5), $434.24 at API list prices.
- Dollars are API-equivalent cost, not what was billed.

## Gaps
- Original 13 patents: N/A. No transcripts in Claude Code projects, Codex sessions or the desktop app stores, only later sessions
  mentioning them. Built in PlayGround commits `effa9d2` (2026-10-27) and `4a81d73` (2026-10-28).
- Quota: N/A. No rate-limit or utilization fields in the transcripts, and the debug logs are empty. The session shows no limit errors.
  The proxies below are not a percentage of the plan limit.

## Per patent
Direct subagent usage only. "New" is input + cache write + output tokens; "read" is cache read tokens.

| Patent | Figs | Ingest agents | Trace agents | Ingest new | Ingest read | Ingest $ | Trace new | Trace read | Trace $ | Total tokens | Total $ | Share | $/fig |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| US 11720084 | 94 | 2 | 12 | 0.53M | 5.4M | 5.61 | 4.45M | 88.6M | 57.25 | 98.9M | 62.86 | 16.7% | 0.67 |
| US 20170106964 | 19 | 1 | 5 | 0.30M | 3.1M | 2.81 | 2.07M | 49.4M | 28.82 | 54.8M | 31.63 | 8.4% | 1.66 |
| US 10481866 | 45 | 2 | 9 | 0.56M | 7.0M | 5.93 | 2.17M | 29.9M | 24.53 | 39.6M | 30.46 | 8.1% | 0.68 |
| US 8307732 | 23 | 2 | 9 | 0.35M | 2.9M | 3.27 | 2.22M | 31.0M | 25.78 | 36.5M | 29.06 | 7.7% | 1.26 |
| US 8109173 | 14 | 2 | 6 | 0.40M | 3.2M | 3.82 | 1.94M | 34.6M | 24.93 | 40.2M | 28.75 | 7.6% | 2.05 |
| US 20220106338 | 53 | 2 | 8 | 0.43M | 4.5M | 4.26 | 1.97M | 33.5M | 23.49 | 40.4M | 27.75 | 7.4% | 0.52 |
| EP 0200202 | 12 | 2 | 4 | 0.48M | 3.9M | 4.45 | 1.53M | 35.3M | 21.73 | 41.1M | 26.18 | 7.0% | 2.18 |
| US 7527222 | 21 | 1 | 6 | 0.34M | 3.7M | 3.35 | 1.83M | 31.6M | 22.82 | 37.4M | 26.17 | 7.0% | 1.25 |
| US 9776704 | 16 | 1 | 4 | 0.26M | 2.1M | 2.40 | 1.28M | 21.7M | 16.15 | 25.4M | 18.55 | 4.9% | 1.16 |
| US 8047093 | 7 | 2 | 3 | 0.33M | 3.5M | 3.20 | 0.92M | 14.4M | 11.44 | 19.1M | 14.64 | 3.9% | 2.09 |
| US 11618215 | 11 | 1 | 2 | 0.25M | 2.4M | 2.46 | 0.72M | 12.7M | 9.09 | 16.0M | 11.55 | 3.1% | 1.05 |
| US 1822943 | 11 | 1 | 2 | 0.22M | 1.9M | 2.30 | 0.62M | 16.5M | 9.10 | 19.2M | 11.40 | 3.0% | 1.04 |
| US 1894011 | 5 | 1 | 2 | 0.34M | 3.4M | 3.22 | 0.66M | 9.8M | 7.90 | 14.2M | 11.12 | 3.0% | 2.22 |
| US 9593740 | 9 | 1 | 1 | 0.24M | 2.5M | 2.36 | 0.70M | 12.0M | 7.92 | 15.5M | 10.28 | 2.7% | 1.14 |
| US 4310132 | 6 | 1 | 2 | 0.20M | 1.8M | 1.97 | 0.61M | 7.9M | 7.06 | 10.6M | 9.04 | 2.4% | 1.51 |
| US 5062589 | 6 | 1 | 1 | 0.22M | 1.4M | 2.03 | 0.40M | 7.5M | 5.20 | 9.5M | 7.23 | 1.9% | 1.21 |
| US 5039571 | 15 | 1 | 1 | 0.23M | 2.2M | 2.38 | 0.35M | 7.5M | 4.82 | 10.3M | 7.20 | 1.9% | 0.48 |
| US 1619372 | 7 | 1 | 1 | 0.22M | 2.1M | 2.32 | 0.49M | 5.1M | 4.68 | 7.9M | 6.99 | 1.9% | 1.00 |
| US 1425113 | 2 | 1 | 1 | 0.17M | 1.9M | 1.77 | 0.29M | 3.3M | 3.49 | 5.7M | 5.26 | 1.4% | 2.63 |

## Distribution across the 19 patents

| Metric | Min | P25 | Median | P75 | Max | Sum |
|---|---:|---:|---:|---:|---:|---:|
| Ingest $ | 1.77 | 2.32 | 2.81 | 3.82 | 5.93 | 59.91 |
| Trace $ | 3.49 | 7.06 | 11.44 | 24.53 | 57.25 | 316.20 |
| Total $ | 5.26 | 9.04 | 14.64 | 28.75 | 62.86 | 376.12 |
| Total tokens (M) | 5.7 | 10.6 | 19.2 | 40.2 | 98.9 | 542.3 |
| New tokens (M) | 0.46 | 0.81 | 1.26 | 2.37 | 4.98 | 31.3 |
| $/figure | 0.48 | 1.00 | 1.21 | 2.05 | 2.63 | N/A |
| $/trace agent (n=79) | 1.29 | 3.06 | 3.70 | 4.72 | 7.92 | 316.19 |

## Whole session by phase

| Phase | Agents | Requests | New tokens | Cache read | Output | $ | Share |
|---|---:|---:|---:|---:|---:|---:|---:|
| Ingest (text + figure tables) | 26 | 533 | 6.07M | 58.8M | 1.19M | 59.92 | 13.8% |
| Trace | 79 | 2,991 | 25.23M | 452.2M | 6.64M | 316.19 | 72.8% |
| Research, audits, trace fixes | 7 | 259 | 2.59M | 45.7M | 0.53M | 29.96 | 6.9% |
| Main session (orchestration, build) | 1 | 251 | 0.89M | 86.7M | 0.24M | 27.39 | 6.3% |
| Haiku 5.5 (includes 61 web searches) | N/A | N/A | 1.41M | 0 | 0.10M | 0.79 | 0.2% |
| Total | 113 | 4,034 + Haiku | 36.2M | 643.4M | 8.70M | 434.24 | |

New tokens include output. Per-agent token counts cover Opus 5.5 only; the Haiku row comes from the session's cost record.

Group-level agents:

| Agent | Tokens | $ |
|---|---:|---:|
| Audit aircraft group data | 13.5M | 7.02 |
| Audit Robot wrists group data | 9.4M | 5.65 |
| Audit CBN mechanosynthesis and computing data | 10.6M | 5.36 |
| Shortlist aircraft structures patents | 4.4M | 3.75 |
| Fix traces flagged by audits | 5.0M | 3.11 |
| Research mechanosynthesis patent family | 2.9M | 2.79 |
| Research Kinoshita Fanuc patents | 2.3M | 2.28 |

## Findings
- Trace costs about 5.3x ingest: $0.84 per figure. Including all overhead, the session comes to $1.15 per figure.
- Ingest cost is nearly flat (about 3.4x from min to max); trace cost varies about 16x, mostly with figure count.
- The median trace agent costs $3.70, so more figures mostly means more agents.
- To charge shared work to each patent, multiply its total by about 1.155. This assumes overhead scales with direct cost.
- Opus 5.5 cost by token type: output 39.7% (thinking is about half of output tokens), cache read 29.7%, cache write 30.6%,
  input under 0.1%. Cache reads are 94.9% of tokens.

## Quota proxies
- Burn rate: $432.18 of the $434.24 landed in about 4 hours, 07:32 to 11:36 UTC.
- Hourly, UTC, Opus 5.5: 07h $27.7, 08h $106.1, 09h $140.5, 10h $122.7, 11h $35.1, 16h $1.2, 17h $0.1.
- Weekly share: 31.3% of all local Opus 5.5 usage from 2026-10-27 to 2026-11-03 ($433.45 of $1,385.46). Claude Code on this machine
  only, so not the true share of the weekly limit.

## Method
- Source: the main session transcript and its 112 subagent transcripts in the Claude Code project folder for this repo.
- Requests deduplicated by message ID, since one response spans several transcript lines. No ID appears in more than one file.
- Agents assigned from the description in each subagent's meta file: `Text:`, `Figures:` and `Ingest` are ingest; `Trace` is trace;
  the rest are group-level. The patent number comes from the same description.
- Figure counts from `data/<id>/figures.json`.
- Prices per MTok, from the bundled API reference (cached 2026-10-06): Opus 5.5 $4 input, $20 output, $0.20 cache read, $5 cache write
  5 min, $8 cache write 1 h. Haiku 5.5 $0.10 input, $0.50 output. Haiku is taken from the session's cost record, which also covers
  its 61 web searches.
- Weekly share: message IDs deduplicated across all project folders; files last modified before 2026-10-25 skipped.

## Reconciliation
| Check | Transcripts | Reference |
|---|---:|---:|
| Session cost, Opus 5.5 + Haiku 5.5 | $434.24 | $434.45 (`cost-state` record) |
| Opus 5.5 output tokens | 8,594,428 | 8,598,519 (`cost-state`) |
| Opus 5.5 cache read tokens | 643,438,519 | 644,032,144 (`cost-state`) |
| Figures | 376 | 376 (DevLog-001) |

Applying the prices to the `cost-state` token counts reproduces its per-model cost: $433.66 for Opus 5.5 and $0.79 for Haiku 5.5.
The $0.21 gap is about 0.05%. The transcripts run slightly below the session's own counters.

## Known limits
- Per-agent CSVs and the analysis script were scratch files for this session and are not in the repo.
- Main session work (including regenerating `work/` for the 13 older patents) is not split by patent.
- Group-level audits and trace fixes are not charged to individual patents in the per-patent table.
