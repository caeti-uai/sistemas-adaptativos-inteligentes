import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(
    'https://caeti-sistemas-adaptativos.nutty-swan-4929.chatgpt.site',
  ),
  title: 'Sistemas Adaptativos Inteligentes · CAETI',
  description:
    'Presentación interactiva de la plataforma experimental y los proyectos de investigación del CAETI.',
  openGraph: {
    title: 'Sistemas Adaptativos Inteligentes · CAETI',
    description:
      'Plataforma experimental y proyectos de investigación del CAETI.',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sistemas Adaptativos Inteligentes · CAETI',
    description:
      'Plataforma experimental y proyectos de investigación del CAETI.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
