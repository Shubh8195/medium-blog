import AppBar from "../components/AppBar";
import BlogCard from "../components/BlogCard";
import SkeletonBlogCard from "../components/SkeletonBlogCard";
import { useBlogs } from "../hooks";

const Blogs = () => {
  const { loading, blogs } = useBlogs();
  console.log(blogs);

  return (
    <>
      <AppBar />
      {loading ? (
        <>
          <SkeletonBlogCard />
          <SkeletonBlogCard />
          <SkeletonBlogCard />
        </>
      ) : (
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
      )}
    </>
  );
};

export default Blogs;
