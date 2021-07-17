import { useEffect, useState } from 'react'
import { ApiService } from '../lib/api.service'
import { TodoInterface } from '../../interfaces/todo'
import styles from 'pages/index.module.scss'

const Index = () => {
  const apiService = new ApiService()
  const [todos, setTodos] = useState<TodoInterface[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        const todos = await apiService.getTodos()
        setTodos(todos)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  return (
    <div className={styles.container}>
      <h1>Todo一覧</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default Index
