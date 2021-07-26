import { configureStore } from '@reduxjs/toolkit'
import todosReducer from './slice'

const store = configureStore({
  reducer: {
    todosReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
