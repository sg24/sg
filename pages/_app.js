import App from 'next/app'
import NProgress from 'nprogress'
import Router from 'next/router'
import React from 'react'
typeof window !== 'undefined' ? require('events-polyfill') : null

Router.events.on('routeChangeStart', url => {
  // NProgress.configure({spinner: false})
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    let redirect = false;
    let url = null;
    if (ctx.req && ctx.req.useragent && !ctx.req.useragent.isBot) {
      // var newHost = req.headers.host.slice(4);
      ctx.req.redirect(301, '/index/post');
    }
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx })
    }

    return { pageProps,redirect, url }
  }

  componentDidMount() {
    if (this.props.redirect) {
      window.location.assign(this.props.url)
    }
  }

  componentDidUpdate() {
    if (this.props.redirect) {
      window.location.assign(this.props.url)
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    
    return <Component {...pageProps} />
  }
}

export default MyApp