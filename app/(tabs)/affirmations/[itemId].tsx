import { AntDesign } from "@expo/vector-icons";
import { GalleryPreviewData } from "@/constants/models/AffirmationCategory";
import { router, useLocalSearchParams } from "expo-router";
import {
    View,
    Text,
    ImageBackground,
    Pressable,
    ScrollView,
    Platform,
    StyleSheet,
} from "react-native";
import AFFIRMATION_GALLERY from "@/constants/affirmation-gallary";
import AppGradient from "@/components/AppGradient";
import React, { useEffect, useState } from "react";

const AffirmationPractice = () => {
    const { itemId } = useLocalSearchParams();

    const [affirmation, setAffirmation] = useState<GalleryPreviewData>();
    const [sentences, setSentences] = useState<string[]>([]);

    useEffect(() => {
        for (let idx = 0; idx < AFFIRMATION_GALLERY.length; idx++) {
            const affirmationData = AFFIRMATION_GALLERY[idx].data;

            const affirmationToStart = affirmationData.find(
                (a) => a.id === Number(itemId)
            );

            if (affirmationToStart) {
                setAffirmation(affirmationToStart);

                const affirmationsArray = affirmationToStart.text.split(".");

                if (affirmationsArray[affirmationsArray.length - 1] === "") {
                    affirmationsArray.pop();
                }

                setSentences(affirmationsArray);
                return;
            }
        }
    }, []);

    const imageSource =
        Platform.OS === "web"
            ? { uri: affirmation?.image?.uri || "" }
            : affirmation?.image;

    return (
        <View style={styles.container}>
            <ImageBackground
                source={imageSource}
                resizeMode="cover"
                style={styles.imageBackground}
            >
                <AppGradient colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.9)"]}>
                    <Pressable
                        onPress={() => router.back()}
                        style={styles.backButton}
                    >
                        <AntDesign name="leftcircleo" size={50} color="white" />
                    </Pressable>

                    <ScrollView
                        style={styles.scrollView}
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >
                        {sentences.map((sentence, idx) => (
                            <Text style={styles.text} key={idx}>
                                {sentence}.
                            </Text>
                        ))}
                    </ScrollView>
                </AppGradient>
            </ImageBackground>
        </View>
    );
};

export default AffirmationPractice;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
        flex: 1,
    },
    backButton: {
        position: "absolute",
        top: Platform.OS === "web" ? 40 : 64,
        left: 16,
        zIndex: 10,
    },
    scrollView: {
        marginTop: Platform.OS === "web" ? 60 : 80,
        flex: 1,
    },
    scrollContent: {
        justifyContent: "center",
        paddingBottom: 20,
    },
    text: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 16,
    },
});
