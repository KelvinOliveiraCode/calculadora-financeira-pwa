export type CompoundingFrequency = 1 | 2 | 4 | 12 | 365;

export function compoundInterest({
  principal,
  ratePercent,
  years,
  frequency = 12,
}: {
  principal: number;
  ratePercent: number;
  years: number;
  frequency?: CompoundingFrequency;
}): {
  amount: number;
  interest: number;
  totalContributions: number;
} {
  const r = ratePercent / 100;
  const n = frequency;
  const t = years;
  const amount = principal * Math.pow(1 + r / n, n * t);
  const interest = amount - principal;
  return { amount, interest, totalContributions: principal };
}

export function amortizationPayment({
  principal,
  ratePercent,
  months,
}: {
  principal: number;
  ratePercent: number;
  months: number;
}): {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
} {
  const r = ratePercent / 100 / 12;
  const n = months;
  let monthlyPayment: number;
  if (r === 0) {
    monthlyPayment = principal / n;
  } else {
    monthlyPayment = (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
  }
  const totalPayment = monthlyPayment * n;
  const totalInterest = totalPayment - principal;
  return { monthlyPayment, totalPayment, totalInterest };
}

export function amortizationSchedule({
  principal,
  ratePercent,
  months,
}: {
  principal: number;
  ratePercent: number;
  months: number;
}): {
  month: number;
  payment: number;
  interest: number;
  principal: number;
  balance: number;
}[] {
  const r = ratePercent / 100 / 12;
  const { monthlyPayment } = amortizationPayment({ principal, ratePercent, months });
  let balance = principal;
  const schedule: { month: number; payment: number; interest: number; principal: number; balance: number }[] = [];
  for (let m = 1; m <= months; m++) {
    const interest = balance * r;
    const principalPart = monthlyPayment - interest;
    balance = balance - principalPart;
    schedule.push({ month: m, payment: monthlyPayment, interest, principal: principalPart, balance: Math.max(balance, 0) });
  }
  return schedule;
}

export function budgetSummary({
  income,
  expenses,
}: {
  income: number;
  expenses: { label: string; value: number }[];
}): {
  income: number;
  totalExpenses: number;
  balance: number;
  savingsRate: number;
} {
  const totalExpenses = expenses.reduce((sum, e) => sum + e.value, 0);
  const balance = income - totalExpenses;
  const savingsRate = income > 0 ? (balance / income) * 100 : 0;
  return { income, totalExpenses, balance, savingsRate };
}