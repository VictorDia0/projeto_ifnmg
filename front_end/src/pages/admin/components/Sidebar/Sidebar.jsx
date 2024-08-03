import "./Sidebar.css"

import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../context/sidebarContext"
import { Link }  from "react-router-dom";
import { FaUsersGear, FaMoneyCheckDollar, FaGear, FaHouse, FaArrowRightFromBracket, FaAddressCard } from "react-icons/fa6";

const Sidebar = () => {
  const [sidebarClass, setSidebarClass] = useState("");
  const { isSidebarOpen } = useContext(SidebarContext);

  console.log("Sidebar->"+isSidebarOpen);
  useEffect(() => {
    if (isSidebarOpen) {
      setSidebarClass("collapsed ");
    } else {
      setSidebarClass(' ');
    }
  }, [isSidebarOpen]);


  return (
    <div className={`sidebar ${sidebarClass}`}>
      <div className="user-info">
        <div className="info-img img-fit-cover">
          <img src="" alt="profile image" />
        </div>
        <span className="info-name">IFFood</span>
      </div>
      <nav className="navigation">
        <ul className="nav-list">
          <li className="nav-item" key="" >
            <Link to="/home" className="nav-link active">
              <FaHouse className="nav-link-icon" />
              <span className="nav-link-text">
                Home
              </span>
            </Link>
          </li>
          <li className="nav-item" key="" >
            <Link to="/Users" className="nav-link">
              <FaAddressCard className="nav-link-icon" />
              <span className="nav-link-text">
                Alunos
              </span>
            </Link>
          </li>
          <li className="nav-item" key="" >
            <Link to="/Meals" className="nav-link">
              <FaMoneyCheckDollar className="nav-link-icon" />
              <span className="nav-link-text">
                Refeição
              </span>
            </Link>
          </li>
          <li className="nav-item" key="" >
            <Link to="/Reports" className="nav-link">
              <FaUsersGear className="nav-link-icon" />
              <span className="nav-link-text">
                Relatórios
              </span>
            </Link>

          </li>

          <li className="nav-item" key="" >

            <Link to="/Settings" className="nav-link">
              <FaGear className="nav-link-icon" />
              <span className="nav-link-text">
                Settings
              </span>
            </Link>

          </li>
        </ul>
      </nav>
      <div className="logout">
        <li className="nav-item" key="" >
          <Link to="/" className="nav-link">
            <FaArrowRightFromBracket className="nav-link-icon" />
            <span className="nav-link-text underline-none" id='text-underline-none'>
              logout
            </span>
          </Link>
        </li>
      </div>
    </div>
  )
}

export default Sidebar