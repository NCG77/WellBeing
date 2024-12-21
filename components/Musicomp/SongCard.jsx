import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../../constants/Colors";
import { fontsize, spacing } from "../../constants/dimensions";

const SongCard = ({
  item = {},
  containerStyle = {},
  imageStyle = {},
  handleplay = {},
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={() => handleplay(item)} // Call handleplay when the card is pressed
    >
      <Image
        source={{ uri: item.artwork }}
        style={[styles.coverimage, imageStyle]}
      />
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};

export default SongCard;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  coverimage: {
    height: 160,
    width: 160,
    borderRadius: 10,
  },
  title: {
    color: colors.textPrimary,
    fontSize: fontsize.lg,
    textAlign: "center",
    fontWeight: "400",
    paddingVertical: spacing.sm,
  },
});
