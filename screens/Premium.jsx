import { View, Text, TouchableOpacity } from "react-native";

export default function Purchase() {
  return (
    <View className=" flex-1 justify-between items-center p-10">
      <View className=" border-2 border-black rounded-lg p-4">
        <Text className=" text-3xl font-bold">Premium</Text>
        <Text className=" text-xl font-bold">
          Get the most out of Math Solver
        </Text>
        <Text className=" text-xl font-bold">No ADS</Text>
        <Text className=" text-xl font-bold">No Wait</Text>
        <Text className=" text-xl font-bold">No Limits</Text>
      </View>
      <TouchableOpacity className="w-full bg-black p-5 rounded-full ">
        <Text className="text-white text-center font-bold">Join Premium</Text>
      </TouchableOpacity>
    </View>
  );
}
