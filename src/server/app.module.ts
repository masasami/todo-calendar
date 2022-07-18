import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Routes, RouterModule } from 'nest-router'
import { Todo } from './entities/todo.entity'

import { ViewModule } from './view/view.module'
import { TodosModule } from './todos/todos.module'
import { TaskModule } from './task/task.module'

const routes: Routes = [
  {
    path: 'api',
    children: [{ path: 'todos', module: TodosModule }],
  },
]

@Module({
  imports: [
    ConfigModule.forRoot({
      //   isGlobal: true,
      //   envFilePath: process.env.NODE_ENV !== 'production' ? '.env.development' : '.env.production',
    }),
    TypeOrmModule.forRoot({
      type: process.env.TYPE as any,
      url: process.env.DATABASE_URL,
      entities: [Todo],
      synchronize: true,
      ssl: process.env.NODE_ENV !== 'production' ? false : { rejectUnauthorized: false },
    }),
    RouterModule.forRoutes(routes),
    ScheduleModule.forRoot(),
    // api
    TodosModule,

    // cron
    TaskModule,

    // Next.js
    ViewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
