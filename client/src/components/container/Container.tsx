interface ContainerProps {
  children: React.ReactNode;
}
const Container = ({ children }: ContainerProps) => {
  return <div className="lg:px-10 px-2">{children}</div>;
};

export default Container;
