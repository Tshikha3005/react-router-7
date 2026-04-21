// api/services/posts.ts
import { api } from "../client";

export const getPosts = () => api.get("/posts");
export const createPost = (data: any) => api.post("/posts", data);
