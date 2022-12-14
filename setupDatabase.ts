import mongoose from 'mongoose';

export default ()=>{
    function connectToDB(){
        console.log('Trying to connect Mongo Db! ')
        mongoose.connect('mongodb://localhost:27017/chatty-backend')
        .then(()=>{
            console.log('123!')
            console.log('Connected to Mongo database Successfully! ')
        }).catch((error)=>{
            console.log('Error connecting to Mongo database!',error);
            return process.exit(1);
        })
    }
    connectToDB();//Connects to Mongo database
    mongoose.connection.on('disconnected',connectToDB);//retrying after if it disconnects on errors
}