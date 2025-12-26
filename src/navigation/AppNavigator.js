import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AdminLogin from "../screens/AdminLogin";
import AdminPanel from "../screens/AdminPanel";
import MenuScreen from "../screens/MenuScreen";
import ReserveTable from "../screens/ReserveTable";
import Catering from "../screens/Catering";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminLogin" component={AdminLogin} />
      <Stack.Screen name="AdminPanel" component={AdminPanel} />
      <Stack.Screen name="MenuScreen" component={MenuScreen} />
      <Stack.Screen name="ReserveTable" component={ReserveTable} />
      <Stack.Screen name="Catering" component={Catering} />
    </Stack.Navigator>
  );
}
