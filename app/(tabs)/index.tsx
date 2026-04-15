import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { getPosts } from "../../service/api";
import {
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";

export default function Home() {
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getPosts();
    setPosts(data);
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        All Posts
      </Text>

      <TouchableOpacity
        onPress={() => router.push("/addPost")}
        style={{
          marginTop: 10,
          padding: 12,
          backgroundColor: "blue",
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Add New Post
        </Text>
      </TouchableOpacity>

      {posts.map((post) => (
        <TouchableOpacity
          key={post.id}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            marginTop: 10,
            padding: 12,
            borderRadius: 8,
          }}
          onPress={() =>
            router.push({
              pathname: "/postdetail",
              params: { id: post.id },
            })
          }
        >
          <Text style={{ fontWeight: "bold" }}>{post.title}</Text>
          <Text>{post.body}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}