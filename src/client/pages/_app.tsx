import { NextPageContext } from 'next'
import { AppProps } from 'next/app'

import Layout from '../components/Layout'
import 'styles/_app.scss'

export default function MyApp({ Component, pageProps }: AppProps, ctx: NextPageContext) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
