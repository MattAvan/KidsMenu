import React from "react";
import { ThemeProvider } from "react-native-elements";
import MainRouter from "./MainRouter";

const theme = {
  Button: {
    buttonStyle: { width: 150 },
  },
};

export default function ThemeContext() {
  return (
    <ThemeProvider theme={theme}>
      <MainRouter />
    </ThemeProvider>
  );
}
