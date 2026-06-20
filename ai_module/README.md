# RuVigil AI Module

This module is step 2 of the RuVigil build: it analyzes the same output fields
shown by the web visualizations and returns a severity, summary, and suggested
actions.

Surfaces:

- Browser panel: `ui/observatory/js/ai-advisor.js`
- CLI analyzer: `ai_module/ruvigil-analyzer.mjs`
- Rules/data: `data/ruvigil-ai-rules.json`

Run a smoke test:

```powershell
node ai_module/ruvigil-analyzer.mjs data/ruvigil-vitals-sample.csv
```

Supported input formats are JSON, JSONL, and CSV. The analyzer expects fields
such as `estimated_persons`, `persons`, `classification.fall_detected`,
`vital_signs.heart_rate_bpm`, `vital_signs.breathing_rate_bpm`, and
`vital_signs.body_temperature_c`.

The analyzer is deterministic decision support. It is not a medical diagnosis
engine; high-severity output should trigger the deployment's verification and
caregiver workflow.
