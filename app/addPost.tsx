import { useState } from "react";
import { useRouter } from "expo-router";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { postData } from "../service/api";

export default function AddPost() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async () => {
    const newPost = {
      title,
      body,
      userId: 1,
    };

    await postData(newPost);

    alert("Post berhasil ditambahkan!");
    router.back();
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Add New Post
      </Text>

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          marginTop: 10,
          padding: 10,
          borderRadius: 8,
        }}
      />

      <TextInput
        placeholder="Body"
        value={body}
        onChangeText={setBody}
        style={{
          borderWidth: 1,
          marginTop: 10,
          padding: 10,
          borderRadius: 8,
        }}
      />

      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          marginTop: 15,
          padding: 12,
          backgroundColor: "green",
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Submit
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          marginTop: 10,
          padding: 12,
          backgroundColor: "red",
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Cancel
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}   