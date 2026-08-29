# NeuroEDX Lab

NeuroEDX Lab is a clinician-led, open-source simulator for learning how to perform and interpret EMG/NCS studies without patient data.

**Türkçe:** Gerçek hasta verisi kullanmadan EMG/NCS uygulama tekniği, ölçüm zinciri ve yorumlama eğitimi.

The first module teaches median motor nerve conduction recording from the abductor pollicis brevis (APB). Learners adjust stimulation, place onset markers, enter segment distance, and receive technique-first feedback before interpreting a synthetic pattern.

## Live demo

Try the public simulator at [edx.ucugur.chatgpt.site](https://edx.ucugur.chatgpt.site). It uses synthetic teaching scenarios only and is intended for education, not diagnosis or patient care.

## Why this project exists

NCS education often depends on access to a laboratory, proprietary teaching material, or identifiable clinical recordings. NeuroEDX Lab starts with a safer baseline:

- deterministic synthetic waveforms;
- explicit technical-quality checks before interpretation;
- no patient records, images, reports, or physiological source data;
- transparent formulas and testable scenario logic;
- a Turkish-first interface that can be localized;
- zero runtime dependencies and no build step.

## v0.1 scope

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

Serve the repository with any static HTTP server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`. To run the calculation tests:

```bash
node --test ncs-core.test.mjs
```

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

Clinical neurophysiologists, neurologists, physiatrists, technologists, educators, designers, and developers are welcome. Start with [CONTRIBUTING.md](CONTRIBUTING.md). The 30-day path is in [ROADMAP.md](ROADMAP.md).

## License

Apache License 2.0. See [LICENSE](LICENSE).
