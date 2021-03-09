export interface TodoInterface {
  id: number
  title: string
  body: string
}

export interface CreateTodoDto {
  title: string
  body: string
}

export interface UpdateTodoDto {
  title: string
  body: string
}
