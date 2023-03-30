import {
  View,
  Text,
  Button,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";

export default function Chat() {
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}
    >
      <KeyboardAvoidingView
        enabled={true}
        behavior="padding"
        style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}
      >
        <View className=" px-3 py-1 bg-slate-400/20 rounded-full border-2 border-black w-11/12 my-2 flex flex-row justify-between items-center">
          <Button title="send" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
