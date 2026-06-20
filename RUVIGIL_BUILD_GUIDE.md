# RuVigil Build Guide

RuVigil is a fork profile of `ruvnet/RuView` focused on camera-free room
monitoring with:

- Auto-Cycle
- Elderly Care
- Fitness
- Fall Detect
- Crowd occupancy up to 8 people

## What Changed

- Web branding has been moved from RuView/Pi-style marks to RuVigil.
- The Observatory UI uses the RuVigil palette: graphite, signal teal, cobalt,
  coral, and temperature amber.
- Body temperature is part of the host, web, mobile, MQTT, MCP, and AI schemas.
- Crowd capacity is capped at 8 people in the browser and firmware source.
- A browser AI advisor panel and a CLI analyzer were added.
- RuVigil deployment data was added under `data/`.

## Firmware Binaries

The upstream prebuilt binaries are included in:

```text
firmware/esp32-csi-node/release_bins/
```

The source defaults were changed for the RuVigil profile:

- `EDGE_TOP_K = 16`
- `EDGE_MAX_PERSONS = 8`
- `subk_count = 16`

Rebuild firmware before production flashing if you need the binary artifacts to
contain these source-level RuVigil changes. The included `.bin` files are the
downloaded upstream artifacts.

## Body Temperature

WiFi CSI does not directly measure body temperature. RuVigil supports
`body_temperature_c` as a fused field from an external thermometer or another
trusted sensor. If no temperature source is configured, the UI and AI module
show temperature as unavailable or demo-generated.

## Web UI

For the Observatory:

```powershell
cd ui
python -m http.server 8090
```

Open:

```text
http://127.0.0.1:8090/observatory.html
```

## AI Module

Run the analyzer against the sample deployment data:

```powershell
node ai_module/ruvigil-analyzer.mjs data/ruvigil-vitals-sample.csv
```

The browser AI advisor is loaded by:

```text
ui/observatory/js/ai-advisor.js
```

## Data

RuVigil deployment data lives in the existing repository `data/` folder:

- `data/ruvigil-deployment-config.json`
- `data/ruvigil-scenarios.jsonl`
- `data/ruvigil-ai-rules.json`
- `data/ruvigil-vitals-sample.csv`

On Windows, `Data` and `data` resolve to the same folder.
