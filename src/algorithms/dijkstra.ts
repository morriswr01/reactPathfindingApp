interface Node {
    colID: number;
    rowID: number;
    isStart: boolean;
    isVisited: boolean;
    isFinish: boolean;
    isWall: boolean;
    isOnPath: boolean;
    distance: number;
    previousNode: Node;
    isSeen?: boolean;
    h?: number;
    f?: number;
}

export default class Dijkstra {
    startNode: Node;
    finishNode: Node;
    grid: Array<Array<Node>>;

    constructor(startNode: Node, finishNode: Node, grid: Array<Array<Node>>) {
        this.startNode = startNode;
        this.finishNode = finishNode;
        this.grid = grid;
    }

    run() {
        let {
            startNode,
            finishNode,
            grid,
            getAllNodes,
            sortNodesByDisatnce,
        } = this;

        let unvisitedNodes = getAllNodes(grid);
        let visitedNodes = [];
        startNode.distance = 0;

        while (unvisitedNodes.length > 0) {
            unvisitedNodes = sortNodesByDisatnce(unvisitedNodes);
            let currentNode: Node = unvisitedNodes.shift() as any;

            if (currentNode !== undefined) {
                if (currentNode?.isWall) {
                    continue;
                }

                // Check we are not trapped
                if (currentNode?.distance === Infinity) {
                    break;
                }

                // Update state to show that current node has been visited
                if (currentNode !== undefined) {
                    visitedNodes.push(currentNode);
                }

                // Check if we are at the finish
                if (currentNode === finishNode) {
                    break;
                }

                // Find and update neighbours
                unvisitedNodes.map((node) => {
                    const { rowID, colID } = node;
                    if (
                        (colID === currentNode?.colID &&
                            Math.abs(rowID - currentNode.rowID) === 1) ||
                        (rowID === currentNode.rowID &&
                            Math.abs(colID - currentNode.colID) === 1)
                    ) {
                        node.distance = currentNode.distance + 1;
                        node.previousNode = currentNode;
                    }
                    return node;
                });
            }
        }

        // Get the optimal path from the completed djikstras pathfind
        const shortestPath: Array<Node> = this.getOptimalPath(finishNode);
        console.log(visitedNodes);
        console.log(shortestPath);

        return { visitedNodes, shortestPath };
    }

    sortNodesByDisatnce = (unvisitedNodes: Array<Node>) => {
        return unvisitedNodes.sort(
            (nodeA, nodeB) => nodeA.distance - nodeB.distance
        );
    };

    getAllNodes = (grid: Array<Array<Node>>) => {
        const nodesAsArray: Array<Node> = [];

        grid.forEach((row) => {
            row.forEach((node) => nodesAsArray.push(node));
        });

        return nodesAsArray;
    };

    getOptimalPath = (finishNode: Node) => {
        const optPath: Array<Node> = [];

        // Get optimal path
        let onOptPathNode = finishNode;
        while (onOptPathNode.previousNode !== null) {
            // onOptPathNode.previousNode.isOnPath = true;
            optPath.push(onOptPathNode);
            onOptPathNode = onOptPathNode.previousNode;
        }

        return optPath;
    };
}

// export function dijkstra(startNode, finishNode, grid) {
//     let unvisitedNodes = getAllNodes(grid);
//     startNode.distance = 0;

//     while (unvisitedNodes.length) {
//         unvisitedNodes = sortNodesByDisatnce(unvisitedNodes);
//         const currentNode = unvisitedNodes.shift();

//         if (currentNode.isWall) {
//             continue;
//         }

//         // Check we are not trapped
//         if (currentNode.distance === Infinity) {
//             break;
//         }

//         // Update state to show that current node has been visited
//         visitedNodes.push(currentNode);

//         // Check if we are at the finish
//         if (currentNode === finishNode) {
//             break;
//         }

//         // Find and update neighbours
//         unvisitedNodes.map((node) => {
//             const { rowID, colID } = node;
//             if (
//                 (colID === currentNode.colID &&
//                     Math.abs(rowID - currentNode.rowID) === 1) ||
//                 (rowID === currentNode.rowID &&
//                     Math.abs(colID - currentNode.colID) === 1)
//             ) {
//                 node.distance = currentNode.distance + 1;
//                 node.previousNode = currentNode;
//             }
//             return node;
//         });
//     }

//     // Get the optimal path from the completed djikstras pathfind
//     const shortestPath = getOptimalPath(finishNode);
//     console.log(visitedNodes);
//     console.log(shortestPath);

//     return { visitedNodes, shortestPath };
// }

// const sortNodesByDisatnce = (unvisitedNodes) => {
//     return unvisitedNodes.sort(
//         (nodeA, nodeB) => nodeA.distance - nodeB.distance
//     );
// };

// const getAllNodes = (grid) => {
//     const nodes = [];

//     grid.forEach((row) => {
//         row.forEach((node) => nodes.push(node));
//     });

//     return nodes;
// };

// const getOptimalPath = (finishNode) => {
//     const optPath = [];

//     // Get optimal path
//     let onOptPathNode = finishNode;
//     while (onOptPathNode.previousNode !== null) {
//         // onOptPathNode.previousNode.isOnPath = true;
//         optPath.push(onOptPathNode);
//         onOptPathNode = onOptPathNode.previousNode;
//     }

//     return optPath;
// };
