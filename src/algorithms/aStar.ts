import Node from "../utils/interfaces/Node";

const PriorityQueue = require("javascript-priority-queue");

export default class AStar {
    grid: Array<Array<Node>>;
    startNode: Node;
    finishNode: Node;

    constructor(startNode: Node, finishNode: Node, grid: Array<Array<Node>>) {
        this.startNode = startNode;
        this.finishNode = finishNode;

        // Add A* specific properties to nodes
        this.grid = grid.map((row) =>
            row.map((node) => ({
                ...node,
                isSeen: false,
                h: Infinity,
                f: Infinity,
            }))
        );
    }

    run() {
        let {
            startNode,
            finishNode,
            grid,
            getNeighbours,
            getOptimalPath,
            manhattanDistance,
        } = this;

        // Store order of visited nodes so that they can be animated
        let visitedNodes: Array<Node> = [];

        // Store min heap ordered on the total cost of the heuistic + the distance from start
        let unvisitedHeap = new PriorityQueue.default("min");

        // Set G(x), H(x) and F(x) to 0 for the start node and add to Min Heap
        startNode.distance = 0;
        startNode.h = 0;
        startNode.f = 0;
        unvisitedHeap.enqueue(startNode, startNode.f);

        // While there are still valid nodes in the heap to consider
        while (unvisitedHeap.size() > 0) {
            // Get lowest F(x)'ed node and set as currently considered node
            let currentNode: Node = unvisitedHeap.dequeue();

            // Ignore walls
            if (currentNode.isWall) {
                continue;
            }

            // Node is being visited so set it to isSeen
            currentNode.isSeen = true;

            // If at the finish, break
            if (currentNode.isFinish) {
                break;
            }

            // Find and update neighbours
            let neighbours: Array<Node> = getNeighbours(grid, currentNode);

            // Find and update neighbours
            neighbours.forEach((neighbour: Node) => {
                if (!neighbour.isWall) {
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

        // Get the optimal path from the completed AStar pathfind
        const shortestPath: Array<Node> = getOptimalPath(
            grid[finishNode.rowID][finishNode.colID]
        );

        return {
            visitedNodes,
            shortestPath,
        };
    }

    private manhattanDistance = (nodeA: Node, nodeB: Node) => {
        const dx = Math.abs(nodeA.colID - nodeB.colID);
        const dy = Math.abs(nodeA.rowID - nodeB.rowID);

        return dx + dy;
    };

    private getAllNodes = (grid: Array<Array<Node>>) => {
        let unvisitedHeap = new PriorityQueue.default("min");

        grid.forEach((row) => {
            row.forEach((node) => unvisitedHeap.enqueue(node, node.f));
        });

        return unvisitedHeap;
    };

    private getOptimalPath = (finishNode: Node) => {
        const optPath = [];

        // Get optimal path
        let onOptPathNode = finishNode;
        while (onOptPathNode.previousNode !== null) {
            optPath.push(onOptPathNode);
            onOptPathNode = onOptPathNode.previousNode;
        }

        return optPath;
    };

    private getNeighbours = (grid: Array<Array<Node>>, node: Node) => {
        let neighbours: Array<Node> = [];
        const x = node.colID;
        const y = node.rowID;

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
}

// export default function aStar(startNode, finishNode, grid) {
//     // Add A* specific properties to nodes
//     grid.map((row) =>
//         row.map((node) => ({
//             ...node,
//             isSeen: false,
//             h: Infinity,
//             f: Infinity,
//         }))
//     );

//     // Store order of visited nodes so that they can be animated
//     let visitedNodes = [];

//     // Store min heap ordered on the total cost of the heuistic + the distance from start
//     let unvisitedHeap = new PriorityQueue.default("min");

//     // Set G(x), H(x) and F(x) to 0 for the start node and add to Min Heap
//     startNode.distance = 0;
//     startNode.h = 0;
//     startNode.f = 0;
//     unvisitedHeap.enqueue(startNode, startNode.f);

//     // While there are still valid nodes in the heap to consider
//     while (unvisitedHeap.size() > 0) {
//         // Get lowest F(x)'ed node and set as currently considered node
//         let currentNode = unvisitedHeap.dequeue();

//         // Ignore walls
//         if (currentNode.isWall) {
//             continue;
//         }

//         // Node is being visited so set it to isSeen
//         currentNode.isSeen = true;

//         // If at the finish, break
//         if (currentNode === finishNode) {
//             break;
//         }

//         // Find and update neighbours
//         let neighbours = getNeighbours(grid, currentNode);

//         // Find and update neighbours
//         neighbours.forEach((neighbour) => {
//             if (!neighbour.isWall) {
//                 // New score using this path
//                 let newDistance = currentNode.distance + 1;
//                 // Have we found a shorter path to a neighbour?
//                 if (!neighbour.isSeen || newDistance < neighbour.distance) {
//                     neighbour.distance = currentNode.distance + 1;
//                     neighbour.h = manhattanDistance(neighbour, finishNode);
//                     neighbour.f = neighbour.distance + neighbour.h;
//                     neighbour.previousNode = currentNode;

//                     neighbour.isSeen = true;
//                     visitedNodes.push(neighbour);
//                     unvisitedHeap.enqueue(neighbour, neighbour.f);
//                 }
//             }
//         });
//     }

//     // Get the optimal path from the completed djikstras pathfind
//     const shortestPath = getOptimalPath(finishNode);
//     console.log(visitedNodes);
//     console.log(shortestPath);

//     return {
//         visitedNodes,
//         shortestPath,
//     };
// }

// // eslint-disable-next-line no-unused-vars
// const manhattanDistance = (nodeA, nodeB) => {
//     const dx = Math.abs(nodeA.colID - nodeB.colID);
//     const dy = Math.abs(nodeA.rowID - nodeB.rowID);

//     return dx + dy;
// };

// const getAllNodes = (grid) => {
//     let unvisitedHeap = new PriorityQueue.default("min");

//     grid.forEach((row) => {
//         row.forEach((node) => unvisitedHeap.enqueue(node, node.f));
//     });

//     return unvisitedHeap;
// };

// const getOptimalPath = (finishNode) => {
//     const optPath = [];

//     // Get optimal path
//     let onOptPathNode = finishNode;
//     while (onOptPathNode.previousNode !== null) {
//         optPath.push(onOptPathNode);
//         onOptPathNode = onOptPathNode.previousNode;
//     }

//     return optPath;
// };

// const getNeighbours = (grid, node) => {
//     var neighbours = [];
//     var x = node.colID;
//     var y = node.rowID;

//     // West
//     if (grid[y - 1] && grid[y - 1][x]) {
//         neighbours.push(grid[y - 1][x]);
//     }

//     // East
//     if (grid[y + 1] && grid[y + 1][x]) {
//         neighbours.push(grid[y + 1][x]);
//     }

//     // South
//     if (grid[y] && grid[y][x - 1]) {
//         neighbours.push(grid[y][x - 1]);
//     }

//     // North
//     if (grid[y] && grid[y][x + 1]) {
//         neighbours.push(grid[y][x + 1]);
//     }

//     // // Southwest
//     // if (grid[y - 1] && grid[y - 1][x - 1]) {
//     //     neighbours.push(grid[y - 1][x - 1]);
//     // }

//     // // Southeast
//     // if (grid[y + 1] && grid[y + 1][x - 1]) {
//     //     neighbours.push(grid[y + 1][x - 1]);
//     // }

//     // // Northwest
//     // if (grid[y - 1] && grid[y - 1][x + 1]) {
//     //     neighbours.push(grid[y - 1][x + 1]);
//     // }

//     // // Northeast
//     // if (grid[y + 1] && grid[y + 1][x + 1]) {
//     //     neighbours.push(grid[y + 1][x + 1]);
//     // }

//     return neighbours;
// };
