import { NestFactory } from "@nestjs/core"
import { AppModule } from "@main/app.module"
import { ConfigService } from "@nestjs/config"
import { Logger } from "nestjs-pino"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { ValidationPipe } from "@nestjs/common"
import { IClientConfig } from "@main/config/client.config"
import { IApiConfig } from "@main/config/api.config"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const logger = app.get(Logger)

  app.enableCors({
    origin: configService.get<IClientConfig>("client")!.url,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
  app.setGlobalPrefix("api")
  app.useLogger(logger)

  const config = new DocumentBuilder()
    .setTitle("Boolean")
    .setDescription("Server side Boolean application")
    .setVersion("0.0.0")
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("/api/docs", app, document)

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  )

  await app.listen(configService.get<IApiConfig>("api")!.port)
}

bootstrap()
