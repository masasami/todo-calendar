import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { DeleteResult, UpdateResult } from 'typeorm'
import { TodosService } from './todos.service'
import { Todo } from '../entities/todo.entity'
import { CreateTodoDto, UpdateTodoDto } from 'src/interfaces/todo'

@Controller()
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

  @Post()
  async create(@Body() todo: CreateTodoDto): Promise<Todo> {
    return this.todosService.create(todo)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() todo: UpdateTodoDto): Promise<UpdateResult> {
    return this.todosService.update(id, todo)
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.todosService.delete(id)
  }
}
