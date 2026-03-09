import { View, Text, StyleSheet } from "react-native";

export default function Email() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Email Page</Text>
      <Text>This is Email Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
});