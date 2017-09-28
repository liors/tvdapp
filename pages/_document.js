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
         <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
         <link href="https://unpkg.com/tachyons@4.8.1/css/tachyons.min.css" rel="stylesheet" />
         <link rel='stylesheet' type='text/css' href='http://ricostacruz.com/nprogress/nprogress.css' />
         <script src="/static/js/web3.min.js"></script>
       </Head>
       <body>
         <Main />
         <NextScript />
       </body>
     </html>
    )
  }
}