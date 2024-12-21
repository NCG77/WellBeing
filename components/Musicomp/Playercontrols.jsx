import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { iconSizes } from "../../constants/dimensions";
import { colors } from "../../constants/Colors";
// Previous Button
export const Prevbtn = ({ size = iconSizes.lg, onPress }) => {
  const handlePress = () => {
    console.log("Prev button pressed");
    onPress(); // Call the passed function
  };

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={handlePress}>
      <FontAwesome6 name={"backward"} size={size} color={colors.iconPrimary} />
    </TouchableOpacity>
  );
};

// PlayPause Button with dynamic state
export const PlayPausebtn = ({ size = iconSizes.lg, isPlaying, onPress }) => {
  const handlePress = () => {
    console.log("PlayPause button pressed");
    onPress(); // Call the passed function
  };

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={handlePress}>
      <FontAwesome6
        name={isPlaying ? "pause" : "play"}
        size={size}
        color={colors.iconPrimary}
      />
    </TouchableOpacity>
  );
};

// Next Button
export const Nextbtn = ({ size = iconSizes.lg, onPress }) => {
  const handlePress = () => {
    console.log("Next button pressed");
    onPress();
  };

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={handlePress}>
      <FontAwesome6 name={"forward"} size={size} color={colors.iconPrimary} />
    </TouchableOpacity>
  );
};
