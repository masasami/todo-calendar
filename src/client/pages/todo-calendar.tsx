import { useState, useEffect } from 'react'
import { Calendar, momentLocalizer, DateLocalizer, DateLocalizerSpec } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'

import { ApiService } from '../lib/api.service'
import { TodoInterface } from '../../interfaces/todo'
import Header from '../components/Header'
import styles from './todo-calendar.module.scss'

const TodoCalendar = () => {
  const apiService = new ApiService()
  const [todos, setTodos] = useState<TodoInterface[]>([])

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
  const editTodo = (todo: TodoInterface) => {
    console.log('editTodo')
    console.log(todo)
  }
  // やることの削除
  const deleteTodo = (todo: TodoInterface) => {
    console.log('deleteTodo')
    console.log(todo)
  }
  const localizer = momentLocalizer(moment)
  return (
    <div className={styles.container}>
      <Header />
      <Calendar
        localizer={localizer}
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
              <div className={styles.todo} onClick={() => editTodo(todo)}>
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
    </div>
  )
}

export default TodoCalendar
