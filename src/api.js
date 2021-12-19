import cloudinaryKey from "./cloudkey.json";

//export const endPoint = "http://192.168.1.85:8001/kidsbackend/";
export const endPoint = "https://kidsmenubackend.herokuapp.com/kidsbackend/";
//export const endPoint = "http://127.0.0.1:8000/kidsbackend/";
//export const endPoint = "http://192.168.1.119:8000/kidsbackend/";

export const pictureUploadEndPoint = `https://api.cloudinary.com/v1_1/${cloudinaryKey}/image/upload/`;
