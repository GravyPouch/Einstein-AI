import { View, Text, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Linking from "expo-linking";
import SettingsButton from "../components/SettingsButton";

export default function Settings() {
  return (
    <View className=" justify-start items-center flex-1">
      <StatusBar style="dark" />

      <SettingsButton Title={"Website 🌐"} URL={"https://www.google.com"} />

      <SettingsButton Title={"About 📝"} URL={"https://www.google.com"} />

      <SettingsButton
        Title={"Privacy Policy 🕵️"}
        URL={"https://www.google.com"}
      />

      <SettingsButton Title={"Help 💬"} URL={"https://www.google.com"} />

      <SettingsButton Title={"Rate App ⭐️"} URL={"https://www.google.com"} />

      <SettingsButton
        Title={"Reset All Data 🗑️"}
        URL={"https://www.google.com"}
      />
    </View>
  );
}
