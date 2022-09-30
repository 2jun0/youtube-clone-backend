import 'dotenv/config'

import express from 'express'
import 'express-async-errors'

import path from 'path'

import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'

import { AppDataSource } from './database/dataSource'
import redis from './database/redis'
import { errorHandler } from './middlewares/error-handler'
import {
  accountRouter,
  channelRouter,
  commentRouter,
  communityPostRouter,
  hashtagRouter,
  videoRouter,
} from './routes'

// establish database connection
AppDataSource.initialize()
  .then(() => console.log('Data Source has been initialized!'))
  .catch(err => console.error('Error during Data Source initialization:', err))

// establish redis db connection
redis.init()

const app = express()

// swagger
const swaggerSpec = YAML.load(path.join(__dirname, '../build/swagger.yaml'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get('/', (req, res, next) => {
  return res.send('hello')
})

// router
app.use('/accounts', accountRouter)
app.use('/channels', channelRouter)
app.use('/videos', videoRouter)
app.use('/posts', communityPostRouter)
app.use('/comments', commentRouter)
app.use('/tags', hashtagRouter)

// error handler
app.use(errorHandler)

app.listen(process.env.APP_SERVER_PORT, () => {
  console.log(
    `Listen ... port: http://localhost:${process.env.APP_SERVER_PORT}`
  )
})
