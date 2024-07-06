import { useContext } from "react";
import ContentTop from "../../components/ContentTop/ContentTop";
import ContentMain from "../../components/ContentMain/ContentMain";
import { SidebarContext } from "../../context/sidebarContext";
import "./Content.css";


const Content = () => {
  const { isSidebarExpanded } = useContext(SidebarContext);
  
  return (
    <div className={`main-content ${isSidebarExpanded ? '' : 'collapsed'}`}>
      <ContentTop />
      <ContentMain />
    </div>
  );
};

export default Content;
