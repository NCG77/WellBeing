import React from "react";
import { PlaybackProvider } from "@/hooks/useSetupTrackPlayer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import PlayerScreen from "./PlayerScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/Colors";

const Stack = createNativeStackNavigator();

const AffirmationsLayout = () => {
  return (
    <NavigationIndependentTree>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <GestureHandlerRootView>
          <NavigationContainer>
            <PlaybackProvider>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="Offline_Songs" component={HomeScreen} />
                <Stack.Screen name="Player_Screen" component={PlayerScreen} />
              </Stack.Navigator>
            </PlaybackProvider>
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaView>
    </NavigationIndependentTree>
  );
};

export default AffirmationsLayout;
