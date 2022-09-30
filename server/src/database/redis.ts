import { createClient } from 'redis'

const port = Number.parseInt(process.env.REDIS_PORT)

const redisClient = createClient({
  socket: {
    port,
  },
})

export default {
  init: async () => {
    await redisClient.connect()
  },

  set: async (key: string, value: string) => {
    await redisClient.set(key, value)
  },

  get: async (key: string): Promise<string> => {
    return await redisClient.get(key)
  },
}
