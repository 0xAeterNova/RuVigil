# RuVigil

RuVigil is a camera-free room monitoring project based on the open-source
`ruvnet/RuView` WiFi CSI sensing stack. This fork profile focuses on elderly
care, fitness monitoring, fall detection, and crowd occupancy with a room limit
of 8 people.
RuVigil is a camera-free room monitoring system for privacy-focused presence,
vitals, fall detection, and crowd occupancy workflows.

It is designed for a five-node ESP32-S3 room deployment, local visualization,
and an AI analysis module that reviews live/exported readings and recommends
actions when a problem is detected.

## Start Here

Use the guide for your operating system:

- [START_WINDOWS.md](START_WINDOWS.md) - Windows / PowerShell setup, flashing, provisioning, server, UI, and AI analyzer.
- [START_LINUX.md](START_LINUX.md) - Linux terminal setup, flashing, provisioning, server, UI, and AI analyzer.

Both startup guides are written for five ESP32-S3 nodes with:

```text
WiFi SSID:       RuVigil_Network
WiFi password:   Ruvigil_1234!@#$
Node IDs:        0, 1, 2, 3, 4
Room max:        8 people
```

## Supported Modes

- Auto-Cycle
- Fall Detect
- Crowd (4-8 PPL, maximum 8 people in one room)

## Vitals
## Vitals And Signals

RuVigil displays and analyzes:

- Heart rate
- Respiratory rate
- Body temperature

Body temperature is a host-side/fused field named `body_temperature_c`. WiFi CSI
does not directly measure temperature, so production deployments need an
external thermometer or trusted fused sensor source for real temperature data.
- Presence
- Fall detection
- Crowd occupancy

## What Is Included
Body temperature uses the host-side/fused field `body_temperature_c`. WiFi CSI
does not directly measure temperature, so real deployments need an external
thermometer, fused sensor source, or trusted imported temperature stream.

- Upstream RuView repository files and submodules.
- Existing firmware release binaries under
  `firmware/esp32-csi-node/release_bins/`.
- RuVigil web branding and color palette.
- Body-temperature fields in web, mobile, Python, MCP, MQTT, and server paths.
- Firmware source defaults for an 8-person RuVigil room profile.
- Deployment data under `data/`.
- Browser and CLI AI analysis modules.
## Project Layout

## Quick Start
```text
firmware/esp32-csi-node/release_bins/     ESP32-S3 firmware binaries
firmware/esp32-csi-node/provision.py      ESP32-S3 WiFi/NVS provisioning helper
v2/crates/wifi-densepose-sensing-server/  Rust sensing server
ui/observatory.html                       Main RuVigil visualization
ui/pose-fusion.html                       Pose fusion visualization
ui/viz.html                               3D visualization
dashboard/                                Web dashboard
data/                                     Deployment JSON, JSONL, and CSV files
ai_module/                                RuVigil AI analyzer
START_WINDOWS.md                          Windows startup guide
START_LINUX.md                            Linux startup guide
RUVIGIL_BUILD_GUIDE.md                    Build and deployment notes
```

Run the Observatory UI:
## Quick Local UI Check

```powershell
cd ui
python -m http.server 8090
python -m http.server 8090 --directory ui --bind 127.0.0.1
```

Open:
```
http://127.0.0.1:8090/observatory.html
```

Run the AI analyzer on sample data:
On Linux, use the same command with `python3`:

```bash
python3 -m http.server 8090 --directory ui --bind 127.0.0.1
```
