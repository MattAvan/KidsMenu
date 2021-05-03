import React from "react";
import { RecoilRoot } from "recoil";
import ThemeContext from "./src/initialWrappers/ThemeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <RecoilRoot>
        <ThemeContext />
      </RecoilRoot>
    </SafeAreaProvider>
  );
}
