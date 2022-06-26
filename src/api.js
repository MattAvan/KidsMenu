import cloudinaryKey from "./cloudkey.json";

export const endPoint = "http://127.0.0.1:8000/";
//export const endPoint = "https://kidsmenubackend.herokuapp.com/";

//export const endPoint = server + "kidsbackend/";
//export const loginEndPoint = endPoint + "dj-rest-auth/";

export const pictureUploadEndPoint = `https://api.cloudinary.com/v1_1/${cloudinaryKey}/image/upload/`;
