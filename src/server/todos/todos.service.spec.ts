import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TodosService } from './todos.service'
import { Todo } from '../entities/todo.entity'

describe('TodosService', () => {
  let service: TodosService

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
      providers: [TodosService],
    }).compile()

    service = module.get<TodosService>(TodosService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
