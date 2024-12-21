import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { colors } from "../../constants/Colors";
import { fontsize, iconSizes, spacing } from "../../constants/dimensions";
import { Prevbtn, PlayPausebtn, Nextbtn } from "./Playercontrols";
import { PlaybackProvider, usePlayback } from "../../hooks/useSetupTrackPlayer";
import { useNavigation } from "@react-navigation/native";
import MovingText from "./MovingText";

const Floatingplayer = () => {
  const navigation = useNavigation();

  // Navigate to PlayerScreen with track and isPlaying state
  const handlePlayerScreen = () => {
    if (currentTrack) {
      navigation.navigate("Player_Screen", { track: currentTrack, isPlaying });
    }
  };

  const {
    currentTrack,
    isPlaying,
    handlePlayPause,
    position,
    seekTo,
    handlePreviousTrack,
    handleNextTrack,
  } = usePlayback();
  const [trackDuration, setTrackDuration] = useState(0);

  // Update track duration when the current track changes
  useEffect(() => {
    if (currentTrack && currentTrack.duration) {
      setTrackDuration(currentTrack.duration);
    }
  }, [currentTrack]);

  if (!currentTrack) {
    // If no track is selected, do not render the floating player
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.85}
        onPress={handlePlayerScreen} // Open PlayerScreen
      >
        <Image
          source={{ uri: currentTrack.artwork }}
          style={styles.coverimage}
        />
        <View style={styles.titlecontainer}>
          <MovingText
            text={currentTrack.title || "Unknow Title"}
            style={styles.title}
          />
          {/* <Text style={styles.title}>
            {currentTrack.title || "Unknown Title"}
          </Text> */}
          <Text style={styles.playing}>
            {isPlaying ? "Now Playing..." : "Paused"}
          </Text>
        </View>
        <View style={styles.controlcontainer}>
          <Prevbtn size={iconSizes.md} onPress={handlePreviousTrack} />
          <PlayPausebtn
            size={iconSizes.lg}
            isPlaying={isPlaying}
            onPress={() => handlePlayPause(currentTrack)}
          />
          <Nextbtn size={iconSizes.md} onPress={handleNextTrack} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  coverimage: {
    height: 60,
    width: 60,
    resizeMode: "cover",
  },
  titlecontainer: {
    flex: 1,
    paddingHorizontal: spacing.sm,
    overflow: "hidden",
    marginLeft: spacing.xm,
    marginRight: spacing.lg,
  },
  title: {
    color: colors.textPrimary,
    fontSize: fontsize.lg,
    fontWeight: "bold",
  },
  playing: {
    color: colors.textSecondary,
    fontSize: fontsize.md,
  },
  controlcontainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    paddingRight: spacing.md,
  },
});

export default Floatingplayer;
