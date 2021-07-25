import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TodosService } from './todos.service'
import { Todo } from '../entities/todo.entity'

describe('TodosService', () => {
  let module: TestingModule
  let service: TodosService
  let repository: Repository<Todo>

  beforeEach(async () => {
    module = await Test.createTestingModule({
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
    repository = module.get('TodoRepository')
  })

  afterEach(async () => {
    await module.close()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('findAll', async () => {
    const testTodos = [
      {
        title: 'title1',
        body: 'body1',
        completed: false,
        dt_start: new Date(2021, 0, 1),
        dt_end: new Date(2021, 0, 1),
      },
      {
        title: 'title2',
        body: 'body2',
        completed: false,
        dt_start: new Date(2021, 1, 1),
        dt_end: new Date(2021, 1, 1),
      },
    ]
    await repository.save(testTodos)
    const todos = await service.findAll()
    expect(todos).toMatchObject([
      {
        id: expect.any(Number),
        title: 'title1',
        body: 'body1',
        completed: false,
        dt_start: new Date(2021, 0, 1),
        dt_end: new Date(2021, 0, 1),
      },
      {
        id: expect.any(Number),
        title: 'title2',
        body: 'body2',
        completed: false,
        dt_start: new Date(2021, 1, 1),
        dt_end: new Date(2021, 1, 1),
      },
    ])
  })

  it('findOne', async () => {
    await repository.save({
      title: 'title1',
      body: 'body1',
      completed: false,
      dt_start: new Date(2021, 0, 1),
      dt_end: new Date(2021, 0, 1),
    })
    const todos = await service.findOne('1')
    expect(todos).toMatchObject({
      id: expect.any(Number),
      title: 'title1',
      body: 'body1',
      completed: false,
      dt_start: new Date(2021, 0, 1),
      dt_end: new Date(2021, 0, 1),
    })
  })

  it('create', async () => {
    const testCreateTodo = {
      title: 'title1',
      body: 'body1',
      completed: false,
      dt_start: new Date(2021, 0, 1),
      dt_end: new Date(2021, 0, 1),
    }
    const todo = await service.create(testCreateTodo)
    expect(todo).toMatchObject({
      id: expect.any(Number),
      title: 'title1',
      body: 'body1',
      completed: false,
      dt_start: new Date(2021, 0, 1),
      dt_end: new Date(2021, 0, 1),
    })
  })

  it('update', async () => {
    const testCreateTodo = {
      title: 'title1',
      body: 'body1',
      completed: false,
      dt_start: new Date(2021, 0, 1),
      dt_end: new Date(2021, 0, 1),
    }
    const testUpdateTodo = {
      title: 'updatedTitle1',
      body: 'updatedBody1',
      completed: false,
      dt_start: new Date(2021, 1, 1),
      dt_end: new Date(2021, 1, 1),
    }
    await repository.save(testCreateTodo)
    await service.update('1', testUpdateTodo)
    const todo = await repository.findOne('1')
    expect(todo).toMatchObject({
      id: expect.any(Number),
      title: 'updatedTitle1',
      body: 'updatedBody1',
      completed: false,
      dt_start: new Date(2021, 1, 1),
      dt_end: new Date(2021, 1, 1),
    })
  })

  it('delete', async () => {
    const testCreateTodos = [
      {
        title: 'title1',
        body: 'body1',
        completed: false,
        dt_start: new Date(2021, 1, 1),
        dt_end: new Date(2021, 1, 1),
      },
      {
        title: 'title2',
        body: 'body2',
        completed: false,
        dt_start: new Date(2021, 1, 1),
        dt_end: new Date(2021, 1, 1),
      },
    ]
    await repository.save(testCreateTodos)
    await service.delete('2')
    const todos = await repository.find()
    expect(todos).toHaveLength(1)
  })
})
