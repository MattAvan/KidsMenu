import React from "react";
import { useRecoilState } from "recoil";
import { errorState } from "../localState";
import Toast from "react-native-root-toast";
import QueryWrapper from "./QueryWrapper";

let errorMessages = {
  unknownError: "Something went wrong, please try again",
  wrongCredentialsError: "This login/password combination is not correct",
};

const ErrorToast = () => {
  const [error, setError] = useRecoilState(errorState);
  console.log(error);
  console.log(errorMessages[error]);
  if (error) {
    let toast = Toast.show(errorMessages[error], {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
      shadow: true,
      backgroundColor: "red",
      hideOnPress: true,
      onHidden: () => {
        setError(null);
      },
    });
    //let toast = Toast.show("toto", { duration: 3500 });
    console.log(toast);
  }
  return <QueryWrapper />;
};

export default ErrorToast;
