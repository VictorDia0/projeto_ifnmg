import React from 'react'
import "./App.css"
import Sidebar from "../src/layout/Sidebar/Sidebar";
import Content from "../src/layout/Content/Content"



const MainAdm = () => {
  return (
        <div className="app">
            <Sidebar />
            <Content />
        </div>

  )
}

export default MainAdm