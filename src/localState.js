import { atom } from "recoil";

export const isLoggedInState = atom({
  key: "isLoggedInState",
  default: false,
});

export const tokenState = atom({
  key: "tokenState",
  default: "",
});
