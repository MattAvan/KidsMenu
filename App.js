import React from "react";
import ThemeContext from "./src/initialWrappers/ThemeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LogBox } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";

export default function App() {
  LogBox?.ignoreLogs(["Setting a timer"]);
  return (
    <RootSiblingParent>
      <SafeAreaProvider>
        <ThemeContext />
      </SafeAreaProvider>
    </RootSiblingParent>
  );
}
