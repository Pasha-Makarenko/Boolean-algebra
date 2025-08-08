export interface IRabbitMqConfig {
  user: string
  password: string
  host: string
  port: number
}

export const getRabbitMqUrls = (config: IRabbitMqConfig) => {
  const { user, password, host, port } = config
  return [`amqp://${user}:${password}@${host}:${port}`]
}
