import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Text, Avatar } from "react-native-paper";
import userData from "../data.json";

export default function App() {
  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ title: "User List - Paper Version" }} />
      <ScrollView contentContainerStyle={styles.container}>
        {userData.map((users, index) => (
          <Card key={index} style={styles.card} mode="elevated">
            <Card.Title
              title={users.name}
              subtitle={users.email}
              left={(props) => (
                <Avatar.Image {...props} source={{ uri: users.photo_url }} />
              )}
            />
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    padding: 16,
    alignItems: "center",
  },
  card: {
    width: "100%",
    maxWidth: 350,
    marginBottom: 12,
  },
});