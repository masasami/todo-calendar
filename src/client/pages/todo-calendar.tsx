import { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'

import { ApiService } from '../lib/api.service'
import Header from '../components/Header'
import styles from './todo-calendar.module.scss'

const TodoCalendar = () => {
  const apiService = new ApiService()
  const [todos, setTodos] = useState([])

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

  const onRangeChange = (e) => {
    console.log('onRangeChange')
    console.log(e)
  }
  const onDoubleClickEvent = (e) => {
    console.log('onDoubleClickEvent')
    console.log(e)
  }
  const onKeyPressEvent = (e) => {
    console.log('onKeyPressEvent')
    console.log(e)
  }
  const onSelectEvent = (e) => {
    console.log('onSelectEvent')
    console.log(e)
  }
  const onView = (e) => {
    console.log('onView')
    console.log(e)
  }
  const onDrillDown = (e) => {
    console.log('onDrillDown')
    console.log(e)
  }
  return (
    <div className={styles.container}>
      <Calendar
        localizer={momentLocalizer(moment)}
        events={todos}
        startAccessor="dt_start"
        endAccessor="dt_end"
        onRangeChange={onRangeChange}
        onDoubleClickEvent={onDoubleClickEvent}
        onKeyPressEvent={onKeyPressEvent}
        onSelectEvent={onSelectEvent}
        onView={onView}
        onDrillDown={onDrillDown}
      />
    </div>
  )
}

export default TodoCalendar
