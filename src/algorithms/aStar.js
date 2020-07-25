/* eslint-disable no-unused-vars */
const PriorityQueue = require("javascript-priority-queue");

export default function aStar(startNode, finishNode, grid) {
    let visitedNodes = [];
    let unvisitedHeap = new PriorityQueue.default("min");
    let unvisitedNodes = getAllNodes(grid);
    // This is G(x)
    startNode.distance = 0;
    startNode.f = 0;
    startNode.h = 0;

    unvisitedHeap.enqueue(startNode, startNode.f);

    while (unvisitedHeap.size() > 0) {
        // Get lowest f'ed node and use it as currently considered node
        let currentNode = unvisitedHeap.dequeue();

        if (currentNode.isWall) {
            continue;
        }

        currentNode.isSeen = true;

        // Check if we are at the finish
        if (currentNode === finishNode) {
            // pathFound = true;
            break;
        }

        currentNode.closed = true;

        // Find and update neighbours
        let neighbours = getNeighbours(grid, currentNode);

        // Find and update neighbours
        neighbours.forEach((neighbour) => {
            if (!neighbours.closed && !neighbour.isWall) {
                // New score using this path
                let newDistance = currentNode.distance + 1;
                // Have we found a shorter path to a neighbour?
                if (!neighbour.isSeen || newDistance < neighbour.distance) {
                    neighbour.distance = currentNode.distance + 1;
                    neighbour.h = manhattanDistance(neighbour, finishNode);
                    neighbour.f = neighbour.distance + neighbour.h;
                    neighbour.previousNode = currentNode;

                    neighbour.isSeen = true;
                    visitedNodes.push(neighbour);
                    unvisitedHeap.enqueue(neighbour, neighbour.f);
                }
            }
        });
    }

    // Get the optimal path from the completed djikstras pathfind
    const shortestPath = getOptimalPath(finishNode);
    console.log(visitedNodes.toString());
    console.log(shortestPath);

    return {
        visitedNodes,
        shortestPath,
    };
}

// eslint-disable-next-line no-unused-vars
const manhattanDistance = (nodeA, nodeB) => {
    const dx = Math.abs(nodeA.colID - nodeB.colID);
    const dy = Math.abs(nodeA.rowID - nodeB.rowID);

    return dx + dy;
};

const getAllNodes = (grid) => {
    let unvisitedHeap = new PriorityQueue.default("min");

    grid.forEach((row) => {
        row.forEach((node) => unvisitedHeap.enqueue(node, node.f));
    });

    return unvisitedHeap;
};

const getOptimalPath = (finishNode) => {
    const optPath = [];

    // Get optimal path
    let onOptPathNode = finishNode;
    while (onOptPathNode.previousNode !== null) {
        // onOptPathNode.previousNode.isOnPath = true;
        optPath.push(onOptPathNode);
        onOptPathNode = onOptPathNode.previousNode;
    }

    return optPath;
};

const getNeighbours = (grid, node) => {
    var neighbours = [];
    var x = node.colID;
    var y = node.rowID;

    // West
    if (grid[y - 1] && grid[y - 1][x]) {
        neighbours.push(grid[y - 1][x]);
    }

    // East
    if (grid[y + 1] && grid[y + 1][x]) {
        neighbours.push(grid[y + 1][x]);
    }

    // South
    if (grid[y] && grid[y][x - 1]) {
        neighbours.push(grid[y][x - 1]);
    }

    // North
    if (grid[y] && grid[y][x + 1]) {
        neighbours.push(grid[y][x + 1]);
    }

    // // Southwest
    // if (grid[y - 1] && grid[y - 1][x - 1]) {
    //     neighbours.push(grid[y - 1][x - 1]);
    // }

    // // Southeast
    // if (grid[y + 1] && grid[y + 1][x - 1]) {
    //     neighbours.push(grid[y + 1][x - 1]);
    // }

    // // Northwest
    // if (grid[y - 1] && grid[y - 1][x + 1]) {
    //     neighbours.push(grid[y - 1][x + 1]);
    // }

    // // Northeast
    // if (grid[y + 1] && grid[y + 1][x + 1]) {
    //     neighbours.push(grid[y + 1][x + 1]);
    // }

    return neighbours;
};
