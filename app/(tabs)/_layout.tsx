import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="addPost" options={{ title: "Add Post" }} />
        <Stack.Screen name="postdetail" options={{ title: "Post Detail" }} />
      </Stack>
    </PaperProvider>
  );
}