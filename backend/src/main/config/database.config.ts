import { MikroOrmModuleOptions } from "@mikro-orm/nestjs"
import { PostgreSqlDriver } from "@mikro-orm/postgresql"
import { NODE_ENV } from "@main/config/config.schema"

export interface IDatabaseConfig {
  host: string
  port: number
  user: string
  password: string
  dbName: string
}

export const getMikroOrmConfig = (
  config: IDatabaseConfig,
  environment: NODE_ENV
): MikroOrmModuleOptions => ({
  driver: PostgreSqlDriver,
  host: config.host,
  port: config.port,
  user: config.user,
  password: config.password,
  dbName: config.dbName,
  debug: environment !== NODE_ENV.PRODUCTION,
  autoLoadEntities: true
})
