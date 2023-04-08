import { View, Image, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { writeProblem } from "../lib/problem";
import * as FileSystem from "expo-file-system";
import { postImageToAPI } from "../lib/api";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Answer({ route }) {
  const { image, type } = route.params;

  console.log(image, type);

  const imgDir = FileSystem.documentDirectory + "images/" + image;

  console.log(imgDir);

  const styles = StyleSheet.create({
    stretch: {
      resizeMode: "contain",
    },
  });

  const [answer, setAnswer] = useState("null");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    var answer = await postImageToAPI(imgDir);
    setAnswer(answer);
    writeProblem("@history", image, answer);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View className=" p-4 py-10 flex flex-col align-center justify-center gap-y-6">
      <View>
        {loading && (
          <View>
            <FontAwesome5 name="brain" size={24} color="black" />
            <ActivityIndicator size="large" />
          </View>
        )}
        {!loading && <Text>{answer}</Text>}
      </View>
    </View>
  );
}
