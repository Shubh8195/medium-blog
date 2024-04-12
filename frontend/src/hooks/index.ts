import { useEffect, useState } from "react";
import { api } from "../utils/axios";
import toast from "react-hot-toast";

interface BlogResponse {
  author: { name: string };
  author_id: string;
  content: string;
  id: string;
  published: boolean;
  title: string;
}
export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<BlogResponse[]>([]);

  async function getBlogs() {
    try {
      const { data } = await api.get("/blog/bulk", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setBlogs(data);
      setLoading(false);
    } catch (error: any) {
      if (error.response.data.status === 403) {
        return toast.error(error.response.data.msg);
      }
      toast.error("Something went wrong!");
    }
  }
  useEffect(() => {
    getBlogs();
  }, []);

  return { loading, blogs };
};

export const useBlog = ( id: string ) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<BlogResponse>();

  async function getBlog(id: string) {
    try {
      const { data } = await api.get(`/blog/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setBlog(data);
      setLoading(false);
    } catch (error: any) {
      if (error.response.data.status === 403) {
        return toast.error(error.response.data.msg);
      }
      toast.error("Something went wrong!");
    }
  }
  useEffect(() => {
    getBlog(id);
  }, []);

  return { loading, blog };
};
