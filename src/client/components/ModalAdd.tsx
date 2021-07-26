import { useState } from 'react'

import { ApiService } from '../lib/api.service'
import { CreateTodoDto } from '../../interfaces/todo'
import styles from './ModalAdd.module.scss'

import { useAppDispatch } from '../redux/hooks'
import { addTodoReducer } from '../redux/slice'

const ModalAdd = (props: { switchModal: () => void }) => {
  const apiService = new ApiService()
  const [todo, setTodo] = useState<CreateTodoDto>({
    title: '',
    body: '',
    completed: false,
    dt_start: new Date(),
    dt_end: new Date(),
  })
  const dispatch = useAppDispatch()

  // 戻る
  const handleBack = () => {
    props.switchModal()
  }
  // 追加
  const handleAdd = async () => {
    try {
      const addedTodo = await apiService.createTodo(todo)
      dispatch(addTodoReducer(addedTodo))
      props.switchModal()
    } catch (e) {
      console.log(e)
    }
  }
  // 日付フォーマット
  const formatDate = (d: Date) => {
    return [d.getFullYear(), ('0' + (d.getMonth() + 1)).slice(-2), ('0' + d.getDate()).slice(-2)].join('-')
  }

  return (
    <div className={styles.container}>
      <div className={styles.modalBody}>
        {/* ヘッダー */}
        <header className={styles.header}>やることの追加</header>

        {/* メイン */}
        <main className={styles.main}>
          <section>
            <p>行う日</p>
            <input
              type="date"
              value={formatDate(todo.dt_start)}
              onChange={(e) => {
                setTodo({ ...todo, dt_start: new Date(e.target.value), dt_end: new Date(e.target.value) })
              }}
            />
          </section>

          <section>
            <p>タイトル</p>
            <input type="text" value={todo.title} onChange={(e) => setTodo({ ...todo, title: e.target.value })} />
          </section>

          <section>
            <p>内容</p>
            <textarea
              rows={10}
              value={todo.body}
              onChange={(e) => setTodo({ ...todo, body: e.target.value })}
            ></textarea>
          </section>
        </main>

        {/* フッター */}
        <footer className={styles.footer}>
          <button className={styles.btnBack} onClick={handleBack}>
            戻る
          </button>
          <button className={styles.btnAdd} onClick={handleAdd}>
            追加
          </button>
        </footer>
      </div>
    </div>
  )
}

export default ModalAdd
