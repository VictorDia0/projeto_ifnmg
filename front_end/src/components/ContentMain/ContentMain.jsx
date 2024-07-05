
import "./ContentMain.css";
import ListTable from "../ListTable/ListTable";
import InfoCards from "../InfoCards/InfoCards"

export const ContentMain = () => {
  return (
    <div className="main-content-holder">
      <InfoCards />
      <hr></hr>
      <ListTable />
    </div>
  );
};
export default ContentMain;
