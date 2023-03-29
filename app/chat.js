import { View, Text, Button, TextInput, SafeAreaView } from "react-native";
import { useState } from "react";
import { Link, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Modal() {
  const navigation = useNavigation();
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const isPresented = navigation.canGoBack();

  const [text, onChangeText] = useState("Whats your problem?");

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}
    >
      {!isPresented && <Link href="../">Dismiss</Link>}

      <View className=" px-3 py-1 bg-slate-400/20 rounded-full border-2 border-black w-11/12 my-2 flex flex-row justify-between items-center">
        <TextInput value={text} onChangeText={onChangeText} />
        <Button title="send" />
      </View>
    </SafeAreaView>
  );
}
