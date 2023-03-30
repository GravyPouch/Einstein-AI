import { View, Text, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Settings() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <StatusBar style="dark" />
      <Button
        title="About"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button
        title="Privacy Policy"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button
        title="Reset All Data"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}
