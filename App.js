import React from "react";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";   // 👉 USE THIS

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />   {/* ❗ NOT AppNavigator */}
      </NavigationContainer>
    </Provider>
  );
}
