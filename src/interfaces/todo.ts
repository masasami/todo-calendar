export interface TodoInterface {
  id: number
  title: string
  body: string
  completed: boolean
  dt_start: Date
  dt_end: Date
}

export interface CreateTodoDto {
  title: string
  body: string
  completed: boolean
  dt_start: Date
  dt_end: Date
}

export interface UpdateTodoDto {
  title: string
  body: string
  completed: boolean
  dt_start: Date
  dt_end: Date
}
