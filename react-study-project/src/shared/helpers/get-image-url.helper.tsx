import { AuthConstants } from "../constants/auth.constant"

export const GetImageUrlHelper = (imageName:string) => {
    return `${process.env.REACT_APP_SERVER_URL}${AuthConstants.GET_IMAGE_URL}${imageName}`;
}