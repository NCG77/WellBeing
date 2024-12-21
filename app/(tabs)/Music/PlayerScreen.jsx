import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { colors } from "../../../constants/Colors";
import { iconSizes, fontsize, spacing } from "../../../constants/dimensions";
import {
  Nextbtn,
  Prevbtn,
  PlayPausebtn,
} from "../../../components/Musicomp/Playercontrols";
import {
  PlaybackProvider,
  usePlayback,
} from "../../../hooks/useSetupTrackPlayer";
import { useNavigation, useRoute } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import PlayerRepeatToggle from "../../../components/Musicomp/Playerrepeat";
import PlayProgressBar from "../../../components/Musicomp/PlayerProgressbar";

const PlayerScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { track } = params || {}; // Get track and isPlaying state passed via navigation

  const {
    currentTrack,
    isPlaying,
    handlePlayPause,
    handlePreviousTrack,
    handleNextTrack,
    position,
    trackDuration,
    seekTo,
    repeatState,
    toggleRepeat, // Ensure toggleRepeat is correctly imported
    toggleMute, // Added toggleMute function
    isMuted, // Added isMuted state
  } = usePlayback(); // Use the context hook

  useEffect(() => {
    if (track) {
      handlePlayPause(track); // Start playback if track is passed
    }
  }, [track]);

  const handleHome = () => {
    navigation.navigate("Offline_Songs");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleHome}>
          <AntDesign
            name={"arrowleft"}
            color={colors.iconPrimary}
            size={iconSizes.md}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Playing Now</Text>
      </View>
      <View style={styles.coverImageContainer}>
        <Image
          source={{ uri: currentTrack?.artwork || track?.artwork }}
          style={styles.coverImage}
        />
      </View>
      <View style={styles.titleRowHeart}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {currentTrack?.title || track?.title || "Unknown Title"}
          </Text>
        </View>
      </View>
      <View style={styles.playerControl}>
        <TouchableOpacity style={styles.volumeWrapper} onPress={toggleMute}>
          <Feather
            name={isMuted ? "volume-x" : "volume-1"} // Toggle between sound on/off icons
            color={colors.iconSecondary}
            size={iconSizes.lg}
          />
        </TouchableOpacity>
        <View style={styles.wrapper}>
          <PlayerRepeatToggle
            repeatState={repeatState}
            toggleRepeat={toggleRepeat} // Pass toggleRepeat here
          />
        </View>
      </View>
      <View>
        <PlayProgressBar
          position={position}
          duration={trackDuration}
          onSeek={seekTo}
        />
        <View style={styles.playPauseContainer}>
          <Prevbtn size={iconSizes.xl} onPress={handlePreviousTrack} />
          <PlayPausebtn
            size={iconSizes.xl}
            isPlaying={isPlaying}
            onPress={() => handlePlayPause(currentTrack)} // Only play/pause here
          />
          <Nextbtn size={iconSizes.xl} onPress={handleNextTrack} />
        </View>
      </View>
    </View>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  headerText: {
    flex: 1,
    color: colors.textPrimary,
    textAlign: "center",
    fontSize: fontsize.lg,
    fontWeight: "500",
  },
  coverImage: {
    height: 300,
    width: 300,
    borderRadius: 10,
  },
  coverImageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: spacing.xl,
  },
  title: {
    fontSize: fontsize.lg,
    color: colors.textPrimary,
    fontWeight: "500",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleRowHeart: {
    flexDirection: "row",
    alignItems: "center",
  },
  playerControl: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: spacing.lg,
    marginHorizontal: spacing.xm,
  },
  volumeWrapper: {
    flex: 1,
  },
  wrapper: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  playPauseContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.lg,
    paddingVertical: spacing.md,
  },
});
