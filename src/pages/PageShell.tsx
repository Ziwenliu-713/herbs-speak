import { ReactNode } from 'react';

export function PageShell({
  title,
  subtitle,
  right,
  children
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h1 className="pageTitle">{title}</h1>
          {subtitle ? <div className="pageSubtitle">{subtitle}</div> : null}
        </div>
        {right ? <div className="pageHeaderRight">{right}</div> : null}
      </div>
      {children}
    </div>
  );
}

