import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Purchase() {
  return (
    <View className=" flex-1 justify-between items-center p-10">
      <View className=" border-2 border-yellow-600/80 rounded-lg p-4">
        <Text className=" text-3xl font-bold text-center">Premium</Text>
        <Text className=" text-xl font-bold">Get the most out of Einstein</Text>
        <Text className=" text-xl font-bold">No ADS</Text>
        <Text className=" text-xl font-bold">No Wait</Text>
        <Text className=" text-xl font-bold">No Limits</Text>
      </View>
      <TouchableOpacity className="w-full bg-yellow-600/80 p-5 rounded-full ">
        <Text className="text-white text-center font-bold">Join Premium</Text>
      </TouchableOpacity>
    </View>
  );
}
