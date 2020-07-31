import React from "react";

import "./Key.scss";

export default function Key() {
    return (
        <div className='key'>
            <div className='keyItem'>
                <span className='gridItemStart'></span> <p>Start</p>
            </div>
            <div className='keyItem'>
                <span className='gridItemFinish'></span> <p>Finish</p>
            </div>
            <div className='keyItem'>
                <span className='gridItemOnPath'></span> <p>Chosen Path</p>
            </div>
            <div className='keyItem'>
                <span className='gridItemVisited'></span> <p>Visited</p>
            </div>
            <div className='keyItem'>
                <span className='gridItemWall'></span> <p>Wall</p>
            </div>
            <div className='keyItem'>
                <span className='gridItem'></span> <p>Unvisited</p>
            </div>
        </div>
    );
}
