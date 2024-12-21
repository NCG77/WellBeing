import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { colors } from "../../../constants/Colors";
import SongCardwithcategory from "../../../components/Musicomp/SongCardwithcategory";
import Floatingplayer from "../../../components/Musicomp/Floatingplayer";
import { SongswithCategory } from "../../../data/songswithcategory";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={SongswithCategory}
        renderItem={({ item }) => <SongCardwithcategory item={item} />}
        contentContainerStyle={{
          paddingBottom: 0,
        }}
      />
      <Floatingplayer item={{ SongswithCategory }} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
});
