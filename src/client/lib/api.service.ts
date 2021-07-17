import axios from 'axios'
import { TodoInterface } from '../../interfaces/todo'

export class ApiService {
  private apiUrl = process.env.NEXT_PUBLIC_API_URL

  async getTodos(): Promise<TodoInterface[]> {
    console.log(this.apiUrl)
    return (await axios.get<TodoInterface[]>(`${this.apiUrl}/todos`)).data
  }
}
