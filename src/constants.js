export const START_NODE_ROW = 10;
export const START_NODE_COL = 5;
export const FINISH_NODE_ROW = 10;
export const FINISH_NODE_COL = 15;

export const DIJKSTRA = "DIJKSTRA";
export const ASTAR = "ASTAR";

const gridRows = 21;
const gridCols = 21;

export const grid = [];
for (let rowID = 0; rowID < gridRows; rowID++) {
    grid[rowID] = [];
    for (let colID = 0; colID < gridCols; colID++) {
        grid[rowID][colID] = {
            colID: colID,
            rowID: rowID,
            isStart:
                rowID === START_NODE_ROW &&
                colID === START_NODE_COL,
            isFinish:
                rowID === FINISH_NODE_ROW &&
                colID === FINISH_NODE_COL,
            isWall: false,
            isVisited: false,
            isOnPath: false,
            distance: Infinity,
            h: Infinity,
            f: Infinity,
            previousNode: null,
        };
    }
}
