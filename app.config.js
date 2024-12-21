import 'dotenv/config';

export default {
    expo: {
        name: "MentalHealthApp",
        slug: "mental-health-app",
        version: "1.0.0",
        platforms: ["ios", "android", "web"],
        splash: {
            "image": "./assets/simpleMeditationLogo.png",
            "resizeMode": "contain",
            "backgroundColor": "#ffffff"
        },
        extra: {
            groqApiKey: process.env.GROQ_API_KEY || "Your ai api key here",
        },
        web: {
            config: {
                extra: {
                    groqApiKey: process.env.GROQ_API_KEY || "Your ai api key here",
                },
            },
        },
        "plugins": [
            "expo-router",
            "expo-font",
            "expo-asset",
            "expo-sqlite"
        ],
    },
};
