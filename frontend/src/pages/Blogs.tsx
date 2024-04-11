import AppBar from "../components/AppBar";
import BlogCard from "../components/BlogCard";
import { useBlogs } from "../hooks";

const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AppBar />
      <div className="px-4 flex flex-col gap-4 w-full md:w-[80%] items-center mx-auto p-5">
        {blogs?.map((item) => {
          return (
            <BlogCard
              key={item.id}
              authorname={item.author.name}
              title={item.title}
              content={item.content}
              publishedDate="Dec 3, 2023"
              blogid={item.id}
            />
          );
        })}
      </div>
    </>
  );
};

export default Blogs;
