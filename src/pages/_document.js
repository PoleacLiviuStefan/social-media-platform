import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head >
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, minimum-scale=1,maximum-scale=5" />
      <meta name="theme-color" content="#000000" />
      <meta id="meta-description" name="description"
    content="Descriere site " />
      <link rel="icon" href="../../../public/next.svg" />
      <title>Titlu pagina</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
