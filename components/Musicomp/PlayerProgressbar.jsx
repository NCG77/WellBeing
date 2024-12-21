import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Slider } from "react-native-awesome-slider";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { fontsize, spacing } from "../../constants/dimensions";
import { colors } from "../../constants/Colors";
const PlayProgressBar = ({ position, duration, onSeek }) => {
  // State to store track duration (use state to trigger re-renders when duration changes)
  const [trackDuration, setTrackDuration] = useState(duration);

  // Shared values for progress, min, and max
  const progress = useSharedValue(position || 0); // Initial position passed as prop or fallback to 0
  const min = useSharedValue(0); // Min value is always 0
  const max = useSharedValue(trackDuration || 1); // Max value is the track duration

  // Effect to update progress over time based on the position
  useEffect(() => {
    progress.value = withTiming(position, { duration: 100 }); // Smooth progress transition
  }, [position]);

  // Effect to update the max value when the track duration changes
  useEffect(() => {
    if (duration !== trackDuration) {
      setTrackDuration(duration);
      max.value = duration; // Update max value when duration changes
    }
  }, [duration]);

  const handleSliderChange = (value) => {
    progress.value = value; // Update progress when slider is changed
    onSeek(value); // Call onSeek with new position to update track
  };

  return (
    <View>
      <View style={styles.timerow}>
        <Text style={styles.timetext}>{formatTime(position)}</Text>
        <Text style={styles.timetext}>
          {"-"}
          {formatTime(trackDuration)} {/* Use updated track duration */}
        </Text>
      </View>
      <Slider
        style={styles.slidercontainer}
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        theme={{
          maximumTrackTintColor: colors.maximumtint,
          minimumTrackTintColor: colors.minimumtint,
        }}
        containerStyle={{
          height: 7,
          borderRadius: spacing.sm,
        }}
        thumbWidth={18}
        onValueChange={handleSliderChange} // Handle value change
        renderBubble={() => (
          <View style={styles.bubble} /> // Custom bubble if needed
        )}
      />
    </View>
  );
};

// Helper function to format time (in seconds) to MM:SS format
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" + secs : secs}`;
};

export default PlayProgressBar;

const styles = StyleSheet.create({
  timerow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: spacing.xm,
    marginTop: spacing.xl,
  },
  timetext: {
    color: colors.textPrimary,
    fontWeight: "300",
    fontSize: fontsize.sm,
    opacity: 0.75,
  },
  slidercontainer: {
    marginVertical: spacing.lg,
  },
  bubble: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.background,
  },
});
