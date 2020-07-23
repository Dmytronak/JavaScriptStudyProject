import { UseInterceptors, UploadedFile, Controller, Post, Get, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageTypeFilterHelper } from 'src/shared/helpers/image-type-filter.helper';
import { imageNameEditHelper } from 'src/shared/helpers/image-name-edit.helper';
import { diskStorage } from 'multer';
import { ResponseUploadedPhoto } from 'src/shared/view-models/home/response-uploaded-photo';

@Controller('home')
export class HomeController {
  constructor() { }
  @Post('/imageUpload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files/images',
        filename: imageNameEditHelper,
      }),
      fileFilter: imageTypeFilterHelper,
    }),
  )
  uploadImage(@UploadedFile() file): ResponseUploadedPhoto {
    const response: ResponseUploadedPhoto = {
      imageName: file.filename
    };
    return response;
  };

  @Get('/getUploadedImage/:imgName')
  getUploadedImage(@Param('imgName') image, @Res() res) {
    return res.sendFile(image, { root: './files/images' });
  }
}
