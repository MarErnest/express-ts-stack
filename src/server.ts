import 'reflect-metadata';
import app from './application/app';
import { Server } from 'http';
import { logger } from './application/middlewares/MyLogger';
import config from './config/config';
import Database from './data/Database';

(async () => {
  let server: Server = null;
  try {
    // Connect Database
    await Database.getConnection();

    // Start Server
    const App = new app().instance;
    const PORT = App.get('PORT');
    server = App.listen(PORT, () => logger.info(`[${config.app.env}] SERVER UP IN ${PORT}`));

    // Catch Errors
    process.on('SIGTERM', () => {
      logger.error('SIGTERM ERROR', new Date().toString());
      if (server) { 
        server.close(async () => {
        await Database.disconnect();
        process.exit(0);
      });
      }
    });
  } catch (err) {
    Database.disconnect();
    logger.error('SERVER ERROR', new Date().toString());
    throw new Error(err);
  }
})();