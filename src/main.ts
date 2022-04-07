import { text } from 'body-parser'
import { NestFactory } from '@nestjs/core'
import { ServerModule } from './server/server.module'
import { ClientModule } from './client/client.module'

async function bootstrap() {
    const client = await NestFactory.create(ClientModule)
    await client.listen(8000)

    const server = await NestFactory.create(ServerModule, {
        cors: {
            origin: /^https?:\/\/localhost:[0-9]{1,5}$/i,
            credentials: true,
            preflightContinue: false,
        },
        bodyParser: true,
    })
    server.use(text())
    await server.listen(8001)
}
bootstrap()
