import { useState } from 'react';
import CalculatorCard from './components/CalculatorCard';
import CompoundInterest from './components/CompoundInterest';
import Amortization from './components/Amortization';
import Budget from './components/Budget';

type Tab = 'juros' | 'amortizacao' | 'orcamento';

const TABS: { id: Tab; label: string }[] = [
  { id: 'juros', label: 'Juros Compostos' },
  { id: 'amortizacao', label: 'Amortizacao' },
  { id: 'orcamento', label: 'Orcamento' },
];

export default function App(): JSX.Element {
  const [tab, setTab] = useState<Tab>('juros');

  return (
    <div className='app'>
      <header className='header'>
        <h1>Calculadora Financeira PWA</h1>
        <p className='sub'>Offline-first � juros compostos � amortizacao � orcamento</p>
        <nav className='tabs'>
          {TABS.map((t) => (
            <button
              key={t.id}
              className={tab === t.id ? 'tab active' : 'tab'}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>
      <main className='main'>
        {tab === 'juros' && <CompoundInterest />}
        {tab === 'amortizacao' && <Amortization />}
        {tab === 'orcamento' && <Budget />}
      </main>
      <footer className='footer'>
        <p>Calculadora Financeira PWA � MIT � Kelvin Oliveira</p>
      </footer>
    </div>
  );
}