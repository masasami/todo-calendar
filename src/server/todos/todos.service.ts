import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, DeleteResult, UpdateResult } from 'typeorm'
import { CreateTodoDto, UpdateTodoDto } from 'src/interfaces/todo'
import { Todo } from '../entities/todo.entity'

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.todosRepository.find()
  }

  findOne(id: string): Promise<Todo> {
    return this.todosRepository.findOne(id)
  }

  create(todo: CreateTodoDto): Promise<Todo> {
    return this.todosRepository.save(todo)
  }

  update(id: string, todo: UpdateTodoDto): Promise<UpdateResult> {
    return this.todosRepository.update(id, todo)
  }

  delete(id: string): Promise<DeleteResult> {
    return this.todosRepository.delete(id)
  }
}
