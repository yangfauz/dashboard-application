interface AuthPageLayoutProps {
  children: React.ReactNode;
}

const AuthPageLayout: React.FC<AuthPageLayoutProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen flex">
      <main className="w-full lg:w-full p-[25px] bg-white">{children}</main>
    </div>
  );
};

export default AuthPageLayout;
