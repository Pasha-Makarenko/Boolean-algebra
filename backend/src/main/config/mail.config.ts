import { MailerOptions } from "@nestjs-modules/mailer"
import { PugAdapter } from "@nestjs-modules/mailer/dist/adapters/pug.adapter"
import * as path from "node:path"

export interface IMailConfig {
  host: string
  port: number
  user: string
  password: string
}

export const getMailConfig = (config: IMailConfig): MailerOptions => ({
  transport: {
    host: config.host,
    port: config.port,
    secure: true,
    auth: {
      user: config.user,
      pass: config.password
    }
  },
  defaults: {
    from: config.user
  },
  template: {
    dir: path.join(__dirname, "../../infrastructure/notifications/templates"),
    adapter: new PugAdapter(),
    options: {
      strict: true
    }
  }
})
