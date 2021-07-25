import { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'

import { ApiService } from '../lib/api.service'
import { TodoInterface } from '../../interfaces/todo'
import Header from '../components/Header'
import ModalEdit from '../components/ModalEdit'
import styles from './todo-calendar.module.scss'

const TodoCalendar = () => {
  const apiService = new ApiService()
  const [todos, setTodos] = useState<TodoInterface[]>([])
  const [todo, setTodo] = useState<TodoInterface>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const todos = await apiService.getTodos()
        console.log(todos)
        setTodos(todos)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  // やることの編集
  const openModalEdit = (todo: TodoInterface) => {
    setTodo(todo)
  }
  const closeModalEdit = () => {
    setTodo(null)
  }
  // やることの削除
  const deleteTodo = async (todo: TodoInterface) => {
    try {
      const res = await apiService.deleteTodo(todo.id)
      console.log(res)
      setTodos((prevTodos) => prevTodos.filter((prevTodo) => prevTodo.id !== todo.id))
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={styles.container}>
      <Header />
      <Calendar
        localizer={momentLocalizer(moment)}
        events={todos.map((todo) => {
          return {
            ...todo,
            dt_start: moment(todo.dt_start).toDate(),
            dt_end: moment(todo.dt_end).toDate(),
          }
        })}
        startAccessor="dt_start"
        endAccessor="dt_end"
        formats={{
          monthHeaderFormat: 'YYYY年MM月',
        }}
        className={styles.calendar}
        eventPropGetter={() => {
          return {
            style: {
              color: '#000000',
              backgroundColor: '#61dafb',
            },
          }
        }}
        components={{
          event: (e) => {
            const todo: TodoInterface = e.event
            return (
              <div className={styles.todo} onClick={() => openModalEdit(todo)}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => {
                    setTodos((prevTodos) =>
                      prevTodos.map((prevTodo) => {
                        if (prevTodo.id === todo.id) prevTodo.completed = e.target.checked
                        return prevTodo
                      })
                    )
                  }}
                />
                <span className={todo.completed ? styles.completed : null}>{todo.title}</span>
                <button
                  className={styles.btnDelete}
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteTodo(todo)
                  }}
                >
                  &times;
                </button>
              </div>
            )
          },
        }}
      />

      {todo && <ModalEdit todo={todo} closeModalEdit={closeModalEdit} />}
    </div>
  )
}

export default TodoCalendar