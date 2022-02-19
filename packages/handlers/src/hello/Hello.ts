import { Logger } from '@serverless-ts-npm-workspaces/logger/Logger'
import { BaseHandlerContext, BaseHandlerEvent, BaseHandlerResult } from '@serverless-ts-npm-workspaces/handler-converters/BaseHandler'

const logger = new Logger('hello')

export const helloHandler = async (event: BaseHandlerEvent, context: BaseHandlerContext): Promise<BaseHandlerResult> => {
    logger.info("helloHandler")

    return {
        statusCode: 200
    }
}
