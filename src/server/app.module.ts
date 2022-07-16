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
    // api
    TodosModule,

    // nextjs
    ViewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
