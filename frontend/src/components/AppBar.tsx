import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const AppBar = () => {
  return (
    <div className="flex justify-between items-center border-b px-10 py-3">
      <Link to={"/blogs"} className="font-bold text-2xl">Medium</Link>
      <div className="flex justify-center items-center gap-3">
        <Link to={"/publish"} className="text-white  bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-1.5 text-center  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          Add Blog
        </Link>
        <Avatar authorname="Peter" size={"w-12 h-12"} />
      </div>
    </div>
  );
};

export default AppBar;
