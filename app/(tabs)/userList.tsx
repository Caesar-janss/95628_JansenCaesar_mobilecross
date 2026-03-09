import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

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

export default function UserList() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User List</Text>

      {users.map((user) => (
        <View key={user.id} style={styles.userBox}>
          <Text>Name: {user.name}</Text>

          <Button
            title="View Profile"
            onPress={() =>
              router.push({
                pathname: "/profile",
                params: { id: user.id }
              })
            }
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
  userBox: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
  },
});