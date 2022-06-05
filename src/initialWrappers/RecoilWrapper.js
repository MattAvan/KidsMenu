import React from "react";
import { RecoilRoot } from "recoil";
import ErrorToast from "./ErrorToast";

const RecoilWrapper = () => {
  return (
    <RecoilRoot>
      <ErrorToast />
    </RecoilRoot>
  );
};

export default RecoilWrapper;
