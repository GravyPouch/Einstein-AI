import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Link, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { read } from "./lib/problem";
import { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";

import { deleteAll, deleteItem } from "./lib/problem";

import * as FileSystem from "expo-file-system";

export default function Modal() {
  const navigation = useNavigation();
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const isPresented = navigation.canGoBack();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const imgDir = FileSystem.documentDirectory + "images/";

  const fetchData = async () => {
    const data = await read("@history");
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const styles = StyleSheet.create({
    stretch: {
      resizeMode: "contain",
    },
  });

  async function deleteHistory() {
    deleteAll("@history");
    setData(false);
    alert("History Deleted");
  }

  async function deleteProblem(index) {
    if (await deleteItem("@history", index)) {
      setData(data.splice(index, 1));
      setLoading(true);
      fetchData();
      alert("Item Deleted");
    }
  }

  return (
    <View>
      {!isPresented && <Link href="../">Dismiss</Link>}

      <Pressable onPress={deleteHistory}>
        <View className=" flex flex-row justify-between items-center bg-red-500 p-3">
          <Text>Delete All</Text>
          <Feather name="trash-2" size={24} color="black" />
        </View>
      </Pressable>

      {loading && <ActivityIndicator size="large" />}

      {(data && (
        <FlatList
          className=" mb-10"
          inverted={false}
          data={data}
          refreshing={loading}
          renderItem={({ item, index }) => {
            const options = {
              weekday: "short",
              year: "numeric",
              month: "long",
              day: "numeric",
              time: "long",
            };

            var utcSeconds = item.time;
            var d = new Date(utcSeconds);
            let timeStamp = d.toLocaleString("en-US", options);
            return (
              <View className=" border-gray-500/30 border-2 p-2 mx-2 rounded-xl my-2">
                <View className=" flex flex-row justify-between py-2">
                  <Pressable
                    onPress={() => {
                      deleteProblem(index);
                    }}
                  >
                    <View>
                      <Feather name="trash-2" size={24} color="red" />
                    </View>
                  </Pressable>
                  <View>
                    <Text>{timeStamp}</Text>
                  </View>
                </View>

                <Image
                  style={styles.stretch}
                  className="w-full h-60"
                  source={{
                    uri: imgDir + item.img,
                  }}
                />
              </View>
            );
          }}
        />
      )) || <Text className=" text-center text-gray-500 p-10">No History</Text>}
    </View>
  );
}
