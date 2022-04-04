import {
    IsArray,
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

    @IsUrl()
    url: string

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    ts: Date

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    @IsOptional()
    tags?: string[]
}
