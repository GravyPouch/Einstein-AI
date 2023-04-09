import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screens/Home.jsx";
import Answer from "./screens/Answer.jsx";
import History from "./screens/History.jsx";
import Chat from "./screens/Chat.jsx";
import Premium from "./screens/Premium.jsx";
import Settings from "./screens/Settings.jsx";
import Start from "./screens/onboarding/Start.jsx";
import Offline from "./screens/alerts/Offline.jsx";

const Stack = createNativeStackNavigator();
const ModalStack = createNativeStackNavigator();
const PageStack = createNativeStackNavigator();
const OnboardingStack = createNativeStackNavigator();
const AlertStack = createNativeStackNavigator();

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

        <PageStack.Group
          screenOptions={{ presentation: "card", headerShown: true }}
        >
          <Stack.Screen name="Settings" component={Settings} />
        </PageStack.Group>

        <ModalStack.Group
          screenOptions={{ presentation: "modal", headerShown: true }}
        >
          <Stack.Screen name="Answer" component={Answer} />
          <Stack.Screen name="History" component={History} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Premium" component={Premium} />
        </ModalStack.Group>

        <AlertStack.Group
          screenOptions={{
            presentation: "transparentModal",
          }}
        >
          <Stack.Screen name="Offline" component={Offline} />
        </AlertStack.Group>

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
