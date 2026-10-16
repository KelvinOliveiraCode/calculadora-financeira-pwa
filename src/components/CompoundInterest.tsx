import { useState } from 'react';
import { compoundInterest } from '../utils/calculations';
import CalculatorCard from './CalculatorCard';

type Field = 'principal' | 'rate' | 'years' | 'frequency';

export default function CompoundInterest(): JSX.Element {
  const [values, setValues] = useState<Record<Field, string>>({
    principal: '1000',
    rate: '10',
    years: '2',
    frequency: '12',
  });
  const [result, setResult] = useState<{ amount: number; interest: number } | null>(null);

  const handleChange = (field: Field, value: string): void => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleCalculate = (): void => {
    const principal = Number(values.principal);
    const ratePercent = Number(values.rate);
    const years = Number(values.years);
    const frequency = Number(values.frequency) as 1 | 2 | 4 | 12 | 365;
    if (!Number.isFinite(principal) || principal < 0 || !Number.isFinite(ratePercent) || ratePercent < 0 || !Number.isFinite(years) || years < 1) {
      setResult(null);
      return;
    }
    const { amount, interest } = compoundInterest({ principal, ratePercent, years, frequency });
    setResult({ amount, interest });
  };

  const freqLabel = (f: number): string => {
    switch (f) {
      case 1: return 'Anual';
      case 2: return 'Semestral';
      case 4: return 'Trimestral';
      case 12: return 'Mensal';
      case 365: return 'Diaria';
      default: return String(f);
    }
  };

  return (
    <CalculatorCard title='Juros Compostos'>
      <div className='grid'>
        <div className='field'>
          <label>Principal (R$)</label>
          <input type='number' value={values.principal} onChange={(e) => handleChange('principal', e.target.value)} step='0.01' min='0' />
        </div>
        <div className='field'>
          <label>Taxa ao ano (%)</label>
          <input type='number' value={values.rate} onChange={(e) => handleChange('rate', e.target.value)} step='0.01' min='0' />
        </div>
        <div className='field'>
          <label>Tempo (anos)</label>
          <input type='number' value={values.years} onChange={(e) => handleChange('years', e.target.value)} step='1' min='1' />
        </div>
        <div className='field'>
          <label>Capitalizacao</label>
          <select value={values.frequency} onChange={(e) => handleChange('frequency', e.target.value)}>
            <option value='1'>Anual</option>
            <option value='2'>Semestral</option>
            <option value='4'>Trimestral</option>
            <option value='12'>Mensal</option>
            <option value='365'>Diaria</option>
          </select>
        </div>
      </div>
      <button className='btn' onClick={handleCalculate}>Calcular</button>
      {result && (
        <div className='result'>
          <p>Montante: <strong>{result.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></p>
          <p>Juros: <strong>{result.interest.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></p>
        </div>
      )}
    </CalculatorCard>
  );
}