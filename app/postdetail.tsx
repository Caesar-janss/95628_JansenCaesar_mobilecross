import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  ScrollView,
  Text,
  View,
} from "react-native";
import {
  getPostDetail,
  getUser,
  getComments,
} from "../service/api";

export default function PostDetail() {
  const { id } = useLocalSearchParams();

  const [post, setPost] = useState<any>({});
  const [user, setUser] = useState<any>({});
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    fetchDetail();
  }, []);

  const fetchDetail = async () => {
    const postData = await getPostDetail(Number(id));
    const userData = await getUser(postData.userId);
    const commentData = await getComments(Number(id));

    setPost(postData);
    setUser(userData);
    setComments(commentData);
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        {post.title}
      </Text>

      <Text style={{ marginTop: 10 }}>{post.body}</Text>

      <Text style={{ marginTop: 20, fontWeight: "bold" }}>
        Author:
      </Text>
      <Text>{user.name}</Text>

      <Text style={{ marginTop: 20, fontWeight: "bold" }}>
        Comments:
      </Text>

      {comments.map((c) => (
        <View
          key={c.id}
          style={{
            marginTop: 10,
            borderBottomWidth: 1,
            paddingBottom: 10,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>{c.email}</Text>
          <Text>{c.body}</Text>
        </View>
      ))}
    </ScrollView>
  );
}