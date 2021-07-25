import { useState } from 'react'

import ModalAdd from './ModalAdd'
import styles from './Header.module.scss'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const switchModal = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>やること一覧</h1>
        <button className={styles.btnOpenModal} onClick={switchModal}>
          + 追加
        </button>
      </header>
      {isOpen && <ModalAdd switchModal={switchModal} />}
    </>
  )
}

export default Header
