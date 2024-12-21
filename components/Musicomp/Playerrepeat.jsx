import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { iconSizes } from "../../constants/dimensions";
import { colors } from "../../constants/Colors";

// Component to handle repeat functionality with debug logs
const PlayerRepeatToggle = ({ repeatState, toggleRepeat }) => {
  const getRepeatIcon = () => {
    if (repeatState === "none") return "repeat"; // No repeat
    if (repeatState === "single") return "repeat-once"; // Repeat single track
    return "repeat"; // Repeat playlist
  };

  return (
    <TouchableOpacity onPress={toggleRepeat}>
      <MaterialCommunityIcons
        name={getRepeatIcon()}
        color={colors.iconSecondary}
        size={iconSizes.lg}
      />
    </TouchableOpacity>
  );
};

export default PlayerRepeatToggle;

const styles = StyleSheet.create({});
