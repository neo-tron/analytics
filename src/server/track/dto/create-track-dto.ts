import {
    IsArray,
    IsDateString,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
} from 'class-validator'
import { ITrack } from '../interfaces/track.interface'

export class CreateTrackDto implements ITrack {
    @IsString()
    @IsNotEmpty()
    event: string

    @IsUrl({ require_tld: false })
    url: string

    @IsString()
    @IsNotEmpty()
    title: string

    @IsDateString()
    ts: Date

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    @IsOptional()
    tags?: string[]
}
