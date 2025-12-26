import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainNavigator from "./MainNavigator";
import AppNavigator from "./AppNavigator";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* User flow */}
      <Stack.Screen name="Main" component={MainNavigator} />

      {/* Admin flow */}
      <Stack.Screen name="Admin" component={AppNavigator} />
    </Stack.Navigator>
  );
}
