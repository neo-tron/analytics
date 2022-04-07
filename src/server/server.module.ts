import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TrackModule } from './track/track.module'
import { MongooseModule } from '@nestjs/mongoose'
import { getMongoConfig } from './configs/mongo.config'

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getMongoConfig,
        }),
        TrackModule,
    ],
    controllers: [],
    providers: [],
})
export class ServerModule {}
