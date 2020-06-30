import React from "react";

import "./Item.scss";

export default function Item(props) {
    const { rowID, colID } = props;
    const content = rowID.toString() + "," + colID.toString();

    return <div className='boardItem'></div>;
}
