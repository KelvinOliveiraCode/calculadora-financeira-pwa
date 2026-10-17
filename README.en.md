# Financial Calculator PWA

Offline-first financial calculators: compound interest, amortization, and budget. React 18, TypeScript, service worker and manifest to work without a network.

## What it does

- Compound interest: amount and interest with annual, semiannual, quarterly, monthly, or daily compounding.
- Amortization: monthly payment, total to pay, total interest, and an amortization table for the first 12 months.
- Budget: monthly income, expense list, balance, and savings rate.

Everything runs in the browser. No data is sent to any server.

## How to use

Requirements: Node.js 18 or higher and npm.

Install dependencies:

npm install

Run in development:

npm run dev

Opens http://localhost:5173.

Production build:

npm run build

Generates the dist/ folder with the optimized app and the service worker.

Local preview of the build:

npm run preview

Tests:

npm test

Runs 7 unit tests of the calculation functions with vitest. Tests run locally, without network.

## Works offline

Yes. The service worker (public/service-worker.js) caches the app shell (/, /index.html, /manifest.json) on install and caches everything that loads successfully. Without network, the browser loads the shell from cache and the calculators keep working.

The file public/manifest.json lets you install the PWA as a standalone application.

## Technologies

React 18, TypeScript (strict), Vite, Vitest, jsdom, and Testing Library.

## Project structure

- index.html — entry point
- public/manifest.json — PWA manifest
- public/service-worker.js — offline-first service worker
- public/icon-192.png, public/icon-512.png — icons
- src/main.tsx — renders React and registers the service worker in production
- src/App.tsx — tab navigation between the three calculators
- src/components/ — CalculatorCard, CompoundInterest, Amortization, Budget
- src/utils/calculations.ts — pure calculation functions
- src/utils/calculations.test.ts — unit tests
- src/index.css — styles

## License

MIT

## Author

Kelvin Oliveira
