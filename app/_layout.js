import { Stack } from "expo-router";

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
        name="history"
        options={{
          // Set the presentation mode to modal for our modal route.
          presentation: "modal",
          title: "🕰️ History",
        }}
      />
      <Stack.Screen
        name="chat"
        options={{
          // Set the presentation mode to modal for our modal route.
          presentation: "modal",
          title: "💬 Chat",
        }}
      />
    </Stack>
  );
}
