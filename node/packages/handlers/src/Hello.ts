import { Logger } from '@/logger/Logger'

const logger = new Logger('hello')

export const handler = async () => {
    logger.info("hello")
    return 200
}
