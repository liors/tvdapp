import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const {html, head, errorHtml, chunks} = renderPage()
    const styles = flush()
    return { html, head, errorHtml, chunks, styles }
  }

  render () {
    return (
     <html>
       <Head>
         <style>{`body { margin: 0 } html { font-family: Roboto, sans-serif; -webkit-font-smoothing: antialiased; }`}</style>
         <meta charSet='utf-8' />
         <meta name='viewport' content='initial-scale=1.0, width=device-width' />
         <link href='//fonts.googleapis.com/css?family=Roboto' rel="stylesheet" />
         <link href='//cdnjs.cloudflare.com/ajax/libs/tachyons/4.8.1/tachyons.min.css' rel='stylesheet' />
         <link href='//cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css' rel='stylesheet' />
         <script src='/static/js/web3.min.js'></script>
       </Head>
       <body>
         <Main />
         <NextScript />
       </body>
     </html>
    )
  }
}