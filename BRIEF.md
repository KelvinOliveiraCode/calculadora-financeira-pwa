# BRIEF — calculadora-financeira-pwa

## Projeto
PWA offline-first de calculadoras financeiras (area: Frontend).
Local: C:\Users\Kelvin\AppData\Local\Temp\opencode\github-staging\projects\calculadora-financeira-pwa\

## Entregas
Arquivos criados:
- package.json, tsconfig.json, vite.config.ts
- index.html
- public/manifest.json, public/service-worker.js, public/icon-192.png, public/icon-512.png
- src/main.tsx, src/registerSW.ts, src/App.tsx, src/index.css
- src/components/CalculatorCard.tsx
- src/components/CompoundInterest.tsx (juros compostos)
- src/components/Amortization.tsx (amortizacao)
- src/components/Budget.tsx (orcamento)
- src/utils/calculations.ts (funcoes puras de calculo)
- src/utils/calculations.test.ts (testes unitarios)
- README.md (PT-BR + EN)
- BRIEF.md

Stack: React 18, TypeScript (strict), Vite, Vitest + jsdom + Testing Library.

## Comando de teste
npm test  (equivale a vitest run)

## Resultado dos testes
7 passed / 7, em 1 arquivo de teste.
Build de producao: npm run build OK (Vite build + tsc --noEmit sem erros).

## Caminhos
README: C:\Users\Kelvin\AppData\Local\Temp\opencode\github-staging\projects\calculadora-financeira-pwa\README.md
BRIEF:  C:\Users\Kelvin\AppData\Local\Temp\opencode\github-staging\projects\calculadora-financeira-pwa\BRIEF.md

## Como verificar
1. npm install
2. npm run build   (deve gerar dist/ sem erros de TypeScript nem Vite)
3. npm test         (deve passar 7/7)
4. Rodar npm run preview, desativar a rede e recarregar para confirmar funcionamento offline via service worker.
