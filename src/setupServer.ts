/* eslint-disable quotes */
import {Application,json,urlencoded,Response,Request,NextFunction} from 'express';
import { config } from './config';
import * as http from 'http';
import  cookieSession from 'cookie-session';
import   helmet from 'helmet';
import  hpp from 'hpp';
import cors from 'cors';
import compression from 'compression';
import { Server } from 'socket.io'; //socket.io.Server connection
import { createClient } from 'redis'; //redis for fetching instant chats
import { createAdapter } from '@socket.io/redis-adapter';
//redis adapter connection for direct communication between chats and redis
import applicationRoutes from './routes';
import * as HTTP_STATUS_CODE from 'http-status-codes';
import {CustomError,IErrorResponse} from '@globals/helpers/errorHandler';
import * as bunyanLogger  from 'bunyan';
const log:bunyanLogger=config.createLogger('setupServer');//log statement

const SERVER_PORT=config.PORT;
export class ChattyServer{
     //method variable:returnType;
     private app : Application;

     constructor(app : Application){
        this.app=app;
     }

     public start() : void {
        this.securityMiddleware(this.app);
        this.standardMiddleware(this.app);
        this.routesMiddleware(this.app);
        this.globalErrorHandler(this.app);
        this.startServer(this.app);
     }

     //method function_variable:returnType;
     private securityMiddleware(app:Application):void {
          app.use(cookieSession({
            name:'session' ,//cookie session name(store user data in browser cookies)
            keys: [config.SECRET_KEY_1!,config.SECRET_KEY_2!],
            maxAge:24*7*3600000, //expiry time in milliseconds(604800000 ms = 7 days)
            secure:config.NODE_ENV!=='development' //https
          }));
          app.use(helmet());//add more headers and hide sensitive information
          app.use(hpp());//prevent same query names
          app.use(cors({
            origin:"*",
            credentials:true,
            methods:['GET', 'PUT','POST','DELETE','OPTIONS'],
            optionsSuccessStatus: 200,// for some legacy browsers (IE11, various SmartTVs)
          }));
     }

     private standardMiddleware(app : Application):void {
            app.use(compression());
            app.use(json({limit:'50mb'}));
            app.use(urlencoded({extended:true , limit:'50mb'}));
     }

     private routesMiddleware(app : Application):void {
         applicationRoutes(app);
     }


     private globalErrorHandler(app : Application):void {
           //if any error found in any type of api
           app.all('*',(req:Request, res:Response) => {
             res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ message: `${req.originalUrl} not found` });
           });
           app.use((error: IErrorResponse, req: Request, res: Response, next: NextFunction) => { //application level error Handler-> invokes when throw Error()
            log.error(error);
            if (error instanceof CustomError) {
              return res.status(error.statusCode).json(error.serializeErrors());//frontend handling purpose!
              next();
            }
          });
     }

     private async createSocketIO(httpServer : http.Server): Promise<Server> {
      const io:Server = new Server(httpServer,{
         cors:{
            origin:config.CLIENT_URL,
            methods:['GET', 'PUT','POST','DELETE','OPTIONS'],
         }
      });//server from socket.io

      const pubClient = createClient({  url: config.REDIS_HOST });//publish socket connection and redis connection establishment this port
      const subClient = pubClient.duplicate();//Duplicate same connection for subscribing incoming chats

      await Promise.all([pubClient.connect(), subClient.connect()]);
      io.adapter(createAdapter(pubClient, subClient));
      log.info("Created IO!");
      return io;
     }

    private async startServer(app : Application) : Promise<void>{
        try{
              const httpServer : http.Server = new http.Server(app);
              const socketIO:Server = await this.createSocketIO(httpServer);
              this.startHttpServer(httpServer);
              this.SocketIOConnections(socketIO);
        }
        catch(error){
              log.error(error);
        }

    }
     private startHttpServer(httpServer : http.Server) : void{
        log.info('httpServer started with pid at:  ',process.pid);
        httpServer.listen(SERVER_PORT,()=>{
            log.info('server listening on port at',SERVER_PORT);
         });
     }

     private SocketIOConnections(io:Server):void {
      log.info('All SocketIOConnections!');
     }

}
























//hpp -> move same name query to queryPolluted  as arrays
// GET /search?firstname=John&firstname=Alice&lastname=Doe
// =>
// req: {
//     query: {
//         firstname: 'Alice',
//         lastname: 'Doe',
//     },
//     queryPolluted: {
//         firstname: [ 'John', 'Alice' ]
//     }
// }

