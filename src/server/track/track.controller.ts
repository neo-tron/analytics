import {
    Body,
    Controller,
    Get,
    HttpCode,
    ParseArrayPipe,
    Post,
} from '@nestjs/common'
import { CreateTrackDto } from './dto/create-track-dto'
import { TrackService } from './track.service'

@Controller()
export class TrackController {
    constructor(private readonly trackService: TrackService) {}

    @Get()
    getScript() {
        return 'script'
    }

    @Post('/track')
    @HttpCode(200)
    createTracks(
        @Body(new ParseArrayPipe({ items: CreateTrackDto }))
        createTrackDto: CreateTrackDto[]
    ) {
        this.trackService.createMany(createTrackDto)
    }
}
