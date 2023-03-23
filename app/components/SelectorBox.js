import React, { useState, useRef, useEffect } from "react";
import { View, PanResponder, Dimensions, Text } from "react-native";

export default SelectorBox = () => {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(50);

  useEffect(() => {
    console.log("width: " + width);
    console.log("height: " + height);
  }, [width, height]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const newWidth = Math.min(width + gestureState.dx * 1.75, 350);
        const newHeight = Math.min(height + gestureState.dy * 1.75, 410);
        setWidth(newWidth);
        setHeight(newHeight);
      },
      onPanResponderRelease: (evt, gestureState) => {
        const newWidth = Math.min(width + gestureState.dx * 1.75, 350);
        const newHeight = Math.min(height + gestureState.dy * 1.75, 410);
        setWidth(newWidth);
        setHeight(newHeight);
      },
    })
  ).current;

  return (
    <View>
      <Text className="text-center text-white pb-2">
        Take a picture of the problem
      </Text>
      <View
        {...panResponder.panHandlers}
        style={[{ width, height }]}
        className="bg-slate-200/20 p-10 rounded border-white border-2 mx-auto"
      />
    </View>
  );
};
