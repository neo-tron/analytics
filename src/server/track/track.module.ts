import { Module } from '@nestjs/common'
import { TrackController } from './track.controller'
import { TrackService } from './track.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Track, TrackSchema } from './schemas/track.schema'

@Module({
    controllers: [TrackController],
    imports: [
        MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
    ],
    providers: [TrackService],
})
export class TrackModule {}
