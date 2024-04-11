import Avatar from "./Avatar";

const AppBar = () => {
  return (
    <div className="flex justify-between items-center border-b px-10 py-3">
      <div className="font-bold text-2xl">Medium</div>
      <Avatar authorname="Peter" size={12}/>
    </div>
  );
};

export default AppBar;
