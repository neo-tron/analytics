import { Controller, Get } from '@nestjs/common'
import { ServerService } from './server.service'

@Controller()
export class ServerController {
    constructor(private readonly appService: ServerService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello()
    }
}
