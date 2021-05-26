import React from "react";
import ThemeContext from "./src/initialWrappers/ThemeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeContext />
    </SafeAreaProvider>
  );
}
