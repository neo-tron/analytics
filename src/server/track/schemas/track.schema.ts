import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ITrack } from '../interfaces/track.interface'

export type TrackDocument = Track & Document

@Schema()
export class Track implements ITrack {
    @Prop({ type: String, required: true })
    event: string

    @Prop({ type: String, required: true })
    url: string

    @Prop({ type: String, required: true })
    title: string

    @Prop({ type: Date, required: true })
    ts: Date

    @Prop({ type: [String] })
    tags?: string[]
}

export const TrackSchema = SchemaFactory.createForClass(Track)
