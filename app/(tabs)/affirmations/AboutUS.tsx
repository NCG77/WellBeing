import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function AboutUs() {
    const colorScheme = useColorScheme();
    return (
        <ScrollView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
            <View style={styles.headerContainer}>
                <Text style={[styles.headerText, { color: Colors[colorScheme ?? 'light'].text }]}>
                    About Us
                </Text>
            </View>
            <View style={styles.contentContainer}>
                <Text style={[styles.contentText, { color: Colors[colorScheme ?? 'light'].text }]}>
                    Welcome to Joi, your personal AI therapist app designed to assist you in managing your mental health.
                    We believe in providing accessible mental health support through the use of technology, ensuring that everyone has access to the help they need.
                </Text>

                <Text style={[styles.contentText, { color: Colors[colorScheme ?? 'light'].text }]}>
                    Our mission is to create a safe space for people to express their concerns and get assistance whenever they need it.
                    Whether you're dealing with stress, anxiety, or just need someone to talk to, Joi is here to listen.
                </Text>

                <Text style={[styles.contentText, { color: Colors[colorScheme ?? 'light'].text }]}>
                    We use AI technology to ensure our users get compassionate and helpful responses.
                    Our app is designed to simulate conversations with a professional therapist, and though it is not a replacement for real therapy,
                    we hope it can be a great starting point for users seeking support.
                </Text>

                <Text style={[styles.contentText, { color: Colors[colorScheme ?? 'light'].text }]}>
                    If you have any feedback or need assistance, feel free to reach out to us. We're constantly working to improve the app and provide the best service possible.
                </Text>

                <Text style={[styles.contentText, { color: Colors[colorScheme ?? 'light'].text }]}>
                    GitHub: <Text style={{ color: 'blue' }}>github.com/your-repo</Text>
                </Text>

                <Text style={[styles.footerText, { color: Colors[colorScheme ?? 'light'].text }]}>
                    Thank you for using Joi!
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    headerContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    contentContainer: {
        flex: 1,
    },
    contentText: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 15,
    },
    footerText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
});
