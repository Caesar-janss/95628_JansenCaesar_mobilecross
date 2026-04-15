import axios from "axios";

const API = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// GET semua posts
export const getPosts = async () => {
  const res = await API.get("/posts");
  return res.data;
};

// GET detail post
export const getPostDetail = async (id: number) => {
  const res = await API.get(`/posts/${id}`);
  return res.data;
};

// GET user
export const getUser = async (userId: number) => {
  const res = await API.get(`/users/${userId}`);
  return res.data;
};

// GET comments
export const getComments = async (postId: number) => {
  const res = await API.get(`/posts/${postId}/comments`);
  return res.data;
};

// POST data
export const postData = async (data: any) => {
  const res = await API.post("/posts", data);
  return res.data;
};