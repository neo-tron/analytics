import { Controller, Get, Res } from '@nestjs/common'
import { join } from 'path'

@Controller()
export class ClientController {
    @Get(['/', '1.html', '2.html'])
    getDemoPage(@Res() res) {
        const demoPagePath = join(__dirname, 'pages', 'demo-page.html')
        return res.sendFile(demoPagePath)
    }
}
