# Batch 004: 33 patents to double the gallery (33 -> 66)

Date: 2026-11-18

Sources: four research subagents (BSTJ and Bell Labs; online forums and articles; landmark lists: IEEE Milestones, NIHF, CHM,
Smithsonian; topics of the outside5sigma.com blog), about 110 candidates. Every candidate PDF was cached from USPTO
(`pipeline/fetch.py --uspto`, 5 s pacing, no Google requests) and OCR-inventoried: the printed header confirmed number, title and
inventors; drawing sheets read from "N Sheets-Sheet k" / "Sheet k of N". All 33 are expired (grants 1876-1996; the latest, US 5,501,893,
was filed 1994). Selection: landmark weight, at least one pick per source, drawing load kept light (cost scales with figures,
DevLog-002). Figure counts are set by the figure-table agents, not here.

## Selected

| Group | ID | Title (as printed) | Inventors (as printed) | Granted | Sheets | Source | Why | Evidence |
|---|---|---|---|---|---|---|---|---|
| Bell Labs | US1310719A | Secret Signaling System | G. S. Vernam | 1919 | 2 | BSTJ, forums | XOR stream cipher, ancestor of the one-time pad; Shannon BSTJ 28 (1949) | https://www.cryptomuseum.com/crypto/vernam.htm ; https://archive.org/details/bstj28-4-656 |
| Bell Labs | US2552629A | Error-Detecting and Correcting System | R. W. Hamming, B. D. Holbrook | 1951 | 3 | BSTJ | Hamming codes; BSTJ 29 (1950) | https://reach.ieee.org/primary-sources/error-detecting-and-correcting-system-patent/ ; https://archive.org/details/bstj29-2-147 |
| Bell Labs | US2632058A | Pulse Code Communication | F. Gray | 1953 | 4 | BSTJ | Reflected binary (Gray) code | https://en.wikipedia.org/wiki/Frank_Gray_(researcher) |
| Bell Labs | US4135240A | Protection of Data File Contents | D. M. Ritchie | 1979 | 2 | BSTJ, forums | UNIX setuid bit; BSTJ 57 (1978) UNIX issue | https://www.tuhs.org/Archive/Documentation/Papers/US4135240.pdf ; https://news.ycombinator.com/item?id=4027643 |
| Bell Labs | US2569347A | Circuit Element Utilizing Semiconductive Material | W. Shockley | 1951 | 3 | BSTJ, landmark | Junction transistor; BSTJ 28 (1949) | https://www.computerhistory.org/siliconengine/conception-of-the-junction-transistor/ |
| Bell Labs | US3102230A | Electric Field Controlled Semiconductor Device | Dawon Kahng | 1963 | 2 | BSTJ, landmark | MOSFET | https://www.computerhistory.org/semiconductor/timeline/1960-MOS.html |
| Bell Labs | US2663806A | Semiconductor Signal Translating Device | S. Darlington | 1953 | 1 | BSTJ | Darlington pair | https://people.eecs.berkeley.edu/~hodges/DarlingtonCircuit.pdf |
| Bell Labs | US2780765A | Solar Energy Converting Apparatus | D. M. Chapin et al. | 1957 | 1 | BSTJ, landmark | First practical silicon solar cell | https://www.smithsonianmag.com/innovation/document-deep-dive-patent-first-practical-solar-cell-1-180947906/ |
| Bell Labs | US3118022A | Electroacoustic Transducer | G. M. Sessler et al. | 1964 | 2 | BSTJ | Foil electret microphone | https://lemelson.mit.edu/resources/gerhard-sessler-and-james-west |
| Bell Labs | US3858232A | Information Storage Devices | Boyle et al. | 1974 | 8 | BSTJ, landmark | Charge-coupled device; Nobel 2009; BSTJ 49 (1970) | https://www.invent.org/inductees/willard-s-boyle ; https://archive.org/details/bstj49-4-587 |
| Lasers and integrated optics | US2929922A | Masers and Maser Communications System | Schawlow et al. | 1960 | 1 | landmark, BSTJ | Optical maser proposal | https://photonics.com/Articles/US_Patent_2929922/a65759 |
| Lasers and integrated optics | US3353115A | Ruby Laser Systems | T. H. Maiman | 1967 | 5 | landmark | First working laser | https://engineering.stanford.edu/about/history/heroes/2012-heroes/theodore-maiman |
| Lasers and integrated optics | US3245002A | Stimulated Emission Semiconductor Devices | R. N. Hall | 1966 | 2 | landmark, blog | First injection laser | https://ethw.org/Robert_N._Hall |
| Lasers and integrated optics | US3760292A | Integrated Feedback Laser | Kogelnik et al. | 1973 | ~5 | blog | Distributed-feedback laser | https://uspto.report/patent/grant/3760292 |
| Lasers and integrated optics | US4012113A | Adjustable Optical Switch or Modulator | Kogelnik et al. | 1977 | ~5 | blog | Reversed-delta-beta directional-coupler switch | https://patents.justia.com/patent/4012113 |
| Lasers and integrated optics | US3584230A | (prism-film coupler) | Ping K. Tien | 1971 | ~4 | blog | Prism coupling into thin-film guides | cited in https://uspto.report/patent/grant/3883221 |
| Lasers and integrated optics | US5002350A | Optical Multiplexer/Demultiplexer | Dragone | 1991 | ~3 | blog | Arrayed waveguide grating | https://uspto.report/patent/grant/5002350 |
| Lasers and integrated optics | US4474427A | Optical Fiber Reflective Filter | Hill et al. | 1984 | ~2 | blog | First photo-induced fiber Bragg grating | Google Patents search snippet (number, title, inventors confirmed on the USPTO scan) |
| Lasers and integrated optics | US4893886A | Non-Destructive Optical Trap for Biological Particles and Method of Doing Same | Ashkin et al. | 1990 | ~3 | BSTJ reserve, blog | Optical tweezers; Nobel 2018 | https://patents.justia.com/patent/4893886 |
| Chips and microdevices | US3025589A | Method of Manufacturing Semiconductor Devices | J. A. Hoerni | 1962 | 1 | landmark | Planar process; pairs with Noyce US 2,981,877 | https://www.computerhistory.org/siliconengine/invention-of-the-planar-manufacturing-process/ |
| Chips and microdevices | US3006067A | Thermo-Compression Bonding of Metal to Semiconductors, and the Like | O. L. Anderson et al. | 1961 | 1 | blog | Thermocompression wire bonding | https://trea.com/information/3006067/patentgrant/20808b77-438a-45e2-8457-a374011120ef |
| Chips and microdevices | US3343256A | Methods of Making Thru-Connections in Semiconductor Wafers | M. G. Smith et al. | 1967 | 1 | blog | Through-silicon via | https://www.3dincites.com/2010/04/who-invented-the-through-silicon-via-tsv-and-when/ |
| Chips and microdevices | US2832897A | Magnetically Controlled Gating Element | D. A. Buck | 1958 | 5 | blog | Cryotron, first superconducting switch | https://en.wikipedia.org/wiki/Dudley_Allen_Buck |
| Chips and microdevices | US4343993A | Scanning Tunneling Microscope | Binnig et al. | 1982 | ~3 | blog | STM; Nobel 1986 | https://uspto.report/patent/grant/4343993 |
| Chips and microdevices | US4724318A | Atomic Force Microscope and Method for Imaging Surfaces with Atomic Resolution | Binnig | 1988 | ~3 | blog | AFM | https://uspto.report/patent/grant/4724318 |
| Chips and microdevices | US5501893A | Method of Anisotropically Etching Silicon | Laermer et al. | 1996 | 1 | blog | Bosch deep reactive-ion etch | https://uspto.report/patent/grant/5,501,893 |
| Forum favorites | US174465A | Telegraphy | A. G. Bell | 1876 | 2 | landmark | The telephone patent | https://www2.iath.virginia.edu/albell/bpat.1.html |
| Forum favorites | US821393A | Flying-Machine | O. & W. Wright | 1906 | 3 | forums | Wing warping; the Wright patent war | https://news.ycombinator.com/item?id=21490117 |
| Forum favorites | US1329559A | Valvular Conduit | N. Tesla | 1920 | 1 | forums | Tesla valve, fluidic diode | https://news.ycombinator.com/item?id=3552290 |
| Forum favorites | US1781541A | Refrigeration | Einstein et al. | 1930 | 1 | forums | Einstein-Szilard absorption refrigerator | https://en.wikipedia.org/wiki/Einstein_refrigerator |
| Forum favorites | US2292387A | Secret Communication System | H. K. Markey et al. | 1942 | 2 | forums | Lamarr-Antheil frequency hopping | https://news.ycombinator.com/item?id=45852642 |
| Forum favorites | US3475623A | Electronic High-Pass and Low-Pass Filters Employing the Base to Emitter Diode Resistance of Bipolar Transistors | R. A. Moog | 1969 | 5 | forums, landmark | Moog ladder filter | https://www.till.com/articles/moog/US03475623.html |
| Forum favorites | US4063220A | Multipoint Data Communication System with Collision Detection | Metcalfe et al. | 1977 | ~7 | forums, landmark | Ethernet; IEEE Milestone | https://hackaday.com/2020/10/19/ethernet-at-40-from-a-napkin-sketch-to-multi-gigabit-links/ |

"~" sheet counts are estimates from OCR page classification (modern front-page layouts print "Sheet k of N" only on some sheets).

## Reserves (cached in `work/_research/pdf/`, not ingested)
Light (1-2 sheets): US2268872A Hewlett oscillator; US2297691A Carlson xerography; US1745175A Lilienfeld FET; US879532A de Forest audion;
US223898A Edison lamp; US307031A Edison effect; US6469A Lincoln; US748626A Magie Landlord's Game; US2495429A Spencer microwave;
US1102653A Goddard rocket; US1941066A Armstrong FM; US3149290A Bennett-Javan He-Ne laser; US1657411A Scherbius; US2525352A Herzstark Curta;
US3500000A Kelly-Logan echo canceller; US2787564A Shockley ion implantation; US2802760A Frosch-Derick oxide masking; US3401126A, US3429040A Miller C4.
Medium: US3356858A Wanlass CMOS; US3673471A Faggin-Klein silicon gate; US2612994A Woodland-Silver barcode; US4131919A Sasson camera;
US3758875A Hayashi DH laser; US4448479A Alferness; US4284663A Ti:LiNbO3; US4725110A Meltz FBG writing; US5172267A Yablonovitch;
US3413573A Nathanson; US3978351A Zappe; US4302518A Goodenough; US4668595A Yoshino; US4687200A Nintendo d-pad; US3500142A Kahng floating gate.
Heavy, excluded: US2102671A Black (35 sheets); US3819921A Kilby calculator (21); US6198488B1 NVIDIA (42); US4710876A marching cubes (25);
US3663762A Joel handoff (14); US3728480A Baer (12); US1835031A coaxial cable (12); US4309670A (14); US4053845A Gould (11).
