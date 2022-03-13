import cloudinaryKey from "./cloudkey.json";

export const server = "http://127.0.0.1:8000/";
//export const server = "https://kidsmenubackend.herokuapp.com"
export const endPoint = server + "kidsbackend/";
export const loginEndPoint = server + "dj-rest-auth/";

export const pictureUploadEndPoint = `https://api.cloudinary.com/v1_1/${cloudinaryKey}/image/upload/`;
