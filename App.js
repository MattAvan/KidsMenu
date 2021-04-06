import React from "react";
import { RecoilRoot } from "recoil";
import Main from "./src/components/Main";

export default function App() {
  return (
    <RecoilRoot>
      <Main />
    </RecoilRoot>
  );
}
