import React from "react";
import { Provider } from "./Provider";

// import Nav from "./components/Nav/Nav";
import Board from "./components/Board/Board";
import Footer from "./components/Footer/Footer";

// CSS
import "./App.scss";

function App() {
    return (
        <Provider>
            <div className='App'>
                <Board />
                <Footer />
            </div>
        </Provider>
    );
}

export default App;
