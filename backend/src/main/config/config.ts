import { ConfigModuleOptions } from "@nestjs/config"
import { configValidationSchema, NODE_ENV } from "@main/config/config.schema"
import { IDatabaseConfig } from "@main/config/database.config"
import { IRabbitMqConfig } from "@main/config/rabbitmq.config"
import { ICacheConfig } from "@main/config/cache.config"
import { IMailConfig } from "@main/config/mail.config"
import { ILoggerConfig } from "@main/config/logger.config"
import { IApiConfig } from "@main/config/api.config"
import { IClientConfig } from "@main/config/client.config"

export interface IConfig {
  api: IApiConfig
  client: IClientConfig
  database: IDatabaseConfig
  rabbitMq: IRabbitMqConfig
  cache: ICacheConfig
  mail: IMailConfig
  logger: ILoggerConfig
  nodeEnv: NODE_ENV
}

const getEnvFilePath = (env: string | undefined) => {
  let filePath = "../../.env"

  switch (env) {
    case NODE_ENV.TEST:
      filePath += ".test"
      break
    case NODE_ENV.DEVELOPMENT:
      filePath += ".dev"
      break
  }

  return filePath
}

const getConfig: () => IConfig = () => ({
  api: {
    port: process.env.API_PORT ? parseInt(process.env.API_PORT, 10) : 3000,
    url: process.env.API_URL || ""
  },
  client: {
    url: process.env.CLIENT_URL || ""
  },
  database: {
    host: process.env.POSTGRES_HOST || "",
    port: process.env.POSTGRES_PORT
      ? parseInt(process.env.POSTGRES_PORT, 10)
      : 5432,
    user: process.env.POSTGRES_USER || "",
    password: process.env.POSTGRES_PASSWORD || "",
    dbName: process.env.POSTGRES_DB || ""
  },
  rabbitMq: {
    host: process.env.RABBITMQ_HOST || "",
    port: process.env.RABBITMQ_PORT
      ? parseInt(process.env.RABBITMQ_PORT, 10)
      : 5672,
    user: process.env.RABBITMQ_USER || "",
    password: process.env.RABBITMQ_PASSWORD || ""
  },
  cache: {
    host: process.env.REDIS_HOST || "",
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379
  },
  mail: {
    host: process.env.SMTP_HOST || "",
    port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587,
    user: process.env.SMTP_USER || "",
    password: process.env.SMTP_PASSWORD || ""
  },
  logger: {
    url: process.env.LOKI_URL || ""
  },
  nodeEnv: (process.env.NODE_ENV as NODE_ENV) || NODE_ENV.PRODUCTION
})

export const config: ConfigModuleOptions = {
  envFilePath: getEnvFilePath(process.env.NODE_ENV),
  isGlobal: true,
  load: [getConfig],
  validationSchema: configValidationSchema,
  validationOptions: {
    abortEarly: true,
    allowUnknown: true
  }
}
