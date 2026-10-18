# NeuroEDX Lab

NeuroEDX Lab is a clinician-led, open-source simulator for learning how to perform and interpret EMG/NCS studies without patient data.

**Türkçe:** Gerçek hasta verisi kullanmadan EMG/NCS uygulama tekniği, ölçüm zinciri ve yorumlama eğitimi.

The first module teaches median motor nerve conduction recording from the abductor pollicis brevis (APB). Learners adjust stimulation, place onset markers, enter segment distance, and receive technique-first feedback before interpreting a synthetic pattern.

**Archived (October 2026):** this repository is read-only. The simulator now lives on the main website: <https://www.ucugur.workers.dev/lab>.

**Status:** Educational prototype. The current simulator covers median motor NCS / APB recording. Broader protocol coverage and a tagged v0.1 release remain roadmap goals.

## Start here

| Resource | Purpose | Open |
|---|---|---|
| Median motor NCS simulator | Stimulation, CMAP onset markers, segment distance, and technique-first feedback | [Public demo](https://www.ucugur.workers.dev/lab) or run locally |
| Interactive MUAP presentation | Turkish teaching deck with 121 progressive slides | [Presentation file](presentation/MUAP_Hazir_Sunum.html) · [Scope and controls](presentation/README.md) |

The repository presentation and the presentation on the live site are separate versions; the slide count above describes this repository.

## Live demo

Try the public simulator at [www.ucugur.workers.dev/lab](https://www.ucugur.workers.dev/lab). It uses synthetic teaching scenarios only and is intended for education, not diagnosis or patient care.

## Why this project exists

NCS education often depends on access to a laboratory, proprietary teaching material, or identifiable clinical recordings. NeuroEDX Lab starts with a safer baseline:

- deterministic synthetic waveforms;
- explicit technical-quality checks before interpretation;
- no patient records, images, reports, or physiological source data;
- transparent formulas and testable scenario logic;
- a Turkish-first interface that can be localized;
- zero runtime dependencies and no build step.

## Current simulator scope

- Median motor NCS / APB recording setup
- Wrist and elbow stimulation controls
- Simulated supramaximal-response plateau
- Interactive CMAP onset markers
- Segment-distance entry and conduction-velocity calculation
- Three teaching scenarios: adequate technique, submaximal stimulation, and segmental slowing
- A concise prepare → record → verify protocol

The simulator deliberately avoids universal diagnostic cutoffs. Reference values depend on technique, laboratory validation, age, anthropometrics, and temperature. The scenarios are teaching models, not normative datasets.

## Interactive MUAP presentation

The repository also includes [MUAP_Hazir_Sunum.html](presentation/MUAP_Hazir_Sunum.html), a self-contained, Turkish-language teaching presentation with 121 progressive slides on motor-unit action potential analysis. Open it directly in a modern browser and use the arrow controls to advance each concept.

- All waveforms and anatomical views are authored teaching schematics, not patient recordings.
- The presentation contains no patient identifiers or patient-derived source data.
- Source labels and educational boundaries are shown inside the presentation.
- It is educational material, not a diagnostic aid or normative reference dataset.

See [presentation/README.md](presentation/README.md) for scope and controls.

## Run locally

Clone the repository and enter its directory:

```bash
git clone https://github.com/canathustra/neuroedx-lab.git
cd neuroedx-lab
```

Serve the repository with any static HTTP server. For example, with Python 3:

```bash
python3 -m http.server 8000
```

On Windows with the Python launcher:

```powershell
py -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in a modern browser. The simulator uses JavaScript modules, so serve it over HTTP. No package installation or build step is required.

To run the calculation tests with Node.js and its built-in test runner:

```bash
node --test ncs-core.test.mjs
```

## Repository map

| Path | Contents |
|---|---|
| [index.html](index.html), [styles.css](styles.css) | Simulator interface and styling |
| [app.mjs](app.mjs) | Teaching scenarios, controls, and feedback |
| [ncs-core.mjs](ncs-core.mjs), [ncs-core.test.mjs](ncs-core.test.mjs) | Calculation functions and tests |
| [presentation/](presentation/) | Self-contained MUAP teaching presentation |
| [DATA_POLICY.md](DATA_POLICY.md), [CLINICAL_GOVERNANCE.md](CLINICAL_GOVERNANCE.md) | Data boundaries and review requirements |

## Calculation

```text
conduction velocity (m/s) = segment distance (cm) × 10 / latency difference (ms)
```

The waveform generator and recruitment curve are deterministic pedagogic models. They do not model a biological population and must not be used for research inference or patient care.

## Clinical and data safety

- Educational use only; not a medical device.
- Not for diagnosis, reporting, treatment, or patient-specific decisions.
- Do not upload or contribute protected health information or patient-derived waveforms.
- Clinical content changes require a traceable source and clinician review.

See [DATA_POLICY.md](DATA_POLICY.md) and [CLINICAL_GOVERNANCE.md](CLINICAL_GOVERNANCE.md).

## Evidence starting points

- Chen S, et al. *Electrodiagnostic reference values for upper and lower limb nerve conduction studies in adult populations.* Muscle Nerve. 2016. [PubMed](https://pubmed.ncbi.nlm.nih.gov/27238640/)
- Dillingham T, et al. *Establishing high-quality reference values for nerve conduction studies.* Muscle Nerve. 2016. [PubMed](https://pubmed.ncbi.nlm.nih.gov/27238858/)
- Morris J. *Methods of warming and maintaining limb temperature during nerve conduction studies.* Neurodiagn J. 2013. [PubMed](https://pubmed.ncbi.nlm.nih.gov/24046972/)
- [IFCN-endorsed guidelines](https://www.ifcn.info/publications/ifcn-endorsed-guidelines)

These links are references, not copied source material. No textbook pages, proprietary figures, or clinical recordings are included.

## Contributing

Clinical neurophysiologists, neurologists, physiatrists, technologists, educators, designers, and developers are welcome. Start with [CONTRIBUTING.md](CONTRIBUTING.md). The planned development path is in [ROADMAP.md](ROADMAP.md); roadmap entries do not imply completed features or clinical review. See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for participation and [SECURITY.md](SECURITY.md) for reporting a security or sensitive-data concern.

## Related projects

- [Clinical Neurology Portfolio](https://github.com/canathustra/clinical-neurology-portfolio): the public teaching-material archive.
- [AFV Benchmark](https://github.com/canathustra/afv-benchmark): exploratory EEG alpha-frequency research software.

## License

Apache License 2.0. See [LICENSE](LICENSE) and [NOTICE](NOTICE) for attribution and third-party rights.
