import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated,
  useColorScheme,
  Linking,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chats = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const theme = useColorScheme() ?? "light";

  const ApiKey =
    Constants.expoConfig?.extra?.groqApiKey ||
    Constants.manifest?.extra?.groqApiKey;

  useEffect(() => {
    setMessages([
      {
        role: "system",
        content:
          "You are Joi, an empathetic and helpful AI therapist (Gender: Female). Provide thoughtful and supportive responses. Try to add Indian context wherever possible. You could also ask for preferred language to give better responses and help people as much as possible. And if the user asks for the video then try to give a youtube or blog link.",
      },
      {
        role: "assistant",
        content:
          "Hello! I'm Joi, your AI Therapist. How can I assist you today?",
      },
    ]);
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [messages]);

  const truncateConversation = (conversation: Message[], maxTokens = 2048) => {
    let tokenCount = 0;
    const truncated: Message[] = [];
    for (let i = conversation.length - 1; i >= 0; i--) {
      const message = conversation[i];
      const messageTokens = message.content.split(" ").length;
      if (tokenCount + messageTokens > maxTokens) break;
      truncated.unshift(message);
      tokenCount += messageTokens;
    }
    return truncated;
  };

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    scrollViewRef.current?.scrollToEnd({ animated: true });

    try {
      const truncatedHistory = truncateConversation([...messages, userMessage]);
      const aiResponseText = await getChatCompletion(truncatedHistory);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            aiResponseText.trim() ||
            "I'm here for you. Please share more details.",
        },
      ]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getChatCompletion = async (conversation: Message[]) => {
    if (!ApiKey) return "Error: API Key is missing!";

    try {
      const response = await fetch(
        "https://api.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ApiKey}`,
          },
          body: JSON.stringify({
            model: "llama3-8b-8192",
            messages: conversation,
            temperature: 0.7,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error?.message || "Unknown error occurred");

      return data.choices[0]?.message?.content || "No response from AI.";
    } catch (error) {
      console.error("Fetch Error:", error);
      return "Sorry, something went wrong. Please try again.";
    }
  };

  const formatMessageContent = (content: string) => {
    // Regex to detect links
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    return content.split(urlRegex).map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <Text
            key={index}
            style={styles.link}
            onPress={() =>
              Linking.openURL(part).catch((err) =>
                console.error("Error opening link:", err)
              )
            }
          >
            {part}
          </Text>
        );
      }
      return <Text key={index}>{part}</Text>;
    });
  };

  return (
    <View
      style={[
        styles.overlay,
        { paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 },
      ]}
    >
      <KeyboardAvoidingView
        style={[
          styles.container,
          {
            backgroundColor: theme === "light" ? "#f2f2f2" : "#222",
          },
        ]}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Animated.ScrollView
          ref={scrollViewRef}
          style={{ opacity: fadeAnim }}
          contentContainerStyle={styles.messageContainer}
        >
          {messages
            .filter((message) => message.role !== "system")
            .map((message, index) => (
              <View
                key={index}
                style={
                  message.role === "user"
                    ? styles.userMessage
                    : styles.aiMessage
                }
              >
                {formatMessageContent(message.content)}
              </View>
            ))}
        </Animated.ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type your message"
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={sendMessage}
            disabled={loading}
          >
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#8A2BE2" />
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1 },
  container: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  messageContainer: { paddingVertical: 10 },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#8A2BE2",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: "75%",
  },
  aiMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#ccc",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: "75%",
  },
  boldText: { fontWeight: "bold" },
  link: { color: "#1E90FF", textDecorationLine: "underline" },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#fff",
  },
  sendButton: {
    backgroundColor: "#8A2BE2",
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
  },
  loadingContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -15 }, { translateY: -15 }],
  },
});

export default Chats;
