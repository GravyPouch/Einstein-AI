import { Camera, CameraType, FlashMode, ImageType } from "expo-camera";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import * as Haptics from "expo-haptics";
import * as FileSystem from "expo-file-system";
import { Link, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import SelectorBox from "../components/SelectorBox";

import { writeProblem } from "../lib/problem";

import { useIsFocused } from "@react-navigation/native";

export default function Home({ navigation }) {
  const [flash, setFlash] = useState(FlashMode.auto);
  const [flashIcon, setFlashIcon] = useState("ios-flash");

  const [image, setImage] = useState(null);

  const [cropY, setCropY] = useState(0);
  const [cropX, setCropX] = useState(0);
  const [cropOriginX, setCropOriginX] = useState(0);
  const [cropOriginY, setCropOriginY] = useState(0);

  const [tokens, setTokens] = useState(10);

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  useEffect(() => {
    if (flash === FlashMode.off) {
      //console.log("flash off");
      setFlashIcon("ios-flash-outline");
    } else {
      //console.log("flash on");
      setFlashIcon("ios-flash");
    }
  }, [flash]);

  useEffect(() => {
    if (image) {
      console.log(image.uri);
      //console.log("image uri: " + image.uri);
      //console.log("image width: " + image.width);
      //console.log("image height: " + image.height);
    }
  }, [image]);

  const [permission, requestPermission] = Camera.useCameraPermissions();

  const [cameraRef, setCameraRef] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (cameraRef !== null) {
      if (isFocused) {
        cameraRef.resumePreview();
      } else {
        cameraRef.pausePreview();
      }
    }
  }, [isFocused, cameraRef]);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container} className=" space-y-4">
        <Text className=" text-3xl font-bold text-center">
          Welcome to Einstien
        </Text>
        <Text style={{ textAlign: "center" }}>
          All we need is your camera permission to get started
        </Text>
        <Pressable onPress={requestPermission}>
          <View className=" rounded-full bg-black p-4 mx-auto">
            <Text className=" text-white font-bold text-center">
              Grant Permission
            </Text>
          </View>
        </Pressable>
      </View>
    );
  }

  function toggleFlash() {
    setFlash((current) =>
      current === FlashMode.off ? FlashMode.on : FlashMode.off
    );
  }

  async function cropImage(picture) {
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
    return manipResult;
  }

  async function processImage(picture, crop) {
    let finalPic = picture;

    if (crop) {
      finalPic = await cropImage(picture);
    }

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    const imageURI = await finalPic.uri;

    let result = /[^/]*$/.exec(imageURI)[0];

    await FileSystem.moveAsync({
      from: imageURI,
      to: `${FileSystem.documentDirectory}images/${result}`,
    });

    navigation.navigate("Answer", { image: result, type: "history" });
  }

  async function capture() {
    console.log("capture");
    const picture = await cameraRef.takePictureAsync({
      quality: 0.5,
    });
    setImage(picture);
    processImage(picture, true);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.5,
    });

    let picture = result.assets[0];

    if (!result.canceled) {
      setImage(picture);
      processImage(picture, false);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
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
            <Link to={{ screen: "Purchase" }}>
              <View className=" bg-orange-300 rounded-full p-3">
                <Text className=" font-bold text-white">{tokens}/10</Text>
              </View>
            </Link>

            <Link to={{ screen: "Settings" }}>
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

          <View>
            <View className=" flex flex-row items-center justify-center gap-4">
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Chat");
                }}
                className=" p-10"
              >
                <MaterialIcons name="message" size={40} color="white" />
              </TouchableOpacity>

              <TouchableOpacity onPress={capture}>
                <Entypo name="circle" size={85} color="white" />
              </TouchableOpacity>

              <TouchableOpacity onPress={toggleFlash} className=" p-10">
                <Ionicons name={flashIcon} size={40} color="white" />
              </TouchableOpacity>
            </View>

            <View className=" flex flex-row items-center justify-center mx-auto py-4">
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("History");
                }}
                className=" px-10"
              >
                <Fontisto name="history" size={32} color="white" />
              </TouchableOpacity>

              <TouchableOpacity onPress={pickImage} className=" px-10">
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
});
