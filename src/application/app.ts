import express, { Application } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import config from '../config/config';
import V1 from './controllers/v1/v1';

// Logger
import MyLogger, { logger } from './middlewares/MyLogger';

// Rate Limiter
import MyRateLimiter from './middlewares/MyRateLimiter';

class App {

    public instance: Application;

    constructor() {
        this.instance = express();
        this.instance.set('PORT', config.app.port);
        this.instance.use(express.json());
        this.registerBeforeMiddlewares();
        this.registerRoutes();
        this.registerAfterMiddlewares();
    }

    private registerBeforeMiddlewares() {

        // Body Parser
        this.instance.use(bodyParser.json({ limit: '5mb' }));
        this.instance.use(bodyParser.urlencoded({ limit: '5mb' }));

        // Helmet
        this.instance.use(helmet());

        // Enable CORS
        this.instance.use(cors());

        // Winston
        this.instance.use(MyLogger.getExpressLogger());

        // Rate Limiter
        this.instance.use(MyRateLimiter);

    }

    private registerAfterMiddlewares() {
        // Error Logger
        this.instance.use(MyLogger.getExpressErrorLogger());
    }

    private registerRoutes() {
        const apiV1 = new V1();
        this.instance.use(apiV1.router);
    }

}

export default App;