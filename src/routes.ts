import { Application } from 'express';
import * as bunyan from 'bunyan';
import {config} from '@root/config';
const logger: bunyan=config.createLogger('Routes Middleware File');
export default (app : Application)=>{
    logger.info('Routes Handler Invoked Successfully!!!');
    const routes=()=>{
    //app.use('/api/v1',auth)
    //throw new Error('Test Error!');
    };
    routes();
};
