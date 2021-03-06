import React from "react";

import { ItemProps } from "./types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfinity } from "@fortawesome/free-solid-svg-icons";

import "./Item.scss";

const Item: React.FC<ItemProps> = ({ node, onMouseDown, onMouseEnter, onMouseLeave, onMouseUp}) => {

    const {
        isFinish,
        isStart,
        isVisited,
        isOnPath,
        rowID,
        colID,
        distance,
        f,
    } = node;

    const itemType = isFinish
        ? "itemFinish"
        : isStart
        ? "itemStart"
        : isOnPath
        ? "itemOnPath"
        : isVisited
        ? "itemVisited"
        : "";

    return (
        <div
            className='gridSquare'
            onMouseDown={() => onMouseDown({ rowID, colID })}
            onMouseEnter={() => onMouseEnter({ rowID, colID })}
            onMouseLeave={() => onMouseLeave({ rowID, colID })}
            onMouseUp={() => onMouseUp({ rowID, colID })}
        >
            <div className={`item ${itemType}`} id={`${colID}, ${rowID}`}>
                <p className='distance'>
                    {isVisited ? (
                        f !== Infinity && f !== undefined ? (
                            f
                        ) : (
                            distance
                        )
                    ) : (
                        <FontAwesomeIcon icon={faInfinity} size='sm' />
                    )}
                </p>
            </div>
        </div>
    );
}

export default Item;