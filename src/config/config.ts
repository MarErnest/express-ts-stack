import dotenv from 'dotenv';

// Load env
const envVars = dotenv.config();
if (envVars.error) {
    throw envVars.error;
}

export default  {
    // App
    'app': {
        port: +process.env.PORT,
        env: process.env.ENV,
        jwt: process.env.JWT_SECRET
    },

    // Rate Limiter
    'rateLimiter': {
        pointsConsume:         +process.env.POINTS_TO_CONSUMER,    // Points per request
        maxPointsToConsume:    +process.env.MAX_POINTS_TO_CONSUME, // Max points per ip address
        blockageDurationInSec: +process.env.BLOCKAGE_IN_SECONDS    // Request to count in seconds
    }
};