import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TodoInterface } from '../../interfaces/todo'

interface State {
  todos: TodoInterface[]
}
const initialState: State = {
  todos: [],
}

export const todosSlice = createSlice({
  name: 'todosSlice',
  initialState,
  reducers: {
    setTodosReducer: (state, action: PayloadAction<TodoInterface[]>) => {
      state.todos = action.payload
    },
    updateTodoReducer: (state, action: PayloadAction<TodoInterface>) => {
      state.todos = state.todos.map((todo) => {
        const updatedTodo = action.payload
        if (todo.id === updatedTodo.id) {
          return updatedTodo
        }
        return todo
      })
    },
    addTodoReducer: (state, action: PayloadAction<TodoInterface>) => {
      state.todos.push(action.payload)
    },
  },
})

export const { setTodosReducer, updateTodoReducer, addTodoReducer } = todosSlice.actions

export default todosSlice.reducer
