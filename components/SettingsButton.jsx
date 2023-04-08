import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Button, Text } from "react-native";
import * as Linking from "expo-linking";

export default function SettingsButton({ Title, Icon, URL }) {
  const openURL = async () => {
    await Linking.openURL(URL);
  };

  return (
    <TouchableOpacity
      onPress={openURL}
      className=" border-2 rounded-xl  bg-white border-black p-2 w-2/3 my-2"
    >
      <Text className=" text-lg text-center"> {Title} </Text>
    </TouchableOpacity>
  );
}
