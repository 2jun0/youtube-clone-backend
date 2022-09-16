import { AppDataSource } from '../database/data-source'
import { Channel } from '../database/entity'
import { Subscribe } from '../database/entity/relationship'
import { middleware } from '../shared/middleware'

const channelRepository = AppDataSource.getRepository(Channel)
const subscribeRepository = AppDataSource.getRepository(Subscribe)

export const createChannel: middleware = async (req, res, next) => {
  try {
    const channel = channelRepository.create(req.body)
    const savedChannel = await channelRepository.save(channel)
    return res.send(savedChannel)
  } catch (err) {
    console.error(err)
  }
}

export const updateChannel: middleware = async (req, res, next) => {
  try {
    const channelId = req.params.channelId as unknown as number
    await channelRepository.update(channelId, req.body)
  } catch (err) {
    console.error(err)
  }
}

export const deleteChannel: middleware = async (req, res, next) => {
  try {
    const channelId = req.params.channelId as unknown as number
    await channelRepository.delete(channelId)
  } catch (err) {
    console.error(err)
  }
}

export const getChannel: middleware = async (req, res, next) => {
  try {
    const channelId = req.params.channelId as unknown as number
    const channel = await channelRepository.findOneBy({ id: channelId })
    return res.send(channel)
  } catch (err) {
    console.error(err)
  }
}

export const subscribe: middleware = async (req, res, next) => {
  try {
    const { channelId, subscribingId } = req.params as unknown as {
      channelId: number
      subscribingId: number
    }

    const subscribe = new Subscribe()
    subscribe.subscriberId = channelId
    subscribe.subscribingId = subscribingId
    await subscribeRepository.save(subscribe)
  } catch (err) {
    console.error(err)
  }
}

export const getSubscribeCount: middleware = async (req, res, next) => {
  try {
    const chnnelId = req.params.channelId as undefined as number
    const count = await subscribeRepository.countBy({ subscribingId: chnnelId })
    return res.send({ count })
  } catch (err) {
    console.error(err)
  }
}

export const unsubscribe: middleware = async (req, res, next) => {
  try {
    const { channelId, subscribedId } = req.params as unknown as {
      channelId: number
      subscribedId: number
    }

    await subscribeRepository.delete({
      subscriberId: channelId,
      subscribingId: subscribedId,
    })
  } catch (err) {
    console.error(err)
  }
}
