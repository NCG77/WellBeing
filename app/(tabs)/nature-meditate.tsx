import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import React from "react";
import {
    FlatList,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    Platform,
} from "react-native";

import MEDITATION_IMAGES from "@/constants/meditation-images";
import { MEDITATION_DATA } from "@/constants/MeditationData";
import AppGradient from "@/components/AppGradient";

const Page = () => {
    return (
        <View style={styles.container}>
            <AppGradient colors={["#161b2e", "#0a4d4a", "#766e67"]}>
                <View style={styles.header}>
                    <Text style={styles.welcomeText}>Welcome!!</Text>
                    <Text style={styles.subtitle}>
                        Start your meditation practice today
                    </Text>
                </View>
                <FlatList
                    data={MEDITATION_DATA}
                    contentContainerStyle={styles.listContent}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() =>
                                router.push(`/meditate/${item.id}`)
                            }
                            style={styles.card}
                        >
                            <ImageBackground
                                source={
                                    Platform.OS === "web"
                                        ? { uri: MEDITATION_IMAGES[item.id - 1].uri }
                                        : MEDITATION_IMAGES[item.id - 1]
                                }
                                resizeMode="cover"
                                style={styles.backgroundImage}
                            >
                                <LinearGradient
                                    colors={["transparent", "rgba(0,0,0,0.8)"]}
                                    style={styles.gradient}
                                >
                                    <Text style={styles.cardTitle}>
                                        {item.title}
                                    </Text>
                                </LinearGradient>
                            </ImageBackground>
                        </TouchableOpacity>
                    )}
                />
            </AppGradient>
            <StatusBar style="light" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#161b2e",
    },
    header: {
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    welcomeText: {
        color: "#D1D5DB",
        marginBottom: 8,
        fontWeight: "bold",
        fontSize: 32,
        textAlign: "left",
    },
    subtitle: {
        color: "#E0E7FF",
        fontSize: 18,
        fontWeight: "500",
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 100,
    },
    card: {
        height: 180,
        marginVertical: 12,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: "transparent",
        boxShadow: Platform.OS === "web" ? "0px 4px 6px rgba(0,0,0,0.1)" : "none",
    },
    backgroundImage: {
        flex: 1,
        borderRadius: 10,
        overflow: "hidden",
        justifyContent: "center",
    },
    gradient: {
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
    },
    cardTitle: {
        color: "#F9FAFB",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default Page;
