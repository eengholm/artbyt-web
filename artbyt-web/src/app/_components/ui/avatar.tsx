type Props = {
  name: string;
  picture: string | null;
};

const Avatar = ({ name, picture }: Props) => {
  return (
    <div className="flex items-center">
      {picture ? (
        <img src={picture} className="w-12 h-12 rounded-full mr-4" alt={name} />
      ) : (
        <div className="w-12 h-12 rounded-full mr-4 bg-neutral-300 flex items-center justify-center text-neutral-500">
          {name.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
};

export default Avatar;
