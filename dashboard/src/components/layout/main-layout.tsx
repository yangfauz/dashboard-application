import Sidebar from "./sidebar/sidebar";
import Header from "./header/header";
import Content from "./content/content";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      {/* <div className="w-full bg-red-200 px-[15px] h-[10vh]">asd</div> */}
      <Header />
      <div className="flex flex-auto min-h-0">
        <Sidebar />
        <Content>{children}</Content>
      </div>
    </div>
  );
};

export default MainLayout;
