import { useState } from 'react'

import { ApiService } from '../lib/api.service'
import { TodoInterface } from '../../interfaces/todo'
import styles from './ModalEdit.module.scss'

import { useAppDispatch } from '../redux/hooks'
import { updateTodoReducer } from '../redux/slice'

const ModalEdit = (props: { todo: TodoInterface; closeModalEdit: () => void }) => {
  const apiService = new ApiService()
  const [todo, setTodo] = useState(props.todo)
  const dispatch = useAppDispatch()

  // 戻る
  const handleBack = () => {
    props.closeModalEdit()
  }
  // やることの更新
  const handleEdit = async () => {
    try {
      const res = await apiService.updateTodo(todo.id, {
        title: todo.title,
        body: todo.body,
        completed: todo.completed,
        dt_start: todo.dt_start,
        dt_end: todo.dt_end,
      })
      console.log(res)
      dispatch(updateTodoReducer(todo))
      props.closeModalEdit()
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
        <header className={styles.header}>やることの詳細</header>

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
          <button className={styles.btnAdd} onClick={handleEdit}>
            編集
          </button>
        </footer>
      </div>
    </div>
  )
}

export default ModalEdit
