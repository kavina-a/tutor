import './globals.css';

export const metadata = {
  title: 'Kavina — Math Tutor',
  description: 'Math. Done Properly. Edexcel IGCSE & IAL specialist.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Caveat:wght@700&family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=Syne:wght@700;800&family=Bebas+Neue&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Clash Display via Fontshare */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
