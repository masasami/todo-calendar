import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  console.log(process.env.NODE_ENV)
  console.log(process.env.DB_TYPE)
  console.log(process.env.DB_HOST)
  console.log(process.env.DB_PORT)
  console.log(process.env.DB_USERNAME)
  console.log(process.env.DB_PASSWORD)
  console.log(process.env.DATABASE)
  const app = await NestFactory.create(AppModule)
  await app.listen(process.env.PORT || 3000)
}
bootstrap()
