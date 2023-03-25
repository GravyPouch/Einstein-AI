import { View, Image, Text, StyleSheet } from "react-native";
import { Link, useNavigation, useRouter, useSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as FileSystem from "expo-file-system";

export default function Modal() {
  const navigation = useNavigation();
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const isPresented = navigation.canGoBack();

  const params = useSearchParams();
  const { image, type } = params;
  console.log(image, type);

  const imgDir = FileSystem.cacheDirectory + "ImageManipulator/" + image;

  console.log(imgDir);

  const styles = StyleSheet.create({
    stretch: {
      resizeMode: "contain",
    },
  });

  return (
    <View
      className=" p-4"
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
      {!isPresented && <Link href="../">Dismiss</Link>}

      <Text>Image:</Text>
      <Image
        style={styles.stretch}
        className="w-full h-full"
        source={{
          uri: imgDir,
        }}
      />
    </View>
  );
}
