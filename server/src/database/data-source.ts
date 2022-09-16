import 'reflect-metadata'
import { DataSource } from 'typeorm'
import 'dotenv/config'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import {
  Account,
  Channel,
  Comment,
  CommunityPost,
  Hashtag,
  Like,
  Video,
} from './entity'
import { Subscribe } from './entity/relationship'
import { HashtagsForVideo } from './entity/relationship/hashtag-for-video'

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [
    Account,
    Channel,
    Video,
    CommunityPost,
    Comment,
    Like,
    Hashtag,
    Subscribe,
    HashtagsForVideo,
  ],
  migrations: [],
  subscribers: [],
  namingStrategy: new SnakeNamingStrategy(),
})
