import { RateLimiterMemory   } from 'rate-limiter-flexible';
import { Request, Response, NextFunction } from 'express';
import { logger } from './MyLogger';
import config from '../../config/config';

const pointsConsume = config.rateLimiter.pointsConsume;
const maxPointsToConsume = config.rateLimiter.maxPointsToConsume;
const blockageDurationInSec = config.rateLimiter.blockageDurationInSec;

const rateLimiter = new RateLimiterMemory({
    points: maxPointsToConsume,
    duration: blockageDurationInSec,
});

const rateLimiterMiddleware = (request: Request, res: Response, next: NextFunction) => {
    rateLimiter.consume(request.ip, pointsConsume)
        .then(() => next())
        .catch((error) => {
            logger.error(`${request.ip} reach max request limit.`);
            res.status(429).send('Too Many Requests');
        });
};

export default rateLimiterMiddleware;