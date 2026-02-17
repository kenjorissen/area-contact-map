# Area Contact Map Editor

A single-file, browser-based GeoJSON editor for area polygons.

It is designed for fast assignment workflows:

- draw and edit areas on a map
- update area metadata in the left panel
- autosave in browser storage
- import/export GeoJSON files

## What Is In This Repo

- `editor.html`: the full app (UI + logic)
- `areas.geojson`: optional default dataset loaded on startup

No build step or package install is required.

## Optional Lint & Format Checks

If you want consistent style checks:

```bash
npm install
npm run lint
npm run format:check
```

## Quick Start

Open as a local file:

```bash
open editor.html
```

Or run a local static server (recommended, enables auto-load of `areas.geojson`):

```bash
python3 -m http.server 8000
open http://localhost:8000/editor.html
```

## Core Workflow

1. Load data

- Use `Import GeoJSON…` to load a `.geojson` or `.json` file.
- If served over `http://`, the app also tries to auto-load `./areas.geojson`.

2. Edit areas

- Draw polygons with Leaflet Draw controls.
- Click an area to edit `name`, `contact`, `status`, and `notes`.
- `area_id` is shown in `Advanced` mode.
- Missing `area_id` values are auto-generated as `A-0001`, `A-0002`, etc.

3. Save/export

- Autosave writes to browser `localStorage` only (not disk).
- Use `Export GeoJSON` to write/download a file.
- On supported browsers, export can overwrite the same file via File System Access API.

## Status Footer Meaning

- `Auto: ...` = browser autosave state
- `Export: ...` = disk export state
- `Status: ...` = latest app event message

The footer is pinned; the content above it scrolls.

## GeoJSON Expectations

- Input should be a `FeatureCollection`.
- Only `Polygon` and `MultiPolygon` features are loaded.
- Feature `properties` used by the app:
  - `area_id`
  - `name`
  - `contact`
  - `status` (`assigned`, `unassigned`, `needs_backup`, `inactive`, or blank)
  - `notes`

## Notes / Caveats

- In `file://` mode, browsers often prevent fetch of `./areas.geojson`; use `Import` or a local server.
- Autosave is per-browser and per-origin. Clearing site data removes it.
- Export is still required to create/update files on disk.
