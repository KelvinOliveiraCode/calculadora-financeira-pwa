# Calculadora Financeira PWA

Calculadoras financeiras offline-first: juros compostos, amortizacao e orcamento. React 18, TypeScript, service worker e manifest para funcionar sem rede.

## O que faz

- Juros compostos: calcula montante e juros com capitalizacao anual, semestral, trimestral, mensal ou diaria.
- Amortizacao: parcela mensal, total a pagar, total de juros e tabela de amortizacao dos primeiros 12 meses.
- Orcamento: renda mensal, lista de despesas, saldo e taxa de poupanca.

Tudo roda no navegador. Nao envia dados a servidor algum.

## Como usar

Requisitos: Node.js 18 ou superior e npm.

Instalar dependencias:

npm install

Rodar em desenvolvimento:

npm run dev

Abre http://localhost:5173.

Build de producao:

npm run build

Gera a pasta dist/ com o app otimizado e o service worker.

Preview local da build:

npm run preview

Testes:

npm test

Executa 7 testes unitarios das funcoes de calculo com vitest. Os testes rodam localmente, sem rede.

## Funciona offline

Sim. O service worker (public/service-worker.js) armazena em cache a casca do aplicativo (/, /index.html, /manifest.json) na instalacao e coloca em cache tudo o que carregar com sucesso. Sem rede, o navegador carrega a casca do cache e as calculadoras continuam funcionando.

O arquivo public/manifest.json permite instalar o PWA como aplicativo autonomo.

## Tecnologias

React 18, TypeScript (strict), Vite, Vitest, jsdom e Testing Library.

## Estrutura do projeto

- index.html — ponto de entrada
- public/manifest.json — manifest do PWA
- public/service-worker.js — service worker offline-first
- public/icon-192.png, public/icon-512.png — icones
- src/main.tsx — renderiza o React e registra o service worker em producao
- src/App.tsx — navegacao por abas entre as tres calculadoras
- src/components/ — CalculadoraCard, CompoundInterest, Amortization, Budget
- src/utils/calculations.ts — funcoes puras de calculo
- src/utils/calculations.test.ts — testes unitarios
- src/index.css — estilo

## Licenca

MIT

## Autor

Kelvin Oliveira

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
- src/components/ — CalculadoraCard, CompoundInterest, Amortization, Budget
- src/utils/calculations.ts — pure calculation functions
- src/utils/calculations.test.ts — unit tests
- src/index.css — styles

## License

MIT

## Author

Kelvin Oliveira
