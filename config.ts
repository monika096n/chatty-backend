import dotenv from 'dotenv';
//import dotenv and reassign it in config file , to use it!
dotenv.config({}) //make sure dotenv file in root directory

class Config{
  public DATABASE_URL : string  | undefined; 
  public JWT_TOKEN : string  | undefined; 
  public NODE_ENV : string  | undefined; 
  public PORT : string | undefined;
  public SECRET_KEY_1 : string  | undefined; 
  public SECRET_KEY_2 : string  | undefined; 
  public CLIENT_URL : string  | undefined; 
  public REDIS_HOST : string  | undefined;
  private readonly DEFAULT_DB_URL : string ='mongodb://localhost:27017/chatty-backend'
  constructor(){
    this.DATABASE_URL=process.env.DATABASE_URL || this.DEFAULT_DB_URL;
    this.SECRET_KEY_1=process.env.SECRET_KEY_1 || '';
    this.SECRET_KEY_2=process.env.SECRET_KEY_2 || '';
    this.CLIENT_URL=process.env.CLIENT_URL||'';
    this.JWT_TOKEN=process.env.JWT_TOKEN||'';
    this.NODE_ENV=process.env.NODE_ENV||'development';
    this.PORT=process.env.PORT|| '5000';
    this.REDIS_HOST=process.env.REDIS_HOST||'';

  }

  public validateConfig(): void {
     for(const [key,value] of Object.keys(this)){
        if(value===undefined||value===null||value===''){
             throw new Error(`Invalid configuration for ${key}`);
        }

     }
  }
}

export const config:Config = new Config(); //created instance of class and exported