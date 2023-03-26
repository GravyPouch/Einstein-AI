import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Link, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { read } from "./lib/problem";
import { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";

import { deleteAll } from "./lib/problem";

import * as FileSystem from "expo-file-system";

export default function Modal() {
  const navigation = useNavigation();
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const isPresented = navigation.canGoBack();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const imgDir = FileSystem.documentDirectory + "images/";

  function deleteHistory() {
    deleteAll("@history");
    setLoading(true);
  }

  const fetchData = async () => {
    const data = await read("@history");
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      {!isPresented && <Link href="../">Dismiss</Link>}

      <TouchableOpacity>
        <Text>Delete All</Text>
        <Feather name="trash-2" size={24} color="black" />
      </TouchableOpacity>

      {loading && <ActivityIndicator />}

      {data && (
        <View className="w-full h-full">
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <View>
                <Text>{index}</Text>
                <Feather name="trash-2" size={24} color="black" />
                <Text>{item.time}</Text>
                <Image
                  className="w-1/6 h-1/6"
                  source={{
                    uri: imgDir + item.img,
                  }}
                />
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}
