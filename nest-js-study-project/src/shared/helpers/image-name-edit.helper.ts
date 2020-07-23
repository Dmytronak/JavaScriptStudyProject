import { extname } from "path";
import { v4 as uuid } from 'uuid';

export const imageNameEditHelper =(req, file, callback)=>{
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    callback(null, `${name}-${uuid()}${fileExtName}`);
}