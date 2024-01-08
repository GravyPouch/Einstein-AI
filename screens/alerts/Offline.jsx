import {
  View,
  Text,
  Button,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";

import { pingServer } from "../../lib/api.js";

export default function Start({ navigation }) {
  const [loading, setLoading] = useState(false);

  checkOnline = async () => {
    setLoading(true);
    var online = await pingServer();
    if (online) navigation.navigate("Home");
    console.log("isOnline? " + online);
    setLoading(false);
  };
  return (
    <View
      className=" bg-white rounded-xl p-10 px-16 mx-auto my-auto space-y-4"
      style={{
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        marginHorizontal: "auto",
        marginVertical: "auto",
      }}
    >
      <Text className=" text-3xl text-center font-bold">Uh Oh!</Text>
      <Text className=" text-center">You are Offline.</Text>
      {loading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <TouchableOpacity
          className=" bg-black rounded-full p-3 "
          onPress={checkOnline}
        >
          <Text className=" text-center text-white">Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
