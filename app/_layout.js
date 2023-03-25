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
