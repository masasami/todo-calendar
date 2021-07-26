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
  },
})

export const { setTodosReducer } = todosSlice.actions

export default todosSlice.reducer
