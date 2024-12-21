import React, { useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import "react-native-reanimated";

// Firebase configuration
const firebaseConfig = {
  apiKey: "Your API Key",
  authDomain: "projectid.firebaseapp.com",
  databaseURL: "https://projectid.firebaseio.com",
  projectId: "projectid",
  storageBucket: "projectid.appspot.com",
  messagingSenderId: "sender-id",
  appId: "app-id",
  measurementId: "G-measurement-id",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const theme = {
  colors: {
    primary: "#2E7D32",
    secondary: "#1B5E20",
    backgroundOverlay: "#75a674",
    cardBackground: "#FFFFFF",
  },
};

const SignupScreen: React.FC = () => {
  const navigation = useNavigation();
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);

  const onSignUpPressed = async () => {
    // Validation
    if (!name.value.trim()) {
      setName({ ...name, error: "Name is required" });
      return;
    }
    if (!email.value.trim()) {
      setEmail({ ...email, error: "Email is required" });
      return;
    }
    if (!password.value.trim() || password.value.length < 6) {
      setPassword({
        ...password,
        error: "Password must be at least 6 characters",
      });
      return;
    }

    setLoading(true);
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );

      // Update user profile with name
      await updateProfile(userCredential.user, { displayName: name.value });

      Alert.alert(
        "Account Created",
        `Welcome, ${name.value}! Your account has been created successfully.`
      );

      // Navigate to the login screen or app dashboard
      navigation.navigate("index"); // Replace with the appropriate screen
    } catch (error) {
      Alert.alert("Sign-Up Failed", (error as any).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/images/Background2.jpg")}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Image
            source={require("../assets/images/Logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.header}>Create Your Account</Text>
          <TextInput
            style={styles.input}
            label="Name"
            returnKeyType="next"
            value={name.value}
            onChangeText={(text) => setName({ value: text, error: "" })}
            error={!!name.error}
          />
          {name.error ? (
            <Text style={styles.errorText}>{name.error}</Text>
          ) : null}

          <TextInput
            style={styles.input}
            label="Email"
            returnKeyType="next"
            value={email.value}
            onChangeText={(text) => setEmail({ value: text, error: "" })}
            autoCapitalize="none"
            autoComplete="email"
            textContentType="emailAddress"
            keyboardType="email-address"
            error={!!email.error}
          />
          {email.error ? (
            <Text style={styles.errorText}>{email.error}</Text>
          ) : null}

          <TextInput
            style={styles.input}
            label="Password"
            returnKeyType="done"
            value={password.value}
            onChangeText={(text) => setPassword({ value: text, error: "" })}
            secureTextEntry
            error={!!password.error}
          />
          {password.error ? (
            <Text style={styles.errorText}>{password.error}</Text>
          ) : null}

          <Button
            mode="contained"
            onPress={onSignUpPressed}
            loading={loading}
            disabled={loading}
            style={styles.button}
            contentStyle={{ backgroundColor: theme.colors.primary }}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>

          <View style={styles.row}>
            <Text>I already have an account! </Text>
            <TouchableOpacity onPress={() => navigation.navigate("index")}>
              <Text style={styles.link}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: theme.colors.cardBackground,
    padding: 20,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    width: 200,
    height: 150,
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    color: theme.colors.primary,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    marginBottom: 10,
    backgroundColor: theme.colors.backgroundOverlay,
  },
  row: {
    flexDirection: "row",
    marginTop: 10,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  button: {
    marginTop: 16,
    width: "100%",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
  },
});

export default SignupScreen;
