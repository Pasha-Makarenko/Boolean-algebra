import { Controller, Get, Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { MikroOrmModule } from "@mikro-orm/nestjs"
import { PostgreSqlDriver } from "@mikro-orm/postgresql"
import { CacheModule } from "@nestjs/cache-manager"
import { MailerModule } from "@nestjs-modules/mailer"
import { LoggerModule } from "nestjs-pino"
import { config } from "@main/config/config"
import { getMikroOrmConfig } from "@main/config/database.config"
import { getCacheConfig } from "@main/config/cache.config"
import { getPinoConfig } from "@main/config/logger.config"
import { getMailConfig } from "@main/config/mail.config"
import { MetricsModule } from "@main/modules/metrics.module"

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
    // MikroOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: getMikroOrmConfig,
    //   driver: PostgreSqlDriver,
    //   inject: [ConfigService]
    // }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: getCacheConfig,
      inject: [ConfigService]
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getMailConfig,
      inject: [ConfigService]
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getPinoConfig,
      inject: [ConfigService]
    }),
    MetricsModule
  ],
  controllers: [TestController],
  exports: [ConfigModule]
})
export class AppModule {}
