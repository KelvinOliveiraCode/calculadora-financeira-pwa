import { ReactNode } from 'react';

export default function CalculatorCard({ children, title }: { children: ReactNode; title: string }): JSX.Element {
  return (
    <section className='card'>
      <h2>{title}</h2>
      <div className='card-body'>{children}</div>
    </section>
  );
}