import * as Joi from "joi"

export enum NODE_ENV {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
  TEST = "test"
}

export const postgresSchema = Joi.object({
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().port().required()
})

export const redisSchema = Joi.object({
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().port().required()
})

export const rabbitMQSchema = Joi.object({
  RABBITMQ_HOST: Joi.string().required(),
  RABBITMQ_PORT: Joi.number().port().required(),
  RABBITMQ_USER: Joi.string().required(),
  RABBITMQ_PASSWORD: Joi.string().required()
})

export const smtpSchema = Joi.object({
  SMTP_HOST: Joi.string().required(),
  SMTP_PORT: Joi.number().port().required(),
  SMTP_USER: Joi.string().email().required(),
  SMTP_PASSWORD: Joi.string().required()
})

export const observabilitySchema = Joi.object({
  PROMETHEUS_PORT: Joi.number().port().required(),
  LOKI_PORT: Joi.number().port().required(),
  LOKI_HOST: Joi.string().uri().required(),
  GRAFANA_PORT: Joi.number().port().required(),
  GRAFANA_USER: Joi.string().required(),
  GRAFANA_PASSWORD: Joi.string().required()
})

export const apiSchema = Joi.object({
  API_PORT: Joi.number().port().required(),
  API_URL: Joi.string().uri().required()
})

export const clientSchema = Joi.object({
  CLIENT_PORT: Joi.number().port().required(),
  CLIENT_URL: Joi.string().uri().required()
})

export const nodeEnvSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(...Object.values(NODE_ENV))
    .default(NODE_ENV.PRODUCTION)
})

export const configValidationSchema = Joi.object()
  .concat(postgresSchema)
  .concat(redisSchema)
  .concat(rabbitMQSchema)
  .concat(smtpSchema)
  .concat(observabilitySchema)
  .concat(apiSchema)
  .concat(clientSchema)
  .concat(nodeEnvSchema)
