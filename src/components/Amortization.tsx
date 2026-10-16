import { useState } from 'react';
import { amortizationPayment, amortizationSchedule } from '../utils/calculations';
import CalculatorCard from './CalculatorCard';

export default function Amortization(): JSX.Element {
  const [values, setValues] = useState<{ principal: string; rate: string; months: string }>({
    principal: '10000',
    rate: '12',
    months: '12',
  });
  const [result, setResult] = useState<ReturnType<typeof amortizationPayment> | null>(null);
  const [schedule, setSchedule] = useState<ReturnType<typeof amortizationSchedule> | null>(null);

  const handleCalculate = (): void => {
    const principal = Number(values.principal);
    const ratePercent = Number(values.rate);
    const months = Number(values.months);
    if (!Number.isFinite(principal) || principal <= 0 || !Number.isFinite(ratePercent) || ratePercent < 0 || !Number.isFinite(months) || months < 1) {
      setResult(null);
      setSchedule(null);
      return;
    }
    setResult(amortizationPayment({ principal, ratePercent, months }));
    setSchedule(amortizationSchedule({ principal, ratePercent, months }));
  };

  if (!result || !schedule) {
    return (
      <CalculatorCard title='Amortizacao'>
        <div className='grid'>
          <div className='field'>
            <label>Valor do emprestimo (R$)</label>
            <input type='number' value={values.principal} onChange={(e) => setValues((prev) => ({ ...prev, principal: e.target.value }))} step='0.01' min='0' />
          </div>
          <div className='field'>
            <label>Taxa ao ano (%)</label>
            <input type='number' value={values.rate} onChange={(e) => setValues((prev) => ({ ...prev, rate: e.target.value }))} step='0.01' min='0' />
          </div>
          <div className='field'>
            <label>Prazo (meses)</label>
            <input type='number' value={values.months} onChange={(e) => setValues((prev) => ({ ...prev, months: e.target.value }))} step='1' min='1' />
          </div>
        </div>
        <button className='btn' onClick={handleCalculate}>Calcular</button>
      </CalculatorCard>
    );
  }

  return (
    <CalculatorCard title='Amortizacao'>
      <div className='grid'>
        <div className='field'>
          <label>Valor do emprestimo (R$)</label>
          <input type='number' value={values.principal} onChange={(e) => setValues((prev) => ({ ...prev, principal: e.target.value }))} step='0.01' min='0' />
        </div>
        <div className='field'>
          <label>Taxa ao ano (%)</label>
          <input type='number' value={values.rate} onChange={(e) => setValues((prev) => ({ ...prev, rate: e.target.value }))} step='0.01' min='0' />
        </div>
        <div className='field'>
          <label>Prazo (meses)</label>
          <input type='number' value={values.months} onChange={(e) => setValues((prev) => ({ ...prev, months: e.target.value }))} step='1' min='1' />
        </div>
      </div>
      <button className='btn' onClick={handleCalculate}>Calcular</button>
      <div className='result'>
        <p>Parcela mensal: <strong>{result.monthlyPayment.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></p>
        <p>Total a pagar: <strong>{result.totalPayment.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></p>
        <p>Total de juros: <strong>{result.totalInterest.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></p>
      </div>
      <table className='schedule'>
        <thead>
          <tr>
            <th>Mes</th>
            <th>Parcela</th>
            <th>Juros</th>
            <th>Principal</th>
            <th>Saldo</th>
          </tr>
        </thead>
        <tbody>
          {schedule.slice(0, 12).map((row) => (
            <tr key={row.month}>
              <td>{row.month}</td>
              <td>{row.payment.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
              <td>{row.interest.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
              <td>{row.principal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
              <td>{row.balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </CalculatorCard>
  );
}