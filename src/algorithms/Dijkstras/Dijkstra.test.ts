import Dijkstra from "./dijkstra";

import Node from "../../utils/interfaces/Node";
import {
    START_NODE_ROW,
    START_NODE_COL,
    FINISH_NODE_COL,
    FINISH_NODE_ROW,
    gridRows,
    gridCols,
} from "../../constants";

test("should accept a start and finish node and the blank grid", () => {
    const startNodeTest = {
        colID: 0,
        rowID: 0,
        isStart: false,
        isFinish: false,
        isWall: false,
        isVisited: false,
        isOnPath: false,
        distance: Infinity,
        previousNode: null,
        h: Infinity,
        f: Infinity,
    };

    const finishNodeTest = {
        colID: 20,
        rowID: 26,
        isStart: false,
        isFinish: false,
        isWall: false,
        isVisited: false,
        isOnPath: false,
        distance: Infinity,
        previousNode: null,
        h: Infinity,
        f: Infinity,
    };

    const grid: Array<Array<Node>> = [];
    for (let rowID = 0; rowID < gridRows; rowID++) {
        grid[rowID] = [];
        for (let colID = 0; colID < gridCols; colID++) {
            grid[rowID][colID] = {
                colID: colID,
                rowID: rowID,
                isStart: rowID === START_NODE_ROW && colID === START_NODE_COL,
                isFinish:
                    rowID === FINISH_NODE_ROW && colID === FINISH_NODE_COL,
                isWall: false,
                isVisited: false,
                isOnPath: false,
                distance: Infinity,
                previousNode: null,
            };
        }
    }

    const dijkTest = new Dijkstra(startNodeTest, finishNodeTest, grid);

    expect(dijkTest.startNode).toBe(startNodeTest);
    expect(dijkTest.finishNode).toBe(finishNodeTest);
    expect(dijkTest.grid).toBe(grid);
});

test("reject null values", () => {
    const startNodeTest = {
        colID: 0,
        rowID: 0,
        isStart: false,
        isFinish: false,
        isWall: false,
        isVisited: false,
        isOnPath: false,
        distance: Infinity,
        previousNode: null,
        h: Infinity,
        f: Infinity,
    };

    const finishNodeTest = {
        colID: 20,
        rowID: 26,
        isStart: false,
        isFinish: false,
        isWall: false,
        isVisited: false,
        isOnPath: false,
        distance: Infinity,
        previousNode: null,
        h: Infinity,
        f: Infinity,
    };

    const grid: Array<Array<Node>> = [];
    for (let rowID = 0; rowID < gridRows; rowID++) {
        grid[rowID] = [];
        for (let colID = 0; colID < gridCols; colID++) {
            grid[rowID][colID] = {
                colID: colID,
                rowID: rowID,
                isStart: rowID === START_NODE_ROW && colID === START_NODE_COL,
                isFinish:
                    rowID === FINISH_NODE_ROW && colID === FINISH_NODE_COL,
                isWall: false,
                isVisited: false,
                isOnPath: false,
                distance: Infinity,
                previousNode: null,
            };
        }
    }
    // If 

    const dijkTest = new Dijkstra(startNodeTest, finishNodeTest, grid);
    const {visitedNodes, shortestPath} = dijkTest.run();


});
