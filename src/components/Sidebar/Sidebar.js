import React from "react";

// CSS
import "./Sidebar.scss";

export default function Sidebar() {
    return (
        <div className='sidebar'>
            <header className='header'>
                <h1 className='title'>Pathfinding Visualisation</h1>
            </header>
            <div className='stats'></div>
            <div className='controls'>
                <button>Clear</button>
                <button>Start</button>
            </div>
        </div>
    );
}
