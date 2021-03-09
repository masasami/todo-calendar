import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Routes, RouterModule } from 'nest-router'
import { Todo } from './entities/todo.entity'

import { ViewModule } from './view/view.module'
import { TodosModule } from './todos/todos.module'

const routes: Routes = [
  {
    path: 'api',
    children: [{ path: 'todos', module: TodosModule }],
  },
]

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
      entities: [Todo],
      synchronize: true,
    }),
    RouterModule.forRoutes(routes),
    // api
    TodosModule,

    // nextjs
    ViewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}