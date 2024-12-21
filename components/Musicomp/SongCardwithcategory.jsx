import { FlatList, StyleSheet, View, Text } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { fontsize, spacing } from "../../constants/dimensions";
import SongCard from "./SongCard";
import { colors } from "../../constants/Colors";
import { usePlayback } from "../../hooks/useSetupTrackPlayer";

const SongCardwithcategory = ({ item }) => {
  const { handlePlayPause } = usePlayback();

  return (
    <View style={styles.container}>
      <Text style={styles.headingtext}>{item.title}</Text>
      <FlatList
        data={item.songs}
        renderItem={({ item }) => (
          <SongCard
            item={item}
            handleplay={() => handlePlayPause(item)}
            containerStyle={{ width: "47%" }}
            imageStyle={{ height: 180, width: 180 }}
          />
        )}
        numColumns={2}
        contentContainerStyle={{
          paddingBottom: spacing.lg,
          paddingHorizontal: spacing.lg,
        }}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginVertical: spacing.lg,
        }}
      />
    </View>
  );
};

export default SongCardwithcategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingtext: {
    fontSize: fontsize.xl,
    color: colors.textPrimary,
    fontWeight: "bold",
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
});
