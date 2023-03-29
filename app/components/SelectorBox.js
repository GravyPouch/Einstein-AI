import React, { Component } from "react";
import { StyleSheet, View, PanResponder, Dimensions, Text } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const maxBoxWidth = screenWidth - screenWidth / 10;
const maxBoxHeight = screenHeight / 2.5;
export default class SelectorBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: maxBoxWidth,
      height: 100,
      lastMoveX: null,
      lastMoveY: null,
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: this.handleMove.bind(this),
      onPanResponderRelease: this.handleRelease.bind(this),
    });
  }

  handleMove(e, gestureState) {
    const { dx, dy } = gestureState;
    const { lastMoveX, lastMoveY, width, height } = this.state;

    if (lastMoveX === null || lastMoveY === null) {
      this.setState({ lastMoveX: dx, lastMoveY: dy });
      return;
    }

    const diffX = dx - lastMoveX;
    const diffY = dy - lastMoveY;

    this.setState({
      width: Math.max(Math.min(width + diffX * 2, maxBoxWidth), 150),
      height: Math.max(Math.min(height + diffY * 2, maxBoxHeight), 150),
      lastMoveX: dx,
      lastMoveY: dy,
    });
  }

  handleRelease() {
    this.setState({ lastMoveX: null, lastMoveY: null });
  }

  render() {
    const { width, height } = this.state;

    return (
      <View className="  mx-auto">
        <Text className="text-center text-white pb-2">
          Take a picture of a question
        </Text>

        <View
          style={[{ width, height }]}
          className="bg-slate-200/10 p-1 rounded-xl border-white border-2 mx-auto flex flex-wrap flex-row justify-between content-between"
        >
          <View className=" w-1/2" />
          <View className=" w-1/2" />
          <View className=" w-1/2" />

          <View className=" w-1/2">
            <View className=" p-2 self-end " {...this.panResponder.panHandlers}>
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
  }
}
