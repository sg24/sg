import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static getInitialProps(ctx) {
    if (ctx.req && ctx.req.useragent && !ctx.req.useragent.isBot) {
        if(ctx.req.useragent.source !== 'facebookexternalhit/1.1' ||
          ctx.req.useragent.source !== 'Facebot' ||
          ctx.req.useragent.source !== 'Twitterbot' ) {
              let url = ctx.req.originalUrl.split('robotonly').pop().split('rb').splice(0).join('')
            let updateUrl = (url === ('/index' || 'index' | 'content')) ? '/index/post' : url
            ctx.res.redirect(301, updateUrl);
        }
    }
    return Document.getInitialProps(ctx)
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <link rel="stylesheet" type="text/css" href="/nprogress.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}