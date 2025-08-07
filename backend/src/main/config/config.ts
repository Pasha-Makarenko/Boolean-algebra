import * as process from "node:process"
import { ConfigModuleOptions } from "@nestjs/config"
import { configValidationSchema, NODE_ENV } from "@main/config/config.schema"

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

export const config: ConfigModuleOptions = {
  envFilePath: getEnvFilePath(process.env.NODE_ENV),
  isGlobal: true,
  validationSchema: configValidationSchema,
  validationOptions: {
    abortEarly: true,
    allowUnknown: true
  }
}
