import {
  View,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { writeProblem } from "../lib/problem";
import * as FileSystem from "expo-file-system";
import { postImageToAPI } from "../lib/api";
import * as Progress from "react-native-progress";

export default function Answer({ route, navigation }) {
  const { image, type } = route.params;

  //console.log(image, type);

  const imgDir = FileSystem.documentDirectory + "images/" + image;

  //console.log(imgDir);

  const styles = StyleSheet.create({
    stretch: {
      resizeMode: "contain",
    },
  });

  const randomValue = Math.floor(Math.random() * 30) + 5;

  const [answer, setAnswer] = useState("null");
  const [loading, setLoading] = useState(true);
  const [queue, setQueue] = useState(randomValue);
  const [progress, setProgress] = useState(0);
  const [queueTotal, setQueueTotal] = useState(randomValue);
  const progressAdd = 1 / queueTotal;

  useEffect(() => {
    if (queue <= 0) {
      setLoading(false);
      return;
    } else {
      const interval = setInterval(() => {
        setQueue((queue) => queue - 1);
        setProgress((progress) => progress + progressAdd);
      }, Math.floor(Math.random() * 1000) + 100);
      return () => clearInterval(interval);
    }
  }, [queue]);

  const fetchData = async () => {
    var answer = await postImageToAPI(imgDir);
    setAnswer(answer);
    writeProblem("@history", image, answer);
    // setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View className=" p-4 py-10">
      <View>
        {loading ? (
          <View className=" flex flex-col h-full justify-between">
            <View className=" bg-red-500 py-40">
              <Text className=" text-center">Advertisment</Text>
            </View>
            <View className=" space-y-4">
              <Text className=" text-center">
                You are {queue}/{queueTotal} in line
              </Text>
              <Progress.Bar
                progress={progress}
                width={null}
                color="black"
                height={15}
                borderRadius={10}
              />

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Premium");
                }}
                className="w-full bg-black p-5 rounded-full "
              >
                <Text className="text-white text-center font-bold">
                  Skip The Wait
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View className="flex flex-col space-y-6">
            <Image
              style={styles.stretch}
              className="w-full h-64"
              source={{
                uri: imgDir,
              }}
            />
            <ScrollView>
              <Text className=" text-xl font-bold">{answer}</Text>
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
}
