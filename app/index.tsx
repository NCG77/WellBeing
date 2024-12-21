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
import { SplashScreen, useRouter } from "expo-router";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

SplashScreen.preventAutoHideAsync();

const firebaseConfig = {
  apiKey: "api key",
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

const LoginScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);

  const onLoginPressed = async () => {
    if (!email.value) {
      setEmail({ ...email, error: "Email is required" });
      return;
    }
    if (!password.value) {
      setPassword({ ...password, error: "Password is required" });
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );
      const user = userCredential.user;

      // Fetch user's displayName
      const userName = user.displayName || "User"; // Fallback to 'User' if displayName is null
      Alert.alert("Login Successful", `Welcome back, ${userName}!`);
      router.push("/nature-meditate");
    } catch (error) {
      const errorMessage = (error as Error).message;
      Alert.alert("Login Failed", errorMessage);
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

          <Text style={styles.header}>Welcome Back!</Text>
          <TextInput
            style={styles.input}
            label="Email"
            value={email.value}
            onChangeText={(text) => setEmail({ value: text, error: "" })}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Email"
            error={!!email.error}
          />
          {email.error ? (
            <Text style={styles.errorText}>{email.error}</Text>
          ) : null}

          <TextInput
            style={styles.input}
            label="Password"
            value={password.value}
            onChangeText={(text) => setPassword({ value: text, error: "" })}
            secureTextEntry
            placeholder="Password"
            error={!!password.error}
          />
          {password.error ? (
            <Text style={styles.errorText}>{password.error}</Text>
          ) : null}

          <View style={styles.forgotPassword}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ResetPasswordScreen")}
            >
              <Text style={styles.forgot}>Forgot your password?</Text>
            </TouchableOpacity>
          </View>

          <Button
            mode="contained"
            onPress={onLoginPressed}
            loading={loading}
            disabled={loading}
            style={styles.button}
            contentStyle={{ backgroundColor: theme.colors.primary }}
          >
            {loading ? "Logging In..." : "Next"}
          </Button>

          <View style={styles.row}>
            <Text>You do not have an account yet? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignupScreen")}
            >
              <Text style={styles.link}>Create!</Text>
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
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    marginTop: 10,
  },
  forgot: {
    fontSize: 13,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  button: {
    marginTop: 10,
    width: "100%",
    color: theme.colors.primary,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
  },
});

export default LoginScreen;
