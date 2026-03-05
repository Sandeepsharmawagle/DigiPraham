import './globals.css';
import { ThemeProvider } from './context/ThemeContext';

export const metadata = {
  title: 'DigiPratham – AI, Data & Digital Solutions',
  description: 'DigiPratham provides AI & Machine Learning, Data Analytics, Web Development, and App Development services with internship programs.',
  keywords: 'AI, Machine Learning, Data Analytics, Web Development, App Development, Internship',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
