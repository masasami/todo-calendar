import { NextPageContext } from 'next'
import { AppProps } from 'next/app'

import { Provider } from 'react-redux'
import store from '../redux/store'

import Layout from '../components/Layout'
import 'styles/_app.scss'

export default function MyApp({ Component, pageProps }: AppProps, ctx: NextPageContext) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
