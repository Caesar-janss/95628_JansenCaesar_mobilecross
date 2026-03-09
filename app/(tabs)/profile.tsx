import { View, Text, Image, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@email.com",
    age: 21,
    image: require("../../assets/images/john.png")
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@email.com",
    age: 22,
    image: require("../../assets/images/jane.png")
  },
  {
    id: 3,
    name: "Rafi",
    email: "rafi@email.com",
    age: 23,
    image: require("../../assets/images/rafi.png")
  },
  {
    id: 4,
    name: "Farion",
    email: "farion@email.com",
    age: 24,
    image: require("../../assets/images/farion.png")
  }
];

export default function Profile() {
  const { id } = useLocalSearchParams();

  const user = users.find((u) => u.id === Number(id));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>

      <Image source={user?.image} style={styles.image} />

      <Text>ID: {user?.id}</Text>
      <Text>Name: {user?.name}</Text>
      <Text>Email: {user?.email}</Text>
      <Text>Age: {user?.age}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 60,
  },
});