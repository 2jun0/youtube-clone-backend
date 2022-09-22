import { DataSource, DataSourceOptions } from 'typeorm'
import 'dotenv/config'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

process.env.NODE_ENV = process.env.NODE_ENV
  ? process.env.NODE_ENV
  : 'development'

let dataSourceOptions: DataSourceOptions

switch (process.env.NODE_ENV) {
  case 'development':
    dataSourceOptions = {
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        __dirname + '/entities/*.entity.ts',
        __dirname + '/entities/**/*.entity.ts',
      ],
      migrations: [],
      subscribers: [],
      namingStrategy: new SnakeNamingStrategy(),
    }
  case 'test':
    dataSourceOptions = {
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      logging: false,
      dropSchema: true,
      entities: [
        __dirname + '/entities/*.entity.ts',
        __dirname + '/entities/**/*.entity.ts',
      ],
      migrations: [],
      subscribers: [],
      namingStrategy: new SnakeNamingStrategy(),
    }
}

export const AppDataSource = new DataSource(dataSourceOptions)
