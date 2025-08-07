import { MikroOrmModuleOptions } from "@mikro-orm/nestjs"
import { ConfigService } from "@nestjs/config"
import { PostgreSqlDriver } from "@mikro-orm/postgresql"

export const getMikroOrmConfig = (
  configService: ConfigService
): MikroOrmModuleOptions => ({
  driver: PostgreSqlDriver,
  host: configService.get<string>("POSTGRES_HOST"),
  port: Number(configService.get<number>("POSTGRES_PORT")),
  user: configService.get<string>("POSTGRES_USER"),
  password: configService.get<string>("POSTGRES_PASSWORD"),
  dbName: configService.get<string>("POSTGRES_DB"),
  debug: configService.get<string>("NODE_ENV") !== "production",
  autoLoadEntities: true
})
