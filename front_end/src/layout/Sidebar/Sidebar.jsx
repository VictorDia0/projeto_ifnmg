import "./Sidebar.css"

import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../../context/sidebarContext"

import { FaUsersGear, FaMoneyCheckDollar, FaGear, FaHouse, FaArrowRightFromBracket, FaAddressCard } from "react-icons/fa6";

const Sidebar = () => {
  // const [activeLinkIdx] = useState(1);
  const [sidebarClass, setSidebarClass] = useState("")
  const { isSidebarOpen } = useContext(SidebarContext);

  useEffect(() => {
    if (isSidebarOpen) {
      setSidebarClass('sidebar-change')
    } else {
      setSidebarClass('');
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
            <a to="/" className="nav-link active">
              <FaHouse className="nav-link-icon" />
              <span className="nav-link-text">
                Home
              </span>
            </a>
          </li>
          <li className="nav-item" key="" >
            <a to="/Customers" className="nav-link">
              <FaAddressCard className="nav-link-icon" />
              <span className="nav-link-text">
                Alunos
              </span>
            </a>
          </li>
          <li className="nav-item" key="" >
            <a to="/Budget" className="nav-link">
              <FaMoneyCheckDollar className="nav-link-icon" />
              <span className="nav-link-text">
                Refeição
              </span>
            </a>
          </li>
          <li className="nav-item" key="" >
            <a to="/Employee" className="nav-link">
              <FaUsersGear className="nav-link-icon" />
              <span className="nav-link-text">
                Relatórios
              </span>
            </a>

          </li>

          <li className="nav-item" key="" >

            <a to="/Settings" className="nav-link">
              <FaGear className="nav-link-icon" />
              <span className="nav-link-text">
                Settings
              </span>
            </a>

          </li>
        </ul>
      </nav>
      <div className="logout">
        <li className="nav-item" key="" >
          <a to="/" className="nav-link">
            <FaArrowRightFromBracket className="nav-link-icon" />
            <span className="nav-link-text underline-none" id='text-underline-none'>
              logout
            </span>
          </a>
        </li>
      </div>
    </div>
  )
}

export default Sidebar