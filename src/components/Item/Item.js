import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfinity } from "@fortawesome/free-solid-svg-icons";

import "./Item.scss";

export default function Item(props) {
    const {
        isFinish,
        isStart,
        isVisited,
        isOnPath,
        isWall,
        rowID,
        colID,
        onMouseDown,
        onMouseEnter,
        onMouseLeave,
        onMouseUp,
        distance,
        f,
    } = props;

    const itemType = isFinish
        ? "itemFinish"
        : isStart
        ? "itemStart"
        : isOnPath
        ? "itemOnPath"
        : isVisited
        ? "itemVisited"
        : isWall
        ? "itemWall"
        : "";

    return (
        <div
            className='gridSquare'
            onMouseDown={() => onMouseDown(rowID, colID)}
            onMouseEnter={() => onMouseEnter(rowID, colID)}
            onMouseLeave={() => onMouseLeave(rowID, colID)}
            onMouseUp={() => onMouseUp(rowID, colID)}
        >
            <div className={`item ${itemType}`}>
                <p className='distance'>
                    {isVisited ? (
                        // distance
                        f
                    ) : (
                        <FontAwesomeIcon icon={faInfinity} size='sm' />
                    )}
                </p>
            </div>
        </div>
    );
}
