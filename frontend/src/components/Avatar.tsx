interface AvatarProps {
  authorname?: string;
  size?: string;
}

const Avatar = ({ authorname = "Anonymous", size = "w-8 h-8" }: AvatarProps) => {
  return (
    <div
      className={`${size} rounded-full bg-slate-500 flex justify-center items-center text-white`}
    >
      <div className="capitalize">{authorname.slice(0, 1)}</div>
    </div>
  );
};

export default Avatar;
