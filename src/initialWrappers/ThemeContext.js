import React from "react";
import { ThemeProvider } from "react-native-elements";
import QueryWrapper from "./QueryWrapper";

const theme = {};

export default function ThemeContext() {
  return (
    <ThemeProvider theme={theme}>
      <QueryWrapper />
    </ThemeProvider>
  );
}
