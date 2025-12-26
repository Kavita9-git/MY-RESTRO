import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

// Screens
import HomeScreen from "../screens/HomeScreen";
import ReserveTable from "../screens/ReserveTable";
import MenuScreen from "../screens/MenuScreen";
import Delivery from "../screens/Delivery";
import HappinessCard from "../screens/HappinessCard";
import Catering from "../screens/Catering";
import AccountScreen from "../screens/AccountScreen";
import AdminLogin from "../screens/AdminLogin";
import AdminPanel from "../screens/AdminPanel";
import SubCategoryScreen from "../screens/SubCategoryScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// ✅ Bottom Tab Navigator for User Flow
function UserTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#E65100",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Reserve") iconName = "restaurant";
          else if (route.name === "Menu") iconName = "fast-food";
          else if (route.name === "Delivery") iconName = "bicycle";
          else if (route.name === "Happiness") iconName = "gift";
          else if (route.name === "Catering") iconName = "briefcase";
          else if (route.name === "Account") iconName = "person";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
      <Tab.Screen name="Reserve" component={ReserveTable} />
      <Tab.Screen name="Happiness" component={HappinessCard} />
      <Tab.Screen name="Catering" component={Catering} />
      <Tab.Screen name="Delivery" component={Delivery} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

// ✅ Stack Navigator for Admin + Tabs
export default function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#E65100" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      {/* User Tabs (Main App) */}
      <Stack.Screen
        name="UserTabs"
        component={UserTabs}
        options={{ headerShown: false }}
      />

      {/* Admin Flow */}
      <Stack.Screen
        name="AdminLogin"
        component={AdminLogin}
        options={{ title: "Admin Login" }}
      />
      <Stack.Screen
        name="AdminPanel"
        component={AdminPanel}
        options={{ title: "Admin Panel" }}
      />

<Stack.Screen
  name="SubCategoryScreen"
  component={SubCategoryScreen}
  options={{ title: "Categories" }}
/>


    </Stack.Navigator>
  );
}
