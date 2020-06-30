import React from "react";

import Item from "../Item/Item";

import { KEYS, INIT_BOARD } from "../../constants";

// CSS
import "./Board.scss";

export default function Board() {
    console.log(INIT_BOARD);
    return (
        <div className='board'>
            {INIT_BOARD.map((row, rowID) => (
                <div className='boardRow' key={rowID}>
                    {row.map((col, colID) => (
                        <Item
                            rowID={rowID}
                            colID={colID}
                            key={KEYS[rowID][colID]}
                        />
                    ))}
                    <br />
                </div>
            ))}
        </div>
    );
}
