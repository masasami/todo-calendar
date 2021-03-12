import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TodosController } from './todos.controller'
import { TodosService } from './todos.service'
import { Todo } from '../entities/todo.entity'

describe('TodosController', () => {
  let controller: TodosController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          entities: [Todo],
          logging: false,
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Todo]),
      ],
      controllers: [TodosController],
      providers: [TodosService],
    }).compile()

    controller = module.get<TodosController>(TodosController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
