# Aurum Capital

Aurum Capital is a React dashboard prototype for cryptocurrency mining operations. It brings miner health, hash rates, power usage, earnings, inventory, and site layouts into one interface, with a dark theme and gold accents.

The project provides a starting point for exploring mining management workflows and developing the frontend for an operations platform.

## Current status

This repository contains a frontend prototype. Most screens display hardcoded sample data, and interactive forms update React component state. Changes are not persisted and reset when the page is reloaded or the component is unmounted during navigation.

There is no backend, database, authentication, or live miner/pool connection included. Report delivery, alert integrations, and physical power controls are UI demonstrations. The Security page contains informational text; it does not implement access controls or audit logging. The earnings calculator uses fixed assumptions, including a hardcoded block reward, and is intended for demonstration.

## Explore the app

| Page | Route | What you can explore |
| --- | --- | --- |
| Dashboard | `/` | Sample hash rate trends, pool statistics, power metrics, and miner summaries. |
| Miners | `/miners` | Search and filter sample miners; add, edit, and delete entries in local state. |
| Issues | `/issues` | Search sample issues and view miner health summaries. Some actions are placeholders. |
| Earnings | `/earnings` | Sample revenue charts and an interactive revenue calculator. |
| Inventory | `/inventory` | Search sample assets and inspect cycle count summaries. |
| Alerts & Triggers | `/alerts-triggers` | Configure local trigger rules and hydro cooling settings. |
| Pools | `/pools` | Filter sample pool statistics and view accepted, rejected, and stale shares. |
| Reports | `/reports` | Manage local report configurations and preview sample reports. “Send Now” opens a preview. |
| Site Map | `/site-map` | Import a CSV to visualize miners by rack, with infrastructure and phase filters. |
| Power Control | `/power-control` | Create local power control entries and inspect sample history. |
| Security | `/security` | Read informational security and compliance content. |

## Run locally

You will need Node.js and npm installed. The repository does not currently pin a Node.js version.

From the project directory:

```sh
npm ci
npm start
```

Open [http://localhost:3000](http://localhost:3000) if the development server does not open it automatically. Source edits reload the app during development. No environment variables, API keys, or external services are required for the current prototype.

### Available commands

| Command | Purpose |
| --- | --- |
| `npm start` | Start the development server. |
| `npm run build` | Generate a production bundle in `build/`. |
| `npm test` | Start the Create React App test runner in watch mode. No test files are currently included. |
| `npm run eject` | Expose the underlying build configuration. This is a one-way operation and is not required for normal development. |

When hosting the production build, configure the server to serve `index.html` for application routes such as `/miners`. The app uses browser-based routing, so direct visits to these paths need that fallback.

## Site Map CSV example

The Site Map starts empty. Use its upload control to import a CSV with these exact column names:

```csv
Rack,Row,Column,Miner IP,Temperature,Status,Hashrate,Phase
rack-a,1,1,192.168.1.101,65,healthy,100 TH/s,1
rack-a,1,2,192.168.1.102,78,warning,95 TH/s,1
rack-b,1,1,192.168.1.103,85,overheat,80 TH/s,2
```

- Use numeric values for `Row`, `Column`, and `Temperature`.
- Rack names are converted to lowercase. An omitted or empty `Phase` defaults to `1`.
- Status colors recognize `ok`/`healthy`, `warning`, `overheat`/`danger`, and `disabled`; other values use the default color.
- CSV parsing happens in the browser, and imported data stays in the Site Map component's state. The importer currently assumes valid input, so keep the headers and required values intact.

## Technology and code structure

The app uses React 18, React Router 6, Material UI 7 with Emotion, MUI X charts and data grids, Day.js with MUI date pickers, and Papa Parse for CSV imports. Create React App (`react-scripts` 5) provides the development and build tooling.

```text
public/
  index.html             HTML entry point
src/
  index.js               React application entry point
  App.js                 Theme provider and page routes
  components/
    Header.js            Shared application header
    Layout.js            Page shell with header and sidebar
    Sidebar.js           Navigation links
  pages/                 Dashboard and feature screens
    Dashboard.css        Dashboard-specific styles
    SiteMap.js           CSV import and rack visualization
  theme/
    theme.js             Shared palette, typography, and component styles
package.json             Dependencies and npm scripts
package-lock.json        Locked dependency versions
```

To add a screen, create its component in `src/pages/`, register a route in `src/App.js`, and add a navigation item in `src/components/Sidebar.js`. Shared visual changes belong in `src/theme/theme.js` or the layout components. Sample datasets and interaction handlers currently live alongside their page components.

Connecting the prototype to real operations would require API integrations, persistent storage, authentication and authorization, input validation, and tests for the resulting workflows.

## License

This project is licensed under the [MIT License](LICENSE).
