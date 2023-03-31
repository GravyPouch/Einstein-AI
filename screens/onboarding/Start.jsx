import {
  View,
  Text,
  Button,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";

export default function Start({ navigation }) {
  return (
    <View className=" bg-white rounded-xl p-10 mx-auto">
      <Text>Welcome to Einstien!</Text>
      <Text>Your go to problem Solver!</Text>
      <Button title="Get Started" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}
