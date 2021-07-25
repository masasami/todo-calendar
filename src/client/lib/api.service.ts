import axios from 'axios'
import { UpdateResult, DeleteResult } from 'typeorm'
import { TodoInterface, CreateTodoDto, UpdateTodoDto } from '../../interfaces/todo'

export class ApiService {
  private apiUrl = process.env.NEXT_PUBLIC_API_URL

  async getTodos(): Promise<TodoInterface[]> {
    return (await axios.get<TodoInterface[]>(`${this.apiUrl}/todos`)).data
  }

  async createTodo(todo: CreateTodoDto): Promise<TodoInterface> {
    return (await axios.post<TodoInterface>(`${this.apiUrl}/todos`, todo)).data
  }

  async updateTodo(id: number, todo: UpdateTodoDto): Promise<UpdateResult> {
    return (await axios.put<UpdateResult>(`${this.apiUrl}/todos/${id}`, todo)).data
  }

  async deleteTodo(id: number): Promise<DeleteResult> {
    return (await axios.delete<DeleteResult>(`${this.apiUrl}/todos/${id}`)).data
  }
}
