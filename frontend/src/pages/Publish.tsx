import { ChangeEvent, useState } from "react";
import AppBar from "../components/AppBar";
import { BlogCreateType } from "@shubh_negi/medium-types";
import toast from "react-hot-toast";
import { api } from "../utils/axios";
import { useNavigate } from "react-router-dom";

const Publish = () => {
  const navigate = useNavigate();
  const [body, setBody] = useState<BlogCreateType>({
    content: "",
    title: "",
  });

  function onChangeHandler(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setBody({
      ...body,
      [e.target.name]: e.target.value,
    });
  }

  async function createBlog() {
    try {
      const res = await api.post(`/blog`, body, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.status == 201) {
        toast.success(res.data.msg);
        navigate("/blogs");
      }
    } catch (error: any) {
      if (error.response.data.status === 403) {
        return toast.error(error.response.data.msg);
      }
      toast.error("Something went wrong!");
    }
  }

  return (
    <>
      <AppBar />
      <div className="w-full md:w-[70%] mt-10 mx-auto flex flex-col gap-3">
        <input
          name="title"
          className="w-full text-slate-500 border-[1px] border-slate-300 text-2xl border-solid p-2 rounded-lg outline-blue-500"
          placeholder="Title"
          onChange={onChangeHandler}
          required
        />
        <textarea
          name="content"
          rows={10}
          placeholder="Write an article"
          className="border-solid p-2 rounded-lg text-lg outline-blue-500 border-[1px] border-slate-300"
          onChange={onChangeHandler}
        />
        <button onClick={createBlog} className="w-32 rounded-lg bg-blue-600 hover:bg-blue-800 text-white p-2">
          Publish Post
        </button>
      </div>
    </>
  );
};

export default Publish;
