import React, { useState, useRef, useEffect, useMemo } from "react";
import { View, PanResponder, Dimensions, Text } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import * as Haptics from "expo-haptics";

export default SelectorBox = () => {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const maxBoxWidth = screenWidth - screenWidth / 10;
  const maxBoxHeight = screenHeight / 2.5;

  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(150);

  useEffect(() => {
    //console.log("width: " + width);
    //console.log("height: " + height);

    if (width > maxBoxWidth) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    if (height > maxBoxHeight) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  }, [width, height]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
          if (gestureState.dx === 0) {
            return;
          }
          if (gestureState.dy === 0) {
            return;
          }

          const newWidth = Math.max(
            Math.min(width + gestureState.dx * 1.25, maxBoxWidth),
            100
          );

          setWidth(newWidth);

          const newHeight = Math.max(
            Math.min(height + gestureState.dy * 1.25, maxBoxHeight),
            100
          );

          setHeight(newHeight);
        },
        onPanResponderRelease: (evt, gestureState) => {
          console.log("w: " + width);
          console.log("h: " + height);
        },
      }),
    [width, height] // dependency list
  );

  const oldpanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx === 0) {
          return;
        }
        if (gestureState.dy === 0) {
          return;
        }

        const newWidth = Math.max(
          Math.min(width + gestureState.dx * 1.25, maxBoxWidth),
          100
        );

        setWidth(newWidth);

        const newHeight = Math.max(
          Math.min(height + gestureState.dy * 1.25, maxBoxHeight),
          100
        );

        setHeight(newHeight);
      },
      onPanResponderRelease: (evt, gestureState) => {
        console.log(width);
        console.log(height);
      },
    })
  ).current;

  return (
    <View className="  mx-auto">
      <Text className="text-center text-white pb-2">
        Take a picture of a question
      </Text>

      <View
        style={[{ width, height }]}
        className="bg-slate-200/20 p-1 rounded-xl border-white border-2 mx-auto flex flex-wrap flex-row justify-between content-between"
      >
        <View className=" w-1/2" />
        <View className=" w-1/2" />
        <View className=" w-1/2" />

        <View className=" w-1/2">
          <View className=" p-2 self-end " {...panResponder.panHandlers}>
            <MaterialCommunityIcons
              name="arrow-top-left-bottom-right"
              size={24}
              color="white"
            />
          </View>
        </View>
      </View>
    </View>
  );
};
