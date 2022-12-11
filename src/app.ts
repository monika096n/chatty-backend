import express = require('express');
import { config } from '@root/config';
import { ChattyServer } from '@root/setupServer';
import databaseConnection from '@root/setupDatabase';
import * as bunyan from 'bunyan';
const logger:bunyan=config.createLogger('App Instance');
class Application {
  public initialize(): void {
    logger.info('Initializing App Instance!');
    this.loadConfig(); //loading all configuration values from env->config->app level use
    databaseConnection(); //database connection
    const app: express.Express = express(); //creates express server-app instance
    const server: ChattyServer = new ChattyServer(app);
    server.start();
  }
  private loadConfig(): void {
    config.validateConfig();//config variables validation
    config.cloudinaryConfig();//cloudinary configuration
  }
}
const application: Application = new Application();
application.initialize();
