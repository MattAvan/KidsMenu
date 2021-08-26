import React from "react";
import ThemeContext from "./src/initialWrappers/ThemeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LogBox } from "react-native";

export default function App() {
  LogBox?.ignoreLogs(["Setting a timer"]);
  return (
    <SafeAreaProvider>
      <ThemeContext />
    </SafeAreaProvider>
  );
}
