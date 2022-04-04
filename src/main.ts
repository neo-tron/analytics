import { NestFactory } from '@nestjs/core'
import { ServerModule } from './server/server.module'
import { ClientModule } from './client/client.module'

async function bootstrap() {
    const client = await NestFactory.create(ClientModule)
    await client.listen(8000)

    const server = await NestFactory.create(ServerModule)
    await server.listen(8001)
}
bootstrap()
