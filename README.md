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
