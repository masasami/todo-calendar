import { Controller, Get, Param } from '@nestjs/common'
import { TodosService } from './todos.service'
import { Todo } from 'src/entities/todo.entity'

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async findAll(): Promise<Todo[]> {
    return this.todosService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Todo> {
    return this.todosService.findOne(id)
  }
}
