import cloudinary,{UploadApiResponse, UploadApiErrorResponse} from  'cloudinary';

//any file-base64 image
export function uploadFile(filename:string,public_id?:string,overwrite?:boolean,invalidate?:boolean) : Promise<UploadApiResponse|UploadApiErrorResponse|undefined>{
  return new Promise((resolve)=>{
    //cloudinary.v2.upload(file,{options},callbackafterupload)
     cloudinary.v2.uploader.upload(filename, {
         public_id,
         overwrite,
         invalidate
     },(error:UploadApiErrorResponse|undefined , result:UploadApiResponse|undefined)=>{
             if(error)  resolve(error);
             resolve(result);
     });
  });
}
