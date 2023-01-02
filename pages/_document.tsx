import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=Telex&display=swap"
          rel="stylesheet"
        />
      </Head>
      {/* GA - only for app improvement purposes */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-467QLT2HY2"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-467QLT2HY2');
        `}
      </Script>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
