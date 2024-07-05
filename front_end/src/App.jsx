
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Login from "../src/components/login/Login";
// import AdminDashboard from "../src/layout/Content/Content";
import Content from "../src/layout/Content/Content";
import Sidebar from "../src/layout/Sidebar/Sidebar";
// import UserDashboard from "../src/components/loginrd";

function App() {
  return (
    <div className="app">
      <Content />
      <Sidebar />

    </div>
    
  );
}

export default App;
