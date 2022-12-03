import { config } from './../config';
import { ChattyServer } from './../setupServer';
import express = require('express');
import databaseConnection from './../setupDatabase';
class Application {
    public initialize(): void {
     this.loadConfig();//loading all configuration values from env->config->app level use
     databaseConnection();//database connection
     const app: express.Express = express(); //creates express server
     const server : ChattyServer  = new ChattyServer(app);
     server.start();     
    }
    private loadConfig():void{
        config.validateConfig();
     }
}
const application : Application = new Application();
application.initialize();
