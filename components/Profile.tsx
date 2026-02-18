import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ProfileProps {
  name: string;
  age: number;
}

const Profile: React.FC<ProfileProps> = ({ name, age }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Halo, nama saya {name} dan umur saya {age} tahun.
      </Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
});