import { ConfigService } from "@nestjs/config"
import { MailerOptions } from "@nestjs-modules/mailer"
import { PugAdapter } from "@nestjs-modules/mailer/dist/adapters/pug.adapter"
import * as path from "node:path"

export const getMailConfig = (configService: ConfigService): MailerOptions => ({
  transport: {
    host: configService.get<string>("SMTP_HOST"),
    port: Number(configService.get<number>("SMTP_PORT")),
    secure: true,
    auth: {
      user: configService.get<string>("SMTP_USER"),
      pass: configService.get<string>("SMTP_PASSWORD")
    }
  },
  defaults: {
    from: configService.get<string>("SMTP_USER")
  },
  template: {
    dir: path.join(__dirname, "../../infrastructure/notifications/templates"),
    adapter: new PugAdapter(),
    options: {
      strict: true
    }
  }
})
