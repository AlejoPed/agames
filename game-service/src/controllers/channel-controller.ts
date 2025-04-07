import Channel from '../models/channel-model'
import { Request, Response } from 'express'

export const GetChannels = async (_req: Request, res: Response): Promise<void> => {
    try {
        const channels = await Channel.find({})
        res.status(200).json({ channels })
    } catch (err) {
        res.status(400).json({ err })
    }
}

export const RegisterChannel = async (req: Request, res: Response): Promise<void> => {
    try {
        const isChannel = await Channel.findOne({ name: req.body.name })
        if (isChannel) {
            res.status(409).json({
                message: 'Channel name already in use'
            })
            return
        }
        const channel = new Channel(req.body)
        const data = await channel.save()
        res.status(201).json({ data })
    } catch (err) {
        res.status(400).json({ err })
    }
}

export const UpdateChannel = async (req: Request, res: Response): Promise<void> => {
    try {
        const isChannel = await Channel.findById(req.body.channelId)
        if (isChannel === null) {
            res.status(404).json({
                message: 'Channel not found'
            })
            return
        }
        const updateData = req.body.updateData
        const channel = await Channel.updateOne({ _id: req.body.channelId }, updateData)
        res.status(200).json({ channel })
    } catch (err) {
        res.status(400).json({ err })
    }
}

export const DeleteChannel = async (req: Request, res: Response): Promise<void> => {
    try {
        const isChannel = await Channel.findById(req.query.channelId)
        if (isChannel === null) {
            res.status(404).json({
                message: 'Channel not found'
            })
            return
        }
        await Channel.deleteOne({ _id: req.query.channelId })
        res.status(200).json({ message: 'Channel deleted' })
    } catch (err) {
        res.status(400).json({ err })
    }
}