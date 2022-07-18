import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import axios from 'axios'

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name)

  // * * * * * *
  // | | | | | |
  // | | | | | day of week
  // | | | | months
  // | | | day of month
  // | | hours
  // | minutes
  // seconds (optional)
  @Cron('0 */10 * * * *')
  async handleCron() {
    const cronRequestUrl = process.env.CRON_REQUEST_URL || ''
    const data = await axios.get(`${cronRequestUrl}/todos`).then((res) => res.data)

    this.logger.debug(new Date())
    this.logger.debug(JSON.stringify(data))
  }
}
