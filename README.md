# Area Contact Map Editor

A browser-based GeoJSON editor for polygon areas. It is optimized for fast assignment workflows:

- draw/edit/delete polygon areas on a map
- maintain area metadata (`area_id`, `name`, `contact`, `status`, `notes`)
- autosave to browser storage
- import/export GeoJSON files

## Repository Contents

- `editor.html`: full app (UI + logic)
- `index.html`: root entrypoint that redirects to `editor.html` (useful for GitHub Pages)
- `package.json`: optional lint/format scripts

## Quick Start

Open directly as a local file:

```bash
open editor.html
```

Or run a local static server:

```bash
python3 -m http.server 8000
open http://localhost:8000/editor.html
```

When served over HTTP, the app also tries to load `./areas.geojson` on startup if present.

## Deploy on GitHub Pages

1. Go to repository `Settings` -> `Pages`.
2. Under `Build and deployment`, set:

- `Source`: `Deploy from a branch`
- `Branch`: `main`
- `Folder`: `/ (root)`

3. Save and wait for deployment.

Site URL pattern:

- `https://<your-github-username>.github.io/area-contact-map/`

## Core Workflow

1. Load data:

- Use `Import` to open a `.geojson` or `.json` file.
- Or place `areas.geojson` next to `editor.html` and serve over HTTP.

2. Edit areas:

- Draw using Leaflet Draw controls.
- Select area by clicking/tapping it.
- Open editor:
- Desktop: double-click area or use `Edit selected`.
- Mobile: tap area, then use `Edit selected area`.
- `area_id` appears in `Show IDs` mode.
- Missing `area_id` values are auto-generated (`A-0001`, `A-0002`, ...).

3. Save/export:

- Autosave writes to browser `localStorage` (not disk).
- `Export` writes GeoJSON to disk.
- On browsers with File System Access API, repeat export can overwrite the same file.
- On browsers without overwrite support (for example iPhone Safari), exports download new copies.

## Search and List

- Area list supports text filtering by id/name/contact/status/notes (mode-dependent).
- `Clear` button appears when search has text.

## Keyboard Shortcuts

- `A`: fit all areas
- `S`: fit selected area
- `B`: toggle sidebar
- `D`: start drawing polygon
- `O`: import file
- `E`: export
- `/`: focus search
- `I`: toggle IDs
- `L`: toggle labels
- `Esc`: close top UI surface, then deselect
- `?`: toggle shortcuts panel

## GeoJSON Expectations

- Input must be a `FeatureCollection`.
- Only `Polygon` and `MultiPolygon` features are loaded.
- Supported `properties`:
- `area_id`
- `name`
- `contact`
- `status` (`assigned`, `unassigned`, `needs_backup`, `inactive`, or blank)
- `notes`

## Privacy / Network Behavior

- Area data editing/autosave is local to your browser unless you export/import files.
- The app loads map tiles from online providers.
- New-area name suggestion uses Nominatim reverse geocoding (network request).
- In `file://` mode, those lookups may be blocked intermittently by browser/server CORS behavior.

## Optional Lint and Format Checks

```bash
npm install
npm run lint
npm run format:check
```

## Notes / Caveats

- Autosave is per-browser and per-origin. Clearing site data removes it.
- `Export` is still required to persist edits to files on disk.
