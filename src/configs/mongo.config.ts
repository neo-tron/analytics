import { ConfigService } from '@nestjs/config'
import { MongooseModuleOptions } from '@nestjs/mongoose/dist/interfaces/mongoose-options.interface'

export function getMongoConfig(
    configService: ConfigService
): MongooseModuleOptions {
    return {
        uri: getMongoString(configService),
    }
}

function getMongoString(configService: ConfigService) {
    return (
        'mongodb://' +
        configService.get('MONGO_HOST') +
        ':' +
        configService.get('MONGO_PORT') +
        '/' +
        configService.get('MONGO_AUTHDATABASE')
    )
}
