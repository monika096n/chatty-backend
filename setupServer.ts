import {Application,json,urlencoded,Response,Request,NextFunction} from 'express';
import { config } from './../config';
import * as http from 'http';
import * as cookieSession from 'cookie-session';
import * as helmet from 'helmet';
import * as hpp from 'hpp';
import * as cors from 'cors';
import * as compression from 'compression';
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
            keys: [config.SECRET_KEY_1,config.SECRET_KEY_2],
            maxAge:24*7*3600000, //expiry time in milliseconds(604800000 ms = 7 days)
            secure:config.NODE_ENV!=='development'
          }));
          app.use(helmet());//add more headers and hide sensitive information
          app.use(hpp());//prevent same query names 
          app.use(cors({
            origin:"*",
            credentials:true,
            optionsSuccessStatus: 200,// for some legacy browsers (IE11, various SmartTVs) 
          }))
     }

     private standardMiddleware(app : Application):void {
            app.use(compression());
            app.use(json({limit:'50mb'}));
            app.use(urlencoded({extended:true , limit:'50mb'}));
     }

     private routesMiddleware(app : Application):void {

     }


     private globalErrorHandler(app : Application):void {

     }

     private createSocketIO(httpServer : http.Server):void {

     }
    private async startServer(app : Application) : Promise<void>{
        try{
              const httpServer : http.Server = new http.Server(app);
              this.startHttpServer(httpServer)
        }
        catch(error){
             console.log(error);
             throw new Error(error);
        }

    }
     private startHttpServer(httpServer : http.Server) : void{
        httpServer.listen(SERVER_PORT,()=>{
            console.log('server listening on port ',SERVER_PORT); 
         })
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