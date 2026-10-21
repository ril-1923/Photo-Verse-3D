import type { ReactNode } from 'react';

interface Props { title?: string; subtitle?: string; children: ReactNode; actions?: ReactNode; wide?: boolean }

export default function PageContainer({ title, subtitle, children, actions, wide }: Props) {
  return (
    <main className="page" id="main">
      <div className={wide ? 'container-fluid px-lg-5' : 'container-xxl'}>
        {title && (
          <header className="page-head">
            <div>
              <h1>{title}</h1>
              {subtitle && <p className="lead-text">{subtitle}</p>}
            </div>
            {actions}
          </header>
        )}
        {children}
      </div>
    </main>
  );
}
