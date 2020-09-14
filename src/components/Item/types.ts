import Node from "../../utils/interfaces/Node";
import ItemCoordinates from "../../utils/interfaces/ItemCoordinates";

export interface ItemProps {
    node: Node;
    onMouseDown(coords: ItemCoordinates): void;
    onMouseEnter(coords: ItemCoordinates): void;
    onMouseLeave(coords: ItemCoordinates): void;
    onMouseUp(coords: ItemCoordinates): void;
}
