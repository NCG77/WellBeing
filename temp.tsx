import React, { useContext, useEffect, useState } from "react";
import { Animated, Easing, ImageBackground, Pressable, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { Audio } from "expo-av";
import CustomButton from "@/components/CustomButton";
import AppGradient from "@/components/AppGradient";

import MEDITATION_IMAGES from "@/constants/meditation-images";
import { TimerContext } from "@/context/TimerContext";
import { MEDITATION_DATA, AUDIO_FILES } from "@/constants/MeditationData";

const BREATH_PHASES = [
    { phase: "Breath In", duration: 4000 }, // 4 seconds
    { phase: "Hold", duration: 5000 },     // 5 seconds
    { phase: "Breath Out", duration: 4000 }, // 4 seconds
];

const Page = () => {
    const { id } = useLocalSearchParams();
    const { duration: secondsRemaining, setDuration } = useContext(TimerContext);

    const [isMeditating, setMeditating] = useState(false);
    const [audioSound, setSound] = useState<Audio.Sound>();
    const [isPlayingAudio, setPlayingAudio] = useState(false);
    const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0); // Index of the current breath phase
    const [fadeAnim] = useState(new Animated.Value(1)); // For fade-in and fade-out animation

    useEffect(() => {
        let timerId: NodeJS.Timeout;

        if (isMeditating) {
            // Schedule phase transitions
            const { duration } = BREATH_PHASES[currentPhaseIndex];
            timerId = setTimeout(() => {
                // Fade-out animation
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 500,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true
                }).start(() => {
                    // Update the phase
                    setCurrentPhaseIndex((prev) => (prev + 1) % BREATH_PHASES.length);

                    // Fade-in animation
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 500,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true
                    }).start();
                });
            }, duration);
        }

        return () => clearTimeout(timerId);
    }, [isMeditating, currentPhaseIndex]);

    useEffect(() => {
        return () => {
            setDuration(1 * 60); // Reset to 1 minute duration after unmount
            audioSound?.unloadAsync();
        };
    }, [audioSound]);

    const initializeSound = async () => {
        const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;
        const { sound } = await Audio.Sound.createAsync(
            AUDIO_FILES[audioFileName]
        );
        setSound(sound);
        return sound;
    };

    const togglePlayPause = async () => {
        const sound = audioSound ? audioSound : await initializeSound();
        const status = await sound?.getStatusAsync();

        if (status?.isLoaded && !isPlayingAudio) {
            await sound?.playAsync();
            setPlayingAudio(true);
        } else {
            await sound?.pauseAsync();
            setPlayingAudio(false);
        }
    };

    const toggleMeditationSessionStatus = async () => {
        if (secondsRemaining === 0) setDuration(1 * 60); // 1 minute by default

        setMeditating(!isMeditating);
        await togglePlayPause();
    };

    const handleAdjustDuration = () => {
        if (isMeditating) toggleMeditationSessionStatus();
        router.push("/(modal)/adjust-meditation-duration");
    };

    const { phase } = BREATH_PHASES[currentPhaseIndex];

    const formattedTimeMinutes = String(Math.floor(secondsRemaining / 60)).padStart(2, "0");
    const formattedTimeSeconds = String(secondsRemaining % 60).padStart(2, "0");

    return (
        <View className="flex-1">
            <ImageBackground
                source={MEDITATION_IMAGES[Number(id) - 1]}
                resizeMode="cover"
                className="flex-1"
            >
                <AppGradient colors={["transparent", "rgba(0,0,0,0.8)"]}>
                    <Pressable onPress={() => router.back()} className="absolute top-16 left-6 z-10">
                        <AntDesign name="leftcircleo" size={50} color="white" />
                    </Pressable>

                    <View className="flex-1 justify-center">
                        <View className="mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center">
                            <Text className="text-4xl text-blue-800 font-rmono">
                                {formattedTimeMinutes}.{formattedTimeSeconds}
                            </Text>
                        </View>

                        {/* Display Animated Breath Phase */}
                        <View className="mt-4">
                            <Animated.Text
                                style={{
                                    fontSize: 32,
                                    color: "white",
                                    textAlign: "center",
                                    opacity: fadeAnim // Use animated opacity
                                }}
                            >
                                {phase}
                            </Animated.Text>
                        </View>
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

export default Page;
