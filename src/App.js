import React from "react";

import Sidebar from "./components/Sidebar/Sidebar";
import Board from "./components/Board/Board";

// CSS
import "./App.scss";

function App() {
    return (
        <div className='App'>
            <Sidebar />
            <Board />
        </div>
    );
}

export default App;
