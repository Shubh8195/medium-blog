import { Link } from "react-router-dom";
import featuredImg from "../assets/featured_img.webp";
import Avatar from "./Avatar";

interface BlogCardProps {
  title: string;
  content: string;
  publishedDate: string;
  authorname: string;
  blogid: string;
}
const BlogCard = ({
  title,
  content,
  publishedDate,
  authorname,
  blogid,
}: BlogCardProps) => {
  return (
    <div className="flex flex-col w-full p-2 gap-2 border-b ">
      <div className="flex gap-2 items-center">
        <Avatar authorname={authorname} />
        <p className="text-black font-semibold">{authorname}</p>
        <div className="h-1 w-1 rounded-full bg-slate-400"></div>
        <p className="text-slate-600">{publishedDate}</p>
      </div>
      <div className="flex justify-between gap-10">
        <div className="basis-3/4 flex flex-col justify-between">
          <div>
            <Link to={`/blog/${blogid}`} className="font-extrabold text-base sm:text-lg md:text-2xl">
              {title}
            </Link>
            <div className="hidden md:block mt-2">
              {content.slice(0, 500) + "..."}
            </div>
          </div>
          <div>{Math.ceil(content.length / 100) + " minutes"}</div>
        </div>
        <div className="basis-1/4 md:max-w-[300px] min-w-[100px] sm:min-w-[200px]">
          <img src={featuredImg} alt="featuredImg" className="" />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
