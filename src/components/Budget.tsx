import { useState } from 'react';
import { budgetSummary } from '../utils/calculations';
import CalculatorCard from './CalculatorCard';

type Expense = { id: string; label: string; value: number };

export default function Budget(): JSX.Element {
  const [income, setIncome] = useState('5000');
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', label: 'Moradia', value: 2000 },
    { id: '2', label: 'Alimentacao', value: 1000 },
  ]);
  const [editLabel, setEditLabel] = useState<{ id: string; label: string } | null>(null);
  const [newLabel, setNewLabel] = useState('');

  const result = budgetSummary({ income: Number(income) || 0, expenses });

  const handleAdd = (): void => {
    const label = newLabel.trim();
    if (!label) return;
    setExpenses((prev) => [...prev, { id: String(Date.now()), label, value: 0 }]);
    setNewLabel('');
  };

  const handleRemove = (id: string): void => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const handleSave = (id: string, label: string): void => {
    setExpenses((prev) => prev.map((x) => (x.id === id ? { ...x, label, value: x.value } : x)));
    setEditLabel(null);
  };

  const setValue = (id: string, value: string): void => {
    setExpenses((prev) => prev.map((x) => (x.id === id ? { ...x, value: Number(value) || 0 } : x)));
  };

  return (
    <CalculatorCard title='Orcamento'>
      <div className='field'>
        <label>Renda mensal (R$)</label>
        <input type='number' value={income} onChange={(e) => setIncome(e.target.value)} step='0.01' min='0' />
      </div>
      <div className='field'>
        <label>Nova despesa</label>
        <div className='input-row'>
          <input type='text' value={newLabel} onChange={(e) => setNewLabel(e.target.value)} placeholder='Nome da despesa' />
          <button className='btn small' onClick={handleAdd}>Adicionar</button>
        </div>
      </div>
      <ul className='expense-list'>
        {expenses.map((e) => {
          const editing = editLabel?.id === e.id;
          if (editing) {
            return (
              <li key={e.id} className='expense-item editing'>
                <input
                  type='text'
                  defaultValue={e.label}
                  onBlur={() => setEditLabel(null)}
                  onChange={(ev) => setEditLabel({ id: e.id, label: ev.target.value })}
                  onKeyDown={(ev) => { if (ev.key === 'Enter') { setEditLabel(null); } }}
                />
                <input
                  type='number'
                  value={e.value}
                  onChange={(ev) => setValue(e.id, ev.target.value)}
                  step='0.01'
                  min='0'
                />
                <button className='btn small' onClick={() => handleSave(e.id, editLabel!.label)}>Salvar</button>
                <button className='btn small' onClick={() => setEditLabel(null)}>Cancelar</button>
              </li>
            );
          }
          return (
            <li key={e.id} className='expense-item'>
              <span>{e.label}</span>
              <div className='expense-controls'>
                <input type='number' value={e.value} onChange={(ev) => setValue(e.id, ev.target.value)} step='0.01' min='0' />
                <button className='btn small' onClick={() => setEditLabel({ id: e.id, label: e.label })}>Editar</button>
                <button className='btn small danger' onClick={() => handleRemove(e.id)}>Remover</button>
              </div>
            </li>
          );
        })}
      </ul>
      <div className='result'>
        <p>Renda: <strong>{result.income.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></p>
        <p>Despesas: <strong>{result.totalExpenses.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></p>
        <p>Saldo: <strong style={{ color: result.balance >= 0 ? 'var(--ok)' : 'var(--bad)' }}>{result.balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></p>
        <p>Taxa de poupanca: <strong>{result.savingsRate.toFixed(1)}%</strong></p>
      </div>
    </CalculatorCard>
  );
}
