import React from 'react';
import Document, { Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';
import theme from '@/components/Theme';
import flush from 'styled-jsx/server';

class MyDocument extends Document {
  static getInitialProps = async (ctx: DocumentContext) => {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: (
        <>
          {initialProps.styles}
          {sheets.getStyleElement()}
          {flush() || null}
        </>
      )
    };
  };

  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          <meta name="theme-color" content={theme.palette.primary.main} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="fb:app_id" content="331750437466885" />
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat+Alternates:400,500,700|Quicksand:300,400,500,600,700&display=swap&subset=vietnamese"
            rel="stylesheet"
          />
          <link rel="apple-touch-icon" sizes="57x57" href="/static/apple-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/static/apple-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/static/apple-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/static/apple-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/static/apple-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/static/apple-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/static/apple-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/static/apple-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-icon-180x180.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/static/android-icon-192x192.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/static/favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="/static/ms-icon-144x144.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
