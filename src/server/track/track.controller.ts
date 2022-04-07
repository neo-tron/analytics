import { join } from 'path'
import {
    Body,
    Controller,
    Get,
    HttpCode,
    ParseArrayPipe,
    Post,
    Res,
} from '@nestjs/common'
import { CreateTrackDto } from './dto/create-track-dto'
import { TrackService } from './track.service'
import { PlaintextToJsonPipe } from '../pipes/plaintext-to-json.pipe'

@Controller()
export class TrackController {
    constructor(private readonly trackService: TrackService) {}

    @Get()
    getScript(@Res() res) {
        const scriptPath = join(__dirname, 'script', 'track.js')
        return res.sendFile(scriptPath)
    }

    @Post('/track')
    @HttpCode(200)
    createTracks(
        @Body(
            new PlaintextToJsonPipe(),
            new ParseArrayPipe({ items: CreateTrackDto, whitelist: true })
        )
        createTrackDto: CreateTrackDto[]
    ) {
        this.trackService.createMany(createTrackDto)
    }
}
