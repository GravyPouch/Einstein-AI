import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screens/Home.jsx";
import Answer from "./screens/Answer.jsx";
import History from "./screens/History.jsx";
import Chat from "./screens/Chat.jsx";
import Purchase from "./screens/Purchase.jsx";
import Settings from "./screens/Settings.jsx";
import Start from "./screens/onboarding/Start.jsx";

const Stack = createNativeStackNavigator();
const ModalStack = createNativeStackNavigator();
const OnboardingStack = createNativeStackNavigator();

import { appStart } from "./lib/appStart.js";

export default function App() {
  appStart();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />

        <Stack.Screen name="Settings" component={Settings} />

        <ModalStack.Group
          screenOptions={{ presentation: "modal", headerShown: true }}
        >
          <Stack.Screen name="Answer" component={Answer} />
          <Stack.Screen name="History" component={History} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Purchase" component={Purchase} />
        </ModalStack.Group>

        <OnboardingStack.Group
          screenOptions={{
            presentation: "transparentModal",
          }}
        >
          <Stack.Screen name="Start" component={Start} />
        </OnboardingStack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
