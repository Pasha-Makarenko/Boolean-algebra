import { redisStore } from "cache-manager-redis-store"

export interface ICacheConfig {
  host: string
  port: number
}

export const getCacheConfig = (config: ICacheConfig) => {
  const store = redisStore({
    socket: {
      host: config.host,
      port: config.port
    }
  })
  return {
    store: () => store
  }
}
