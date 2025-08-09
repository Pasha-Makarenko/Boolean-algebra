import { Controller, Get, Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { CacheModule } from "@nestjs/cache-manager"
import { MailerModule } from "@nestjs-modules/mailer"
import { LoggerModule } from "nestjs-pino"
import { MikroOrmModule } from "@mikro-orm/nestjs"
import { PostgreSqlDriver } from "@mikro-orm/postgresql"
import { config } from "@main/config/config"
import { NODE_ENV } from "@main/config/config.schema"
import { getCacheConfig, ICacheConfig } from "@main/config/cache.config"
import { getPinoConfig, ILoggerConfig } from "@main/config/logger.config"
import { getMailConfig, IMailConfig } from "@main/config/mail.config"
import { MetricsModule } from "@main/modules/metrics.module"
import {
  getMikroOrmConfig,
  IDatabaseConfig
} from "@main/config/database.config"

@Controller("test")
export class TestController {
  @Get()
  testEndpoint() {
    return { message: "Test endpoint is working!" }
  }
}

@Module({
  imports: [
    ConfigModule.forRoot(config),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (service: ConfigService) =>
        getMikroOrmConfig(
          service.get<IDatabaseConfig>("database")!,
          service.get<NODE_ENV>("nodeEnv")!
        ),
      driver: PostgreSqlDriver,
      inject: [ConfigService]
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: (service: ConfigService) =>
        getCacheConfig(service.get<ICacheConfig>("cache")!),
      inject: [ConfigService]
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (service: ConfigService) =>
        getMailConfig(service.get<IMailConfig>("mail")!),
      inject: [ConfigService]
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (service: ConfigService) =>
        getPinoConfig(
          service.get<ILoggerConfig>("logger")!,
          service.get<NODE_ENV>("nodeEnv")!
        ),
      inject: [ConfigService]
    }),
    MetricsModule
  ],
  controllers: [TestController],
  exports: [ConfigModule]
})
export class AppModule {}
