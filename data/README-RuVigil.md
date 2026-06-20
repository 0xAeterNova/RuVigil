# RuVigil Data

This folder contains the RuVigil deployment data added on top of the upstream
RuView dataset folder. Windows treats `Data` and `data` as the same path, so the
files live here to preserve the existing repository structure.

Files:

- `ruvigil-deployment-config.json` - deployment profile, enabled scenarios,
  firmware binary inventory, vital schema, and AI module inputs.
- `ruvigil-scenarios.jsonl` - one JSON record per supported scenario.
- `ruvigil-ai-rules.json` - rule thresholds mirrored by the browser and CLI AI
  advisor.
- `ruvigil-vitals-sample.csv` - sample frame-level output for smoke tests,
  demos, and analyzer validation.

Body temperature values are supported by the host schema and AI layer. The ESP32
CSI firmware does not infer temperature from WiFi CSI by itself; deploy an
external thermometer or fused sensor if real temperature is required.
