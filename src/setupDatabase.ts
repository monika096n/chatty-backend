import mongoose from 'mongoose';
import { config } from '@root/config';
import * as bunyanLogger  from 'bunyan';
const logger : bunyanLogger =config.createLogger('setupDatabase');//log statement

export default ()=>{
    function connectToDB(){
        logger.info('Trying to connect Mongo Db! ');
        mongoose.connect(`${config.DATABASE_URL}`)
        .then(()=>{
            logger.info('123!');
            logger.info('Connected to Mongo database Successfully! ');
        }).catch((error)=>{
            logger.error('Error connecting to Mongo database!',error);
            return process.exit(1);
        });
    }
    connectToDB();//Connects to Mongo database
    mongoose.connection.on('disconnected',connectToDB);//retrying after if it disconnects on errors
};
