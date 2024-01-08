import * as React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";

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

import ModalHeader from "./components/ModalHeader.jsx";

import { appStart } from "./lib/appStart.js";

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFFFFF",
  },
};

export default function App() {
  appStart();
  return (
    <NavigationContainer theme={Theme}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />

        <PageStack.Group
          screenOptions={{
            presentation: "card",
            headerShown: true,
            headerTintColor: "#000000",
          }}
        >
          <Stack.Screen name="Settings" component={Settings} />
        </PageStack.Group>

        <ModalStack.Group
          screenOptions={{
            presentation: "modal",
            headerShown: true,
            header: (props) => <ModalHeader {...props} />,
          }}
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
