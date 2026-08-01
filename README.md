# VINIS — Marketing Website

Static multi-page marketing site for **VINIS (Vast Infrastructure Inspection Solution)** — a Rorschach Innovation Services venture. Autonomous inspection of vast terrain using satellite data, sensor fusion and machine vision.

> **Status:** pre-launch draft, shared for internal feedback.

## Pages

| Page | File |
|---|---|
| Home | `index.html` |
| Platform (architecture, capabilities, digital twins) | `platform.html` |
| Solutions (services + use cases) | `solutions.html` |
| Case Studies | `case-studies.html` |
| — Field-health deep dive | `case-field-health.html` |
| Team | `team.html` |

## Run locally

No build step — plain HTML, CSS and JavaScript.

```bash
python3 -m http.server 3600
```

Then open <http://localhost:3600>.

## Stack

Hand-authored HTML / CSS / JS. Google Fonts: Space Grotesk, Manrope, Space Mono. No frameworks, no dependencies.
