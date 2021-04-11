import React from "react";
import { RecoilRoot } from "recoil";
import MainRouter from "./src/components/MainRouter";

export default function App() {
  return (
    <RecoilRoot>
      <MainRouter />
    </RecoilRoot>
  );
}
