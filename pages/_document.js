import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static getInitialProps(ctx) {
    return Document.getInitialProps(ctx)
  }

  render() {
    return (
      <html lang="en-us">
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}