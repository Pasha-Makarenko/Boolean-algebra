import { ConfigService } from "@nestjs/config"

export const getRabbitMqUrls = (configService: ConfigService) => {
  const user = configService.get<string>("RABBITMQ_USER")
  const password = configService.get<string>("RABBITMQ_PASSWORD")
  const host = configService.get<string>("RABBITMQ_HOST")
  const port = configService.get<number>("RABBITMQ_PORT")

  return [`amqp://${user}:${password}@${host}:${port}`]
}
