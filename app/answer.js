import { View, Image, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Link, useNavigation, useRouter, useSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import * as FileSystem from "expo-file-system";

export default function Modal() {
  const navigation = useNavigation();
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const isPresented = navigation.canGoBack();

  const params = useSearchParams();
  const { image, type } = params;
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
      {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
      {!isPresented && <Link href="../">Dismiss</Link>}

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
