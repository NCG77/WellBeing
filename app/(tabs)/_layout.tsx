import { Entypo, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

import React from "react";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

const Page = () => {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme ?? "dark"].tint,
      }}
    >
      <Tabs.Screen
        name="affirmations"
        options={{
          tabBarLabel: "Yoga",
          tabBarIcon: ({ color, focused }) => (
            <Entypo
              name={focused ? "open-book" : "book"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Music"
        options={{
          title: "Music",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "music" : "music-note-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="nature-meditate"
        options={{
          tabBarLabel: "Meditate",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "flower-tulip" : "flower-tulip-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="JoiAI"
        options={{
          title: "Joi AI",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "chatbubbles" : "chatbubbles-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "cog" : "cog-outline"}
              color={color || "gray"}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default Page;
