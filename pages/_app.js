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

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx })
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props;
    
    return <Component {...pageProps} />
  }
}

export default MyApp