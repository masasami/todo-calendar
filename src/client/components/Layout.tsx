import Head from 'next/head'

import styles from 'components/Layout.module.scss'

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>todo-calendar</title>
        <meta name="description" content="todo-calendar" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </div>
  )
}

export default Layout
