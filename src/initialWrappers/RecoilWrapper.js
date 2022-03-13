import React from "react";
import { RecoilRoot } from "recoil";
import QueryWrapper from "./QueryWrapper";

const RecoilWrapper = () => {
  return (
    <RecoilRoot>
      <QueryWrapper />
    </RecoilRoot>
  );
};

export default RecoilWrapper;
