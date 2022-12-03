import { ChattyServer } from './../setupServer';
import express = require('express');
import databaseConnection from './../setupDatabase';
class Application {
    public initialize(): void {
     databaseConnection();//database connection
     const app: express.Express = express(); //creates express server
     const server : ChattyServer  = new ChattyServer(app);
     server.start();
    }
}
const application : Application = new Application();
application.initialize();
