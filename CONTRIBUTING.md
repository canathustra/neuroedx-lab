# Contributing

Thank you for helping make EMG/NCS education safer and more accessible.

## Before opening a change

- Read `DATA_POLICY.md` and `CLINICAL_GOVERNANCE.md`.
- Never include patient-derived or copyrighted third-party material.
- Open an issue for a new nerve, protocol, interpretation claim, or major interface change.
- Keep each pull request focused on one learning objective or technical improvement.

## Quality checks

```bash
node --test ncs-core.test.mjs
```

Clinical changes must state the learner and intended skill, sources, technical confounders, limitations, and qualified clinician reviewer. Summarize sources in original language; do not paste source text.

Keep signal generation deterministic, test formulas and units, preserve accessible controls, and retain the educational-use and synthetic-data notices.

By contributing, you agree that your contribution is licensed under Apache-2.0.
