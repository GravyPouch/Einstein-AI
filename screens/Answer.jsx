import { View, Image, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import * as FileSystem from "expo-file-system";

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
    // setData(data);
    // setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View className=" p-4 py-10 flex flex-col align-center justify-center gap-y-6">
      <Image
        style={styles.stretch}
        className="w-full h-64"
        source={{
          uri: imgDir,
        }}
      />

      <View>
        <Text>Answer:</Text>
        {loading && <ActivityIndicator size="large" />}
      </View>
    </View>
  );
}