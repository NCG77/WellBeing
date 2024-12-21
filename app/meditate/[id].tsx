import AppGradient from "@/components/AppGradient";
import { router, useLocalSearchParams } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  Animated,
  Easing,
  ImageBackground,
  Pressable,
  Text,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Audio } from "expo-av";
import CustomButton from "@/components/CustomButton";
import MEDITATION_IMAGES from "@/constants/meditation-images";
import { TimerContext } from "@/context/TimerContext";
import { MEDITATION_DATA, AUDIO_FILES } from "@/constants/MeditationData";

const BREATH_PHASES = [
  { phase: "Breath In", duration: 3000 },
  { phase: "Hold", duration: 5000 },
  { phase: "Breath Out", duration: 3000 },
];

const Page = () => {
  const { id } = useLocalSearchParams();
  const { duration: secondsRemaining, setDuration } = useContext(TimerContext);

  const [isMeditating, setMeditating] = useState(false);
  const [audioSound, setSound] = useState<Audio.Sound>();
  const [isPlayingAudio, setPlayingAudio] = useState(false);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    let phaseTimerId: NodeJS.Timeout;
    let countdownTimerId: NodeJS.Timeout;

    if (isMeditating) {
      const { duration } = BREATH_PHASES[currentPhaseIndex];

      phaseTimerId = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }).start(() => {
          setCurrentPhaseIndex((prev) => (prev + 1) % BREATH_PHASES.length);
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }).start();
        });
      }, duration);

      countdownTimerId = setInterval(() => {
        setDuration((prev) => {
          if (prev <= 1) {
            clearInterval(countdownTimerId);
            clearTimeout(phaseTimerId);
            setMeditating(false);
            stopAudio();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      clearTimeout(phaseTimerId);
      clearInterval(countdownTimerId);
    };
  }, [isMeditating, currentPhaseIndex]);

  const stopAudio = async () => {
    if (audioSound) {
      const status = await audioSound.getStatusAsync();
      if (status?.isLoaded && status.isPlaying) {
        await audioSound.stopAsync();
      }
    }
  };

  useEffect(() => {
    return () => {
      setDuration(60);
      audioSound?.unloadAsync();
    };
  }, [audioSound]);

  const initializeSound = async () => {
    const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;
    const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFileName]);
    setSound(sound);
    return sound;
  };

  const togglePlayPause = async () => {
    const sound = audioSound ? audioSound : await initializeSound();
    const status = await sound?.getStatusAsync();

    if (status?.isLoaded) {
      if (!isPlayingAudio) {
        await sound.playAsync();
        setPlayingAudio(true);
      } else {
        await sound.pauseAsync();
        setPlayingAudio(false);
      }
    }
  };

  const toggleMeditationSessionStatus = async () => {
    setMeditating((prev) => !prev);
    await togglePlayPause();
  };

  const handleAdjustDuration = () => {
    if (isMeditating) toggleMeditationSessionStatus();
    router.push("/(modal)/adjust-meditation-duration");
  };

  const { phase } = BREATH_PHASES[currentPhaseIndex];
  const formattedTimeMinutes = String(
    Math.floor(secondsRemaining / 60)
  ).padStart(2, "0");
  const formattedTimeSeconds = String(secondsRemaining % 60).padStart(2, "0");

  return (
    <View style={styles.container}>
      <ImageBackground
        source={MEDITATION_IMAGES[Number(id) - 1]}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <AppGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={styles.gradient}
        >
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <AntDesign name="leftcircleo" size={50} color="white" />
          </Pressable>
          <View style={styles.timerContainer}>
            <View style={styles.timer}>
              <Text style={styles.timerText}>
                {formattedTimeMinutes}:{formattedTimeSeconds}
              </Text>
            </View>
            <Animated.Text style={[styles.phaseText, { opacity: fadeAnim }]}>
              {phase}
            </Animated.Text>
          </View>
          <View className="mb-5">
            <CustomButton
              title="Adjust duration"
              onPress={handleAdjustDuration}
            />
            <CustomButton
              title={isMeditating ? "Stop" : "Start Meditation"}
              onPress={toggleMeditationSessionStatus}
              containerStyles="mt-4"
            />
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  gradient: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "web" ? 30 : 60,
    left: 20,
    zIndex: 10,
  },
  timerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
  },
  timer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 100,
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#1E3A8A",
  },
  phaseText: {
    fontSize: 24,
    color: "#FFF",
    marginTop: 15,
    textAlign: "center",
  },
  buttonsContainer: {
    marginBottom: Platform.OS === "web" ? 40 : 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  adjustButton: {
    backgroundColor: "#fff",
    marginRight: 10,
    marginVertical: 5,
  },
  startButton: {
    backgroundColor: "#fff",
    marginVertical: 5,
  },
});

export default Page;
