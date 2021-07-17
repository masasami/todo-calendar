import Head from 'next/head'

import styles from 'components/Layout.module.scss'

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>todo-app</title>
        <meta name="description" content="todo-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </div>
  )
}

export default Layout
