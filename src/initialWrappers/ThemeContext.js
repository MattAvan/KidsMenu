import React from "react";
import { ThemeProvider } from "react-native-elements";
import RecoilWrapper from "./RecoilWrapper";

const theme = {};

export default function ThemeContext() {
  return (
    <ThemeProvider theme={theme}>
      <RecoilWrapper />
    </ThemeProvider>
  );
}
