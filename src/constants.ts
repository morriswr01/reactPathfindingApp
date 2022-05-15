import Node from "./utils/interfaces/Node";

export const START_NODE_ROW: number = 10;
export const START_NODE_COL: number = 5;
export const FINISH_NODE_ROW: number = 10;
export const FINISH_NODE_COL: number = 15;
export const gridRows: number = 21;
export const gridCols: number = 21;

export const DIJKSTRA = "DIJKSTRA";
export const ASTAR = "ASTAR";

export const grid: Array<Array<Node>> = [];
for (let rowID: number = 0; rowID < gridRows; rowID++) {
    grid[rowID] = [];
    for (let colID = 0; colID < gridCols; colID++) {
        grid[rowID][colID] = {
            colID: colID,
            rowID: rowID,
            isStart: rowID === START_NODE_ROW && colID === START_NODE_COL,
            isFinish: rowID === FINISH_NODE_ROW && colID === FINISH_NODE_COL,
            isWall: false,
            isVisited: false,
            isOnPath: false,
            distance: Infinity,
            previousNode: null,
        };
    }
}
