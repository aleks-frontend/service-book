# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Create React App project (`react-scripts` 3.2, React 16, no TypeScript).

- `npm start`: dev server on http://localhost:3000. Lint errors (eslint `react-app` config) show in the console.
- `npm run build`: production build to `build/`
- `npm test`: Jest in watch mode. Run one test file with `npm test -- src/App.test.js`, and use `CI=true npm test` for a single non-watch run.

On modern Node (tested on 22):
- Install with `npm ci --ignore-scripts`. A plain install fails while building `grpc` natively; `grpc` is a server-side Firebase 7 dependency that the browser bundle doesn't use.
- Start and build with `NODE_OPTIONS=--openssl-legacy-provider` (for example `NODE_OPTIONS=--openssl-legacy-provider npm start`). Without it, webpack 4 fails with an OpenSSL error.

The only test is the default CRA smoke test in `src/App.test.js`. It mounts `App`, which connects to the live Firebase database.

## Architecture

This is a service-shop management app. It tracks repair "services" for customers' devices, with billable actions (repair work and prices), dispatch notes and invoices. There is no backend in this repo. All data lives in a Firebase Realtime Database.

### Data layer: one synced state tree

- `src/base.js` sets up Firebase (v7) and a `re-base` client.
- `src/AppContext.js` (`AppProvider`) calls `base.syncState('ssot', ...)`. This two-way binds `this.state.ssot` to the `ssot` node in Firebase, so **any `setState` on `ssot` is saved to the database right away**. There is no separate API or save step.
- `ssot` has four collections, each keyed by ID: `services`, `customers`, `devices` and `actions`.
- Records are removed by setting `collection[id] = null`, which re-base turns into a Firebase delete. See `deleteService` and `deleteEntity`.
- Services link to other entities by ID arrays: `service.customers`, `service.devices`, `service.actions` and `service.newDevices`. Use the context helpers (`getCustomerNameById`, `getDeviceNameById`, `findServiceByEntityId`, and so on) to resolve these links.
- Devices flagged `isNewDevice` are devices the shop sold or handed out, not devices received for repair. They are referenced from `service.newDevices` instead of `service.devices`.
- The context also holds UI state: `activeNavItemKey` (the current screen), `loaded` and `filteredServicesArray`. Components read it with `React.useContext(AppContext)` or `AppConsumer`.

### Navigation

There is no router in use, even though `react-router-dom` is installed. `components/Main.js` chooses a screen from `src/screens/` with a `switch` on `context.state.activeNavItemKey`, and `components/UI/Nav.js` sets that key. To add a screen, add a case to `Main.js` and an item to `Nav`. `Main` also owns the snackbar and passes `showSnackbar(entityType, actionLabel)` down to the screens.

### Entities and forms

- `src/helpers.js` holds the shared definitions:
  - `fields`: form field definitions for `customers`, `devices` and `actions`, which drive the generic `CreateEntity` and `DisplayEntity` components
  - `statusEnum`: the service status lifecycle: received → inprogress → completed → shipped → delivered
  - `colors`, `breakpoints` and the inline SVG logos
- `components/ServiceForm.js` is the main create/edit form for a service. Its `isUpdate` prop switches it between create and edit mode. It uses `react-select` dropdowns, inline entity creation, and the `ActionsTable` and `NewDevicesTable` sub-tables.
- Tables use `material-table` (icons come from `src/tableIcons.js`). Charts on the Dashboard use `chart.js` and `react-chartjs-2`. The dashboard groups statistics by month and year from `service.date`, a millisecond timestamp.

### PDF output

`components/PDF/PdfInvoice.js` and `PdfDispatchNote.js` are `@react-pdf/renderer` documents. `ServiceForm` and `UI/PrintPopup` render them through `PDFDownloadLink`. They contain hard-coded company details and branding: text in the components and logo images in `public/img/`, loaded by URL. Change those places when the business identity changes. The Roboto font is loaded from `public/fonts/`.

### Styling

Styles combine `styled-components` (most layout, with colors and breakpoints from `helpers.js`), Material-UI v4 components and `makeStyles`, and the global CSS in `App.css` and `index.css`.
