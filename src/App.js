import React from "react";
import { Provider } from "./Provider";

// import Nav from "./components/Nav/Nav";
import Board from "./components/Board/Board";

// CSS
import "./App.scss";

function App() {
    return (
        <Provider>
            <div className='App'>
                <Board />
            </div>
        </Provider>
    );
}

export default App;
