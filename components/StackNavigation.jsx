import React from "react";
import HomeScreen from "../app/(tabs)/Music/HomeScreen.Tsx";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlayerScreen from "../app/(tabs)/Music/PlayerScreen";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Offline_Songs" component={HomeScreen} />
      <Stack.Screen name="Player_Screen" component={PlayerScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
