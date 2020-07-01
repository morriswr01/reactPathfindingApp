import React from "react";

import "./Item.scss";

export default function Item(props) {
    const { isFinish, isStart, isVisited, isOnPath } = props;

    const itemType = isFinish
        ? "itemFinish"
        : isStart
        ? "itemStart"
        : isOnPath
        ? "itemOnPath"
        : isVisited
        ? "itemVisited"
        : // : isWall
          // ? "itemWall"
          "";

    return <div className={`item ${itemType}`}></div>;
}
