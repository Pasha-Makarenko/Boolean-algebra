import { ConfigService } from "@nestjs/config"
import { redisStore } from "cache-manager-redis-store"

export const getCacheConfig = async (configService: ConfigService) => {
  const store = await redisStore({
    socket: {
      host: configService.get<string>("REDIS_HOST"),
      port: parseInt(configService.get<string>("REDIS_PORT")!)
    }
  })
  return {
    store: () => store
  }
}
