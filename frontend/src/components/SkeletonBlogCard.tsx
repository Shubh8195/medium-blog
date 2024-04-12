const SkeletonBlogCard = () => {
  return (
    <div
      role="status"
      className="animate-pulse px-4 flex flex-col gap-4 w-full md:w-[80%] items-center mx-auto mt-5"
    >
      <div className="flex flex-col w-full p-2 gap-2 border-b">
        <div className="flex gap-2 items-center">
          <div className="w-8 h-8 rounded-full bg-slate-400 flex justify-center items-center"></div>
          <p className="w-28 h-4 bg-slate-400 rounded-lg"></p>
          <div className="h-1 w-1 rounded-full bg-slate-400"></div>
          <p className="w-28 h-4 bg-slate-400 rounded-lg"></p>
        </div>
        <div className="flex justify-between gap-10">
          <div className="basis-3/4 flex flex-col justify-between">
            <div>
              <div className="w-full h-8 rounded-lg bg-slate-400 "></div>
              <div className="hidden w-full h-28 bg-slate-400 rounded-lg md:block mt-2"></div>
            </div>
            <div className="mt-3 w-32 h-4 bg-slate-400 rounded-lg"></div>
          </div>
          <div className="basis-1/4 md:max-w-[300px] min-w-[100px] sm:min-w-[200px] w-full h-[151px] bg-slate-400 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonBlogCard;
