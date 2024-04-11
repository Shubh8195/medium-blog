interface AvatarProps {
  authorname: string;
  size?: number;
}

const Avatar = ({ authorname, size = 8 }: AvatarProps) => {
  return (
    <div
      className={`w-${size} h-${size} rounded-full bg-slate-500 flex justify-center items-center text-white`}
    >
      <div>{authorname.slice(0, 1)}</div>
    </div>
  );
};

export default Avatar;
