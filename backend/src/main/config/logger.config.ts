import { ConfigService } from "@nestjs/config"
import { Params } from "nestjs-pino"

export enum LogLevel {
  INFO = "info",
  WARN = "warn",
  ERROR = "error"
}

export const samplingLoggerConfig = {
  development: {
    [LogLevel.INFO]: 1,
    [LogLevel.WARN]: 1,
    [LogLevel.ERROR]: 1
  },
  test: {
    [LogLevel.INFO]: 1,
    [LogLevel.WARN]: 1,
    [LogLevel.ERROR]: 1
  },
  production: {
    [LogLevel.INFO]: 0.1,
    [LogLevel.WARN]: 1,
    [LogLevel.ERROR]: 1
  }
}

export const getPinoConfig = (configService: ConfigService): Params => ({
  pinoHttp: {
    level: LogLevel.INFO,
    hooks: {
      logMethod(args, method) {
        const sampling =
          samplingLoggerConfig[configService.get<string>("NODE_ENV")!]
        const level = args[0] as LogLevel
        if (sampling[level] === 0) return
        if (sampling[level] && Math.random() > sampling[level]) return
        return method.apply(this, args)
      }
    },
    customLogLevel: (res, err) => {
      if (err.statusCode >= 500 || res.statusCode! >= 500) return LogLevel.ERROR
      if (err.statusCode >= 400 || res.statusCode! >= 400) return LogLevel.WARN
      return LogLevel.INFO
    },
    customSuccessMessage: (req, res) =>
      `${req.method} ${req.url} -> ${res.statusCode}`,
    customErrorMessage: (req, res, err) =>
      `ERROR ${req.method} ${req.url} -> ${res.statusCode}: 
                      ${err?.message}`,
    serializers: {
      req(req) {
        return {
          method: req.method,
          url: req.url
        }
      },
      res(res) {
        return {
          statusCode: res.statusCode,
          responseTime: res.responseTime
        }
      },
      err(err) {
        if (!err) return undefined
        return {
          message: err.message
        }
      }
    },
    transport:
      configService.get<string>("NODE_ENV") === "test"
        ? undefined
        : {
            target: "pino-loki",
            options: {
              host: configService.get<string>("LOKI_HOST"),
              json: true,
              batch: true,
              labels: { app: "backend" }
            }
          }
  }
})
