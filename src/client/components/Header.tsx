import styles from './Header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>やること一覧</h1>
      <button className={styles.btnOpenModal}>+ 追加</button>
    </header>
  )
}

export default Header
