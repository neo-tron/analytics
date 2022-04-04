import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Track, TrackDocument } from './schemas/track.schema'
import { CreateTrackDto } from './dto/create-track-dto'

@Injectable()
export class TrackService {
    constructor(
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>
    ) {}

    createMany(createTrackDto: CreateTrackDto[]) {
        return this.trackModel.insertMany(createTrackDto, {
            ordered: false,
        })
    }
}
