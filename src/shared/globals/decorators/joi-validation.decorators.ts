import { ObjectSchema } from 'joi';
import { JoiRequestValidationError } from './../helpers/errorHandler';
import {Request} from 'express';

//decorator factory function --> which takes a function in the format and return new modified function --> HOF
//function declaration type
type IJoiDecorator = (target:any,key:string,descriptor:PropertyDescriptor)=>void;  //type of method which takes 3 params , method return type of void

export function JoiValidation(schema:ObjectSchema):IJoiDecorator {
   //return a IJoiDecorator function
   return (_target:any,_key:string,descriptor:PropertyDescriptor)=>{
          const originalMethod=descriptor.value; //describes any property , here we can pass controller method
          descriptor.value=async function(...args:any[]){
            //req,res,next
            const req:Request = args[0];//request
            const {error}=await Promise.resolve(schema.validate(req.body));//req.body Joi validation happens, we can validate req.params also!
            if(error?.details){
               throw new JoiRequestValidationError(error?.details?.[0]?.message); //error.details-->From Joi library
            }
            return originalMethod.apply(this, args);

          };
          return descriptor;
   }
}
