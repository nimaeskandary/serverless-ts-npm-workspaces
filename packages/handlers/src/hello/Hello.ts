import { Logger } from '@/logger/Logger'
import { BaseHandlerContext, BaseHandlerEvent, BaseHandlerResult } from '@/handler-converters/BaseHandler'

const logger = new Logger('hello')

export const helloHandler = async (event: BaseHandlerEvent, context: BaseHandlerContext): Promise<BaseHandlerResult> => {
    logger.info("helloHandler")
    
    return {
        statusCode: 200
    }
}
