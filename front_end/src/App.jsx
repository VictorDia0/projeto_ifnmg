import Sidebar from "../src/layout/Sidebar/Sidebar";
import Content from "../src/layout/Content/Content"
import "./App.css"

const App = () => {
    return (
        <div className="app">
            <Sidebar />
            <Content />
        </div>
    );
};

export default App;