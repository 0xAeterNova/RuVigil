# RuVigil Five-Node Startup Guide For Linux

This is the ready-to-go Linux terminal runbook for starting RuVigil with five
ESP32-S3 nodes, the RuVigil sensing server, the web visualizations, and the AI
analyzer.

Run commands from the `RuVigil` project folder unless a step says otherwise.
Directory names are written relative to the project folder.

## Deployment Values

Use these values for all five ESP32-S3 nodes:

```text
WiFi SSID:       RuVigil_Network
WiFi password:   Ruvigil_1234!@#$
Node IDs:        0, 1, 2, 3, 4
TDM total nodes: 5
Target chip:     esp32s3
Flash size:      8MB
UDP target port: 5005
```

Firmware binaries used for every node:

```text
firmware/esp32-csi-node/release_bins/bootloader.bin
firmware/esp32-csi-node/release_bins/partition-table.bin
firmware/esp32-csi-node/release_bins/ota_data_initial.bin
firmware/esp32-csi-node/release_bins/esp32-csi-node.bin
```

Flash offsets, matching the repo build guide ESP32 flashing phase:

```text
0x0      bootloader.bin
0x8000   partition-table.bin
0xf000   ota_data_initial.bin
0x20000  esp32-csi-node.bin
```

## 1. Open The Project Folder

Open a Linux terminal and go to the project folder:

```bash
cd RuVigil
```

If `RuVigil` is on the Desktop:

```bash
cd ~/Desktop/RuVigil
```

## 2. Install Required Tools

Ubuntu/Debian:

```bash
sudo apt update
sudo apt install -y python3 python3-pip python3-venv git curl build-essential pkg-config libssl-dev
```

Fedora:

```bash
sudo dnf install -y python3 python3-pip git curl gcc gcc-c++ make pkgconf-pkg-config openssl-devel
```

Arch:

```bash
sudo pacman -Syu --needed python python-pip git curl base-devel pkgconf openssl
```

Check the installed tools:

```bash
python3 --version
node --version
npm --version
cargo --version
git --version
```

If Node.js or Rust is missing, install them with your distro package manager or:

```bash
curl -fsSL https://sh.rustup.rs | sh
. "$HOME/.cargo/env"
```

Install ESP flashing/provisioning tools:

```bash
python3 -m pip install --user --upgrade pip
python3 -m pip install --user "esptool>=5.0" esp-idf-nvs-partition-gen
```

If `python3 -m esptool` cannot find the package after install, reopen the
terminal or add the Python user scripts directory to `PATH`.

Install JavaScript dependencies used by the web dashboard and AI tooling:

```bash
cd dashboard
npm ci
cd ..

cd tools/ruview-mcp
npm ci
cd ../..
```

## 3. Extract The Aggregator IP Address First

The aggregator is the Linux computer running the RuVigil sensing server. The
ESP32-S3 nodes must send packets to this IP address.

Run:

```bash
export AGGREGATOR_IP="$(ip -4 route get 1.1.1.1 | awk '{for (i=1; i<=NF; i++) if ($i=="src") {print $(i+1); exit}}')"
echo "$AGGREGATOR_IP"
```

Confirm the printed IP is on the same network as `RuVigil_Network`.

If the auto-detected IP is wrong, set it manually:

```bash
export AGGREGATOR_IP="192.168.1.20"
```

Keep this same terminal open. The flashing/provisioning commands below reuse
`$AGGREGATOR_IP`.

## 4. Confirm The ESP32-S3 Serial Port

Connect one ESP32-S3 by USB. Flash only one board at a time.

List serial ports:

```bash
ls /dev/ttyUSB* /dev/ttyACM* 2>/dev/null
```

Set the current board port:

```bash
export ESP_PORT="/dev/ttyUSB0"
```

Use `/dev/ttyACM0` instead if that is the port Linux assigned.

Allow your user to access serial devices:

```bash
sudo usermod -aG dialout "$USER" 2>/dev/null || true
sudo usermod -aG uucp "$USER" 2>/dev/null || true
```

Log out and back in after changing groups. For an immediate one-time test, you
can also run:

```bash
sudo chmod a+rw "$ESP_PORT"
```

Verify the connected chip:

```bash
python3 -m esptool --chip esp32s3 --port "$ESP_PORT" chip_id
```

If detection fails, hold BOOT, tap RESET, release BOOT, then retry.

## 5. Flash And Provision Node 0

Connect the ESP32-S3 that will be node `0`.

```bash
export ESP_PORT="/dev/ttyUSB0"

python3 -m esptool --chip esp32s3 --port "$ESP_PORT" --baud 460800 erase_flash

python3 -m esptool --chip esp32s3 --port "$ESP_PORT" --baud 460800 \
  write_flash --flash_mode dio --flash_size 8MB \
  0x0     firmware/esp32-csi-node/release_bins/bootloader.bin \
  0x8000  firmware/esp32-csi-node/release_bins/partition-table.bin \
  0xf000  firmware/esp32-csi-node/release_bins/ota_data_initial.bin \
  0x20000 firmware/esp32-csi-node/release_bins/esp32-csi-node.bin

python3 firmware/esp32-csi-node/provision.py --chip esp32s3 --port "$ESP_PORT" \
  --ssid "RuVigil_Network" \
  --password 'Ruvigil_1234!@#$' \
  --target-ip "$AGGREGATOR_IP" \
  --target-port 5005 \
  --node-id 0 \
  --tdm-slot 0 \
  --tdm-total 5 \
  --edge-tier 2 \
  --subk-count 16 \
  --zone "node-0"
```

Unplug node `0` and label the board `RuVigil Node 0`.

## 6. Flash And Provision Node 1

Connect the next ESP32-S3. If Linux assigns a different device path, update
`$ESP_PORT`.

```bash
export ESP_PORT="/dev/ttyUSB0"

python3 -m esptool --chip esp32s3 --port "$ESP_PORT" --baud 460800 erase_flash

python3 -m esptool --chip esp32s3 --port "$ESP_PORT" --baud 460800 \
  write_flash --flash_mode dio --flash_size 8MB \
  0x0     firmware/esp32-csi-node/release_bins/bootloader.bin \
  0x8000  firmware/esp32-csi-node/release_bins/partition-table.bin \
  0xf000  firmware/esp32-csi-node/release_bins/ota_data_initial.bin \
  0x20000 firmware/esp32-csi-node/release_bins/esp32-csi-node.bin

python3 firmware/esp32-csi-node/provision.py --chip esp32s3 --port "$ESP_PORT" \
  --ssid "RuVigil_Network" \
  --password 'Ruvigil_1234!@#$' \
  --target-ip "$AGGREGATOR_IP" \
  --target-port 5005 \
  --node-id 1 \
  --tdm-slot 1 \
  --tdm-total 5 \
  --edge-tier 2 \
  --subk-count 16 \
  --zone "node-1"
```

Unplug node `1` and label the board `RuVigil Node 1`.

## 7. Flash And Provision Node 2

Connect the next ESP32-S3.

```bash
export ESP_PORT="/dev/ttyUSB0"

python3 -m esptool --chip esp32s3 --port "$ESP_PORT" --baud 460800 erase_flash

python3 -m esptool --chip esp32s3 --port "$ESP_PORT" --baud 460800 \
  write_flash --flash_mode dio --flash_size 8MB \
  0x0     firmware/esp32-csi-node/release_bins/bootloader.bin \
  0x8000  firmware/esp32-csi-node/release_bins/partition-table.bin \
  0xf000  firmware/esp32-csi-node/release_bins/ota_data_initial.bin \
  0x20000 firmware/esp32-csi-node/release_bins/esp32-csi-node.bin

python3 firmware/esp32-csi-node/provision.py --chip esp32s3 --port "$ESP_PORT" \
  --ssid "RuVigil_Network" \
  --password 'Ruvigil_1234!@#$' \
  --target-ip "$AGGREGATOR_IP" \
  --target-port 5005 \
  --node-id 2 \
  --tdm-slot 2 \
  --tdm-total 5 \
  --edge-tier 2 \
  --subk-count 16 \
  --zone "node-2"
```

Unplug node `2` and label the board `RuVigil Node 2`.

## 8. Flash And Provision Node 3

Connect the next ESP32-S3.

```bash
export ESP_PORT="/dev/ttyUSB0"

python3 -m esptool --chip esp32s3 --port "$ESP_PORT" --baud 460800 erase_flash

python3 -m esptool --chip esp32s3 --port "$ESP_PORT" --baud 460800 \
  write_flash --flash_mode dio --flash_size 8MB \
  0x0     firmware/esp32-csi-node/release_bins/bootloader.bin \
  0x8000  firmware/esp32-csi-node/release_bins/partition-table.bin \
  0xf000  firmware/esp32-csi-node/release_bins/ota_data_initial.bin \
  0x20000 firmware/esp32-csi-node/release_bins/esp32-csi-node.bin

python3 firmware/esp32-csi-node/provision.py --chip esp32s3 --port "$ESP_PORT" \
  --ssid "RuVigil_Network" \
  --password 'Ruvigil_1234!@#$' \
  --target-ip "$AGGREGATOR_IP" \
  --target-port 5005 \
  --node-id 3 \
  --tdm-slot 3 \
  --tdm-total 5 \
  --edge-tier 2 \
  --subk-count 16 \
  --zone "node-3"
```

Unplug node `3` and label the board `RuVigil Node 3`.

## 9. Flash And Provision Node 4

Connect the final ESP32-S3.

```bash
export ESP_PORT="/dev/ttyUSB0"

python3 -m esptool --chip esp32s3 --port "$ESP_PORT" --baud 460800 erase_flash

python3 -m esptool --chip esp32s3 --port "$ESP_PORT" --baud 460800 \
  write_flash --flash_mode dio --flash_size 8MB \
  0x0     firmware/esp32-csi-node/release_bins/bootloader.bin \
  0x8000  firmware/esp32-csi-node/release_bins/partition-table.bin \
  0xf000  firmware/esp32-csi-node/release_bins/ota_data_initial.bin \
  0x20000 firmware/esp32-csi-node/release_bins/esp32-csi-node.bin

python3 firmware/esp32-csi-node/provision.py --chip esp32s3 --port "$ESP_PORT" \
  --ssid "RuVigil_Network" \
  --password 'Ruvigil_1234!@#$' \
  --target-ip "$AGGREGATOR_IP" \
  --target-port 5005 \
  --node-id 4 \
  --tdm-slot 4 \
  --tdm-total 5 \
  --edge-tier 2 \
  --subk-count 16 \
  --zone "node-4"
```

Unplug node `4` and label the board `RuVigil Node 4`.

## 10. Place And Power The Five Nodes

Put the five ESP32-S3 boards around the room:

```text
node-0: front-left or entrance side
node-1: front-right
node-2: back-left
node-3: back-right
node-4: center-side or ceiling/desk side if available
```

Keep them powered and connected to `RuVigil_Network`.

## 11. Start The RuVigil Sensing Server

Open a new terminal in `RuVigil`.

Check the server first:

```bash
cargo check -p wifi-densepose-sensing-server --manifest-path v2/Cargo.toml --features mqtt,matter
```

Start the server:

```bash
cargo run -p wifi-densepose-sensing-server --manifest-path v2/Cargo.toml --features mqtt,matter -- --http-port 3000 --source auto
```

Leave this terminal running.

## 12. Start The RuVigil Web Visualizations

Open another terminal in `RuVigil`.

```bash
python3 -m http.server 8090 --directory ui --bind 0.0.0.0
```

Open these pages on the aggregator computer:

```text
http://127.0.0.1:8090/observatory.html
http://127.0.0.1:8090/pose-fusion.html
http://127.0.0.1:8090/viz.html
```

Open from another device on the same WiFi:

```text
http://AGGREGATOR_IP:8090/observatory.html
```

Replace `AGGREGATOR_IP` with the IP printed in step 3.

If the WebSocket address needs to be forced:

```text
http://127.0.0.1:8090/observatory.html?ws=ws://127.0.0.1:8765/ws/sensing
```

Verify the scenario selector contains only:

```text
Auto-Cycle
Elderly Care
Fitness
Fall Detect
Crowd (4-8 PPL)
```

Verify these vitals are present:

```text
Sleep Monitor
Heart Rate
Respiratory Rate
Body Temperature
```

## 13. Start The Dashboard

Open another terminal in `RuVigil`.

```bash
cd dashboard
npm run dev -- --host 0.0.0.0
```

Open the Vite URL printed by the command, usually:

```text
http://127.0.0.1:5173/
```

From another device on the same WiFi:

```text
http://AGGREGATOR_IP:5173/
```

## 14. Run The AI Analyzer

The AI module reads RuVigil outputs from CSV, JSON, or JSONL and returns the
detected problem plus recommended actions.

Run the included sample:

```bash
node ai_module/ruvigil-analyzer.mjs data/ruvigil-vitals-sample.csv
```

Analyze exported live data:

```bash
node ai_module/ruvigil-analyzer.mjs data/live-export.jsonl
```

Recommended JSONL frame shape:

```json
{"timestamp":"2026-06-20T09:10:00Z","scenario":"fall_event","estimated_persons":1,"heart_rate_bpm":112,"respiratory_rate_bpm":24,"body_temperature_c":37.2,"fall_detected":true,"confidence":0.9}
```

The AI analyzer flags:

```text
fall detected
abnormal heart rate
abnormal respiratory rate
abnormal body temperature
low signal confidence
room near or above 8-person limit
```

The in-browser AI Advisor in `observatory.html` also reads the current
visualization state and shows recommended actions directly on the screen.

## 15. Full Startup Order After The First Flash

Use this order after all five ESP32-S3 nodes are flashed and provisioned:

1. Power the aggregator computer.
2. Connect the aggregator computer to `RuVigil_Network`.
3. Extract/check `$AGGREGATOR_IP`.
4. Power nodes `0`, `1`, `2`, `3`, and `4`.
5. Start the RuVigil sensing server.
6. Start the static web visualizations.
7. Open `observatory.html`.
8. Start the dashboard if needed.
9. Run the AI analyzer on sample, exported, or live data.
10. Watch the AI Advisor for fall, vitals, temperature, confidence, and crowd issues.

## 16. Troubleshooting

ESP32-S3 does not flash:

```bash
python3 -m esptool --chip esp32s3 --port "$ESP_PORT" chip_id
```

Then:

- Hold BOOT, tap RESET, release BOOT, retry.
- Use a data USB cable.
- Try another USB port.
- Check serial permissions with `groups`.
- Lower flashing baud to `115200`.

Node flashes but does not connect:

- Confirm SSID is exactly `RuVigil_Network`.
- Confirm password is exactly `Ruvigil_1234!@#$`.
- Re-run provisioning for that node.
- Confirm the aggregator computer and ESP32-S3 are on the same network.

Server sees no nodes:

- Confirm `$AGGREGATOR_IP` is the server computer IP.
- Confirm firewall allows inbound UDP traffic on port `5005`.
- Confirm every node was provisioned with `--target-ip "$AGGREGATOR_IP"`.
- Restart the server after powering all nodes.

Firewall examples:

```bash
sudo ufw allow 5005/udp
sudo ufw allow 8090/tcp
sudo ufw allow 5173/tcp
```

Visualization shows demo data:

- Confirm the sensing server terminal is running.
- Confirm the WebSocket URL.
- Open Observatory with `?ws=ws://127.0.0.1:8765/ws/sensing` if needed.

AI analyzer reports missing body temperature:

- Body temperature is not inferred by ESP32 CSI alone.
- Provide `body_temperature_c`, `body_temp_c`, or `temperature_c` from an external/fused source.

Crowd mode exceeds expected count:

- Keep the room max at 8 people.
- Use all five nodes for stronger coverage.
- Treat ESP32 person count as a signal-diversity estimate, not a guaranteed census.

## 17. Rebuild Binaries Later If Needed

The commands above flash the prebuilt binaries already included in
`firmware/esp32-csi-node/release_bins`.

To rebuild ESP32-S3 binaries from the modified source, use ESP-IDF v5.2 or
Docker:

```bash
docker run --rm \
  -v "$PWD/firmware/esp32-csi-node:/project" \
  -w /project \
  espressif/idf:v5.2 \
  bash -lc "rm -rf build sdkconfig && idf.py set-target esp32s3 && idf.py build"
```

Then flash rebuilt binaries with the same offsets:

```bash
python3 -m esptool --chip esp32s3 --port "$ESP_PORT" --baud 460800 \
  write_flash --flash_mode dio --flash_size 8MB \
  0x0     firmware/esp32-csi-node/build/bootloader/bootloader.bin \
  0x8000  firmware/esp32-csi-node/build/partition_table/partition-table.bin \
  0xf000  firmware/esp32-csi-node/build/ota_data_initial.bin \
  0x20000 firmware/esp32-csi-node/build/esp32-csi-node.bin
```
