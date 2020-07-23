import axios from 'axios';
import { IResponseUploadedPhoto } from '../interfaces/responses/image-upload/response-uploaded-photo';

export class ImageUploadService {
    public uploadImage(imageFile:File):Promise<IResponseUploadedPhoto>{
        var bodyFormData:FormData = new FormData();
        bodyFormData.append('image', imageFile);
        return axios.post(`${process.env.REACT_APP_SERVER_URL}/home/imageUpload`,bodyFormData,{headers: {'Content-Type': 'multipart/form-data' }});
    } 
}