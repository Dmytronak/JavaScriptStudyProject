import { SharedConstants } from "../constants/shared.constants";
import { HttpException } from "@nestjs/common";

export const imageTypeFilterHelper = (req, file, callback)=>{
    if (!file.originalname.match(SharedConstants.REGEX_FOR_IMAGE_FILTER)) {
        return callback(new HttpException({error:SharedConstants.ERROR_ONLY_IMAGE_ALLOWED},403), false);
      }
      callback(null, true);
};