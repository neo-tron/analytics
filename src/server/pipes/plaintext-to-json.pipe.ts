import { Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class PlaintextToJsonPipe implements PipeTransform {
    transform(value: unknown) {
        if (typeof value === 'string') {
            try {
                return JSON.parse(value)
            } catch {
                return value
            }
        }
        return value
    }
}
