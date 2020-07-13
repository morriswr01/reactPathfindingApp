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
        onMouseUp,
        distance,
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
            className={`item ${itemType}`}
            onMouseDown={() => onMouseDown(rowID, colID)}
            onMouseEnter={() => onMouseEnter(rowID, colID)}
            onMouseUp={() => onMouseUp()}
        >
            <p className='distance'>{isVisited ? distance : <FontAwesomeIcon icon={faInfinity} size="sm"/>}</p>
        </div>
    );
}
