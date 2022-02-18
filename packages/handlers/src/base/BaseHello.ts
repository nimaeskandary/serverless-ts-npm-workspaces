import { Logger } from '@/logger/Logger'
import { BaseHandlerContext, BaseHandlerEvent, BaseHandlerResult } from '@/handlers/types'

const logger = new Logger('hello')

export const baseHelloHandler = async (event: BaseHandlerEvent, context: BaseHandlerContext): Promise<BaseHandlerResult> => {
    logger.info("hello")
    return {
        statusCode: 200
    }
}
