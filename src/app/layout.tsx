import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import '../../styles/index.css';

export const metadata: Metadata = {
  title: 'AIQ PAS/CMS',
  description: 'AI-Grade Platform',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
