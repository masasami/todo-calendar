import axios from 'axios'
import { DeleteResult } from 'typeorm'
import { TodoInterface, CreateTodoDto } from '../../interfaces/todo'

export class ApiService {
  private apiUrl = process.env.NEXT_PUBLIC_API_URL

  async getTodos(): Promise<TodoInterface[]> {
    return (await axios.get<TodoInterface[]>(`${this.apiUrl}/todos`)).data
  }

  async createTodo(todo: CreateTodoDto): Promise<TodoInterface> {
    return (await axios.post<TodoInterface>(`${this.apiUrl}/todos`, todo)).data
  }

  async deleteTodo(id: number): Promise<DeleteResult> {
    return (await axios.delete<DeleteResult>(`${this.apiUrl}/todos/${id}`)).data
  }
}
