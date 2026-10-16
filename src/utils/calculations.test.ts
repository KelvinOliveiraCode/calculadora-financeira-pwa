import { describe, it, expect } from 'vitest';
import { compoundInterest, amortizationPayment, amortizationSchedule, budgetSummary } from './calculations';

describe('compoundInterest', () => {
  it('calcula montante de juros compostos com capitalizacao mensal', () => {
    const result = compoundInterest({ principal: 1000, ratePercent: 10, years: 2, frequency: 12 });
    const expected = 1000 * Math.pow(1 + 0.10 / 12, 24);
    expect(result.amount).toBeCloseTo(expected, 6);
    expect(result.interest).toBeCloseTo(result.amount - 1000, 6);
  });

  it('retorna o principal quando a taxa e zero', () => {
    const result = compoundInterest({ principal: 500, ratePercent: 0, years: 5, frequency: 12 });
    expect(result.amount).toBe(500);
    expect(result.interest).toBe(0);
  });
});

describe('amortizationPayment', () => {
  it('calcula parcela mensal para emprestimo sem juros', () => {
    const result = amortizationPayment({ principal: 12000, ratePercent: 0, months: 12 });
    expect(result.monthlyPayment).toBe(1000);
    expect(result.totalInterest).toBe(0);
  });

  it('calcula parcela com juros', () => {
    const result = amortizationPayment({ principal: 10000, ratePercent: 12, months: 12 });
    const r = 0.12 / 12;
    const n = 12;
    const expected = (10000 * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    expect(result.monthlyPayment).toBeCloseTo(expected, 6);
    expect(result.totalPayment).toBeCloseTo(result.monthlyPayment * n, 6);
  });
});

describe('amortizationSchedule', () => {
  it('gera uma linha por mes e zera o saldo no final', () => {
    const schedule = amortizationSchedule({ principal: 1000, ratePercent: 0, months: 5 });
    expect(schedule).toHaveLength(5);
    expect(schedule[4]!.balance).toBeCloseTo(0, 6);
    const totalPaid = schedule.reduce((sum, row) => sum + row.payment, 0);
    expect(totalPaid).toBeCloseTo(1000, 6);
  });
});

describe('budgetSummary', () => {
  it('calcula saldo e taxa de poupanca', () => {
    const result = budgetSummary({ income: 5000, expenses: [{ label: 'Moradia', value: 2000 }, { label: 'Alimentacao', value: 1000 }] });
    expect(result.totalExpenses).toBe(3000);
    expect(result.balance).toBe(2000);
    expect(result.savingsRate).toBeCloseTo(40, 6);
  });

  it('renda zero resulta em taxa zero', () => {
    const result = budgetSummary({ income: 0, expenses: [{ label: 'X', value: 100 }] });
    expect(result.savingsRate).toBe(0);
  });
});