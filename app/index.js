import { Camera, CameraType, FlashMode, ImageType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Link } from "expo-router";

import { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import SelectorBox from "./components/SelectorBox.js";

export default function Page() {
  const [flash, setFlash] = useState(FlashMode.auto);
  const [flashIcon, setFlashIcon] = useState("ios-flash");

  useEffect(() => {
    if (flash === FlashMode.off) {
      console.log("flash off");
      setFlashIcon("ios-flash-outline");
    } else {
      console.log("flash on");
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
      quality: 1,
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

  function capture() {
    console.log("capture");
    cameraRef.takePictureAsync();
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
          <View className="flex flex-row justify-between p-2">
            <Link href="/menu">
              <Feather name="menu" size={32} color="white" />
            </Link>

            <Link href="/settings">
              <Feather name="settings" size={32} color="white" />
            </Link>
          </View>

          <View>
            <SelectorBox />
          </View>

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
