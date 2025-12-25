type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return (
    <div className="container mx-auto px-5 pt-24 lg:pt-28 pb-16 lg:pb-24">
      {children}
    </div>
  );
};

export default Container;
