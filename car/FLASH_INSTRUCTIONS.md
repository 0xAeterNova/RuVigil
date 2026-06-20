# Vehicle Platform & Flashing Guide

## Overview

The RuVigil vehicle serves as a mobile demonstration platform used during controlled testing and evaluation scenarios.

Its purpose is to:

* provide a repeatable movement platform for RF sensing experiments,
* support autonomous and manual navigation modes,
* provide a camera-based observation baseline for comparison studies,
* generate controlled motion patterns for RPM and movement validation.

The vehicle is not part of the core sensing architecture. The primary sensing system is the six-node ESP32-S3 wireless network.

---

# Vehicle Hardware Platform

The mobile platform is based on the ACEBOTT QD002 ESP32 Camera Car architecture.

## Main Components

### Vehicle Controller

* ESP32 development board
* Motor driver module
* DC geared motors
* Battery power system
* Chassis platform

### Camera Module

* ESP32-CAM module
* Integrated WiFi connectivity
* Video streaming capability
* Remote monitoring support

### Communication

* WiFi network connectivity
* Local network communication
* Remote command support
* Real-time telemetry transmission

---

# Vehicle Directory Structure

```text
car/
├── firmware/
│   ├── body/
│   └── camera/
├── hardware/
│   ├── wiring/
│   └── assembly/
├── images/
├── schematics/
└── FLASH_INSTRUCTIONS.md
```

---

# Assembly Resources

The original vehicle platform includes:

* Chassis assembly documentation
* Wiring diagrams
* ESP32-CAM installation guides
* Vehicle controller firmware examples
* Camera firmware examples

Project-specific modifications should be documented separately as development progresses.

---

# Firmware Components

The vehicle uses two independent firmware targets.

## Vehicle Body Firmware

Responsible for:

* motor control
* steering logic
* autonomous movement experiments
* remote control commands
* telemetry transmission

Expected firmware location:

```text
car/firmware/body/
```

---

## Camera Firmware

Responsible for:

* video streaming
* WiFi connectivity
* camera configuration
* image transmission

Expected firmware location:

```text
car/firmware/camera/
```

---

# Flashing Procedure

## Requirements

* Arduino IDE or PlatformIO
* ESP32 board package
* USB data cable
* Vehicle controller board
* ESP32-CAM module

---

## Flash Vehicle Controller

1. Connect the vehicle controller board.
2. Select the correct COM/serial port.
3. Select the appropriate ESP32 board profile.
4. Open the vehicle firmware project.
5. Compile and upload.

Example:

```bash
# Vehicle firmware command placeholder
# To be completed when the final project firmware is added.
```

---

## Flash Camera Module

1. Connect the ESP32-CAM programming interface.
2. Enter flashing mode if required.
3. Select the correct board configuration.
4. Upload camera firmware.

Example:

```bash
# Camera firmware command placeholder
# To be completed when the final project firmware is added.
```

---

# Network Configuration

Configure before deployment:

```text
SSID=<WIFI_NAME>
PASSWORD=<WIFI_PASSWORD>
SERVER_IP=<PROCESSING_SERVER>
MQTT_BROKER=<BROKER_ADDRESS>
```

---

# Vehicle Operating Modes

## Manual Mode

Allows direct user control through the dashboard.

Capabilities:

* forward movement
* reverse movement
* left/right steering
* speed control
* live camera streaming

---

## Autonomous Mode

Used during controlled demonstrations.

Capabilities:

* predefined route execution
* navigation experiments
* movement pattern generation
* repeatable testing scenarios

---

# Repository Assets

The following project-specific files should be added when available:

```text
car/images/
```

* chassis photographs
* assembly photographs
* demonstration screenshots

```text
car/schematics/
```

* wiring diagrams
* electrical layouts
* communication diagrams

```text
car/firmware/
```

* final vehicle firmware
* final camera firmware

---

# Notes

The vehicle acts as a supporting experimental platform for RuVigil demonstrations and comparison studies. Development of vehicle functionality, autonomous behaviors, and firmware integration remains an active part of the overall project workflow.
