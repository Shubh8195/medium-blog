import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import AppBar from "../components/AppBar";
import Avatar from "../components/Avatar";

const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog(id ?? " ");

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(blog);
  return (
    <>
      <AppBar />
      <div className="grid grid-cols-12 w-full md:w-[80%] mx-auto mt-10 p-5">
        <div className="col-span-8 flex flex-col gap-3">
          <div className="text-5xl font-extrabold">{blog?.title}</div>
          <div className="text-slate-500">Posted on August 24, 2023</div>
          <div>{blog?.content}</div>
        </div>
        <div className="col-span-4">
          <div>Author</div>
          <div className="flex gap-2 mt-2">
            <Avatar authorname={blog?.author?.name} />
            <div className="basis-3/4">
              <div className="font-bold capitalize">{blog?.author.name}</div>
              <div>
                Master of mirth, purveyour of puns, and the funniest person in
                the kingdom
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
