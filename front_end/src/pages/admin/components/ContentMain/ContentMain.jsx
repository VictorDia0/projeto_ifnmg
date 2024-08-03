
import { Routes,Route } from "react-router-dom";
import "./ContentMain.css";
import Home from "../../pages/admin/Home";
import Users from "../../Users/Users";
import Meals from "../../Meals/Meals";
import { Reports } from "../../pages/admin/Reports/Reports";
import Settings from "../../pages/admin/Settings/Settings";

export const ContentMain = () => {
  return (
    <div className="main-content-holder">
      <Routes>
        <Route path="/home" element={<Home />}/>
        <Route path="/Users" element={<Users />}/>
        <Route path="/Meals" element={<Meals />}/>
        <Route path="/Reports" element={<Reports />}/>
        <Route path="/Settings" element={<Settings />}/>
      </Routes>
    </div>
  );
};
export default ContentMain;
