import winston from 'winston'

const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
        new winston.transports.Console()
    ]
});

export class Logger {
    readonly loggerName: string
    readonly childLogger: winston.Logger

    constructor(loggerName: string) {
        this.loggerName = loggerName
        this.childLogger = logger.child({
            loggerName: this.loggerName
        })
    }

    public info(message: string) {
        this.childLogger.info(message)
    }
}
