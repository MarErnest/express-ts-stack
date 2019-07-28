import winston, { Logger } from 'winston';
import expressWinston from 'express-winston';
import path from 'path';
import { Handler } from 'express';
import { ErrorRequestHandler } from 'express-serve-static-core';

class MyLogger {

    private logger: Logger;
    private expressWinstonHandler: Handler;
    private expressErrorWinstonHandler: ErrorRequestHandler;

    public getLogger(): Logger {
        if (!this.logger) {
            this.logger = winston.createLogger({
                transports: [
                    new winston.transports.Console({
                        format: winston.format.colorize(),
                    }),
                    // new winston.transports.File({ filename: path.join('logs', 'error.log'), level: 'error' }),
                    // new winston.transports.File({ filename: path.join('logs', 'combined.log') })
                ]
            });
        }
        return this.logger;
    }

    public getExpressLogger(): Handler {
        if (!this.expressWinstonHandler) {
            this.expressWinstonHandler = expressWinston.logger({
                transports: [
                  new winston.transports.Console(),
                  new winston.transports.File({ filename: path.join('logs', 'requests.log')})
                ],
                format: winston.format.combine(
                  winston.format.colorize(),
                  winston.format.json()
                )
            });
        }
        return this.expressWinstonHandler;
    }

    public getExpressErrorLogger(): ErrorRequestHandler {
        if (!this.expressErrorWinstonHandler) {
            this.expressErrorWinstonHandler = expressWinston.errorLogger({
                transports: [
                  new winston.transports.Console({
                    format: winston.format.colorize(),
                  })
                ],
                format: winston.format.combine(
                  winston.format.colorize(),
                  winston.format.json()
                )
            });
        }
        return this.expressErrorWinstonHandler;
    }

}

const instance = new MyLogger();

export const logger = instance.getLogger();

export default instance;