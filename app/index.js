import { Camera, CameraType, FlashMode } from "expo-camera";
import { Link } from "expo-router";

import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

import SelectorBox from "./components/SelectorBox.js";

export default function Page() {
  const [flash, setFlash] = useState(FlashMode.auto);
  const [permission, requestPermission] = Camera.useCameraPermissions();

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

  function toggleFlash() {
    setFlash((current) =>
      current === FlashMode.off ? FlashMode.on : FlashMode.off
    );
  }

  function capture() {
    console.log("capture");
  }

  function settings() {
    console.log("settings");
  }

  function menu() {
    console.log("menu");
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={CameraType.back} flashMode={flash}>
        <SafeAreaView style={styles.buttonContainer}>
          <View className="flex flex-row justify-between ">
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

          <View className="flex flex-row justify-around items-center">
            <Link href="/history">
              <Fontisto name="history" size={32} color="white" />
            </Link>

            <TouchableOpacity onPress={capture}>
              <Entypo name="circle" size={85} color="white" />
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleFlash}>
              <FontAwesome5 name="bolt" size={32} color="white" />
            </TouchableOpacity>
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

  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
