import { Camera, CameraType, FlashMode, ImageType } from "expo-camera";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import * as Haptics from "expo-haptics";
import * as FileSystem from "expo-file-system";
import { Link, useRouter } from "expo-router";

import { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import SelectorBox from "./components/SelectorBox";

import { writeProblem } from "./lib/problem";

export default function Page() {
  const [flash, setFlash] = useState(FlashMode.auto);
  const [flashIcon, setFlashIcon] = useState("ios-flash");

  const [image, setImage] = useState(null);

  const [cropY, setCropY] = useState(0);
  const [cropX, setCropX] = useState(0);
  const [cropOriginX, setCropOriginX] = useState(0);
  const [cropOriginY, setCropOriginY] = useState(0);

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const router = useRouter();

  useEffect(() => {
    if (flash === FlashMode.off) {
      //console.log("flash off");
      setFlashIcon("ios-flash-outline");
    } else {
      //console.log("flash on");
      setFlashIcon("ios-flash");
    }
  }, [flash]);

  const [permission, requestPermission] = Camera.useCameraPermissions();

  const [cameraRef, setCameraRef] = useState(null);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      console.log(result);
    } else {
      alert("You did not select any image.");
    }
  };

  function toggleFlash() {
    setFlash((current) =>
      current === FlashMode.off ? FlashMode.on : FlashMode.off
    );
  }

  async function capture() {
    console.log("capture");
    const picture = await cameraRef.takePictureAsync({
      quality: 0.5,
    });
    const manipResult = await manipulateAsync(
      picture.uri,
      [
        { resize: { height: screenHeight, width: screenWidth } },
        {
          crop: {
            height: cropY,
            width: cropX,
            originX: cropOriginX,
            originY: cropOriginY,
          },
        },
      ],
      { compress: 0.5, format: SaveFormat.JPEG }
    );

    //cameraRef.pausePreview();

    //Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    const imageURI = await manipResult.uri;

    let result = /[^/]*$/.exec(imageURI)[0];

    await FileSystem.moveAsync({
      from: imageURI,
      to: `${FileSystem.documentDirectory}images/${result}`,
    });

    await writeProblem("@history", result);

    router.push({
      pathname: "/answer",
      params: { image: result, type: "history" },
    });
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={CameraType.back}
        flashMode={flash}
        ImageType={ImageType.jpg}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      >
        <SafeAreaView style={styles.buttonContainer}>
          <View className="flex flex-row justify-between items-center p-4">
            <Link href="/purchase">
              <View className=" bg-orange-300 rounded-full p-3">
                <Text className=" font-bold text-white">1/10</Text>
              </View>
            </Link>

            <Link href="settings">
              <Feather name="settings" size={32} color="white" />
            </Link>
          </View>

          <View
            className=" mx-auto"
            onLayout={(event) => {
              const layout = event.nativeEvent.layout;

              setCropY(layout.height);

              setCropX(layout.width);

              setCropOriginX(layout.x);

              setCropOriginY(layout.y);
            }}
          >
            <SelectorBox />
          </View>

          <View className=" "></View>

          <View>
            <View className="flex flex-row justify-around items-center">
              <Link href="/chat" className=" p-10">
                <MaterialIcons name="message" size={40} color="white" />
              </Link>

              <TouchableOpacity onPress={capture}>
                <Entypo name="circle" size={85} color="white" />
              </TouchableOpacity>

              <TouchableOpacity onPress={toggleFlash} className=" p-10">
                <Ionicons name={flashIcon} size={40} color="white" />
              </TouchableOpacity>
            </View>

            <View className="flex flex-row justify-center gap-12 py-10">
              <Link href="/history" className=" px-10">
                <Fontisto name="history" size={32} color="white" />
              </Link>

              <TouchableOpacity onPress={pickImageAsync} className=" px-10">
                <MaterialIcons name="photo-library" size={32} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
    backgroundColor: "transparent",

    marginHorizontal: 16,
  },

  icons: {
    padding: 10,
  },

  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
