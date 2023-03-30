// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screens/Home.jsx";
import Answer from "./screens/Answer.jsx";
import History from "./screens/History.jsx";
import Chat from "./screens/Chat.jsx";
import Purchase from "./screens/Purchase.jsx";
import Settings from "./screens/Settings.jsx";

const Stack = createNativeStackNavigator();
const ModalStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />

        <Stack.Screen name="Settings" component={Settings} />

        <ModalStack.Group screenOptions={{ presentation: "transparentModal" }}>
          <Stack.Screen name="Answer" component={Answer} />
          <Stack.Screen name="History" component={History} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Purchase" component={Purchase} />
        </ModalStack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*

import { Stack } from "expo-router";
import { appStart } from "./lib/appStart";

appStart();

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          // Hide the header for all other routes.
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="answer"
        options={{
          presentation: "modal",
          title: "📝 Answer",
        }}
      />
      <Stack.Screen
        name="history"
        options={{
          presentation: "modal",
          title: "🕰️ History",
        }}
      />
      <Stack.Screen
        name="chat"
        options={{
          presentation: "modal",
          title: "💬 Chat",
        }}
      />
      <Stack.Screen
        name="purchase"
        options={{
          presentation: "modal",
          title: "🪙 Tokens",
        }}
      />
    </Stack>
  );
}


*/
