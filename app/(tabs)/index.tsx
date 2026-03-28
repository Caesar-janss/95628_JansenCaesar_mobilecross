import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, Text, ScrollView } from "react-native";
import Animated, { SlideInLeft, SlideInRight, SlideInDown } from "react-native-reanimated";
import UserList from "./userList"; 

export default function App() {
  const [screenData, setScreenData] = useState(Dimensions.get("window"));
  const [orientation, setOrientation] = useState("portrait");

  useEffect(() => {
    const updateLayout = ({ window }: { window: any }) => {
      setScreenData(window);
      setOrientation(window.width < window.height ? "portrait" : "landscape");
    };

    const subscription = Dimensions.addEventListener("change", updateLayout);
    return () => subscription?.remove();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.View entering={SlideInLeft}>
        <Text>Screen width: {screenData.width}</Text>
      </Animated.View>

      <Animated.View entering={SlideInRight}>
        <Text>Screen height: {screenData.height}</Text>
      </Animated.View>

      <Animated.View entering={SlideInDown}>
        <Text>Orientation: {orientation}</Text>
      </Animated.View>

      <View style={styles.separator} />

      <UserList />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    height: 1,
    width: "80%",
    backgroundColor: "#ccc",
    marginVertical: 20,
  },
});