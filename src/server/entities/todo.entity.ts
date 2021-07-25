import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  body: string

  @Column()
  completed: boolean

  @Column()
  dt_start: Date

  @Column()
  dt_end: Date
}
