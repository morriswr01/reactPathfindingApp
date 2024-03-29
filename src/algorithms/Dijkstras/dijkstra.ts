import Node from "../../utils/interfaces/Node";


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

    private sortNodesByDisatnce = (unvisitedNodes: Array<Node>) => {
        return unvisitedNodes.sort(
            (nodeA, nodeB) => nodeA.distance - nodeB.distance
        );
    };

    private getAllNodes = (grid: Array<Array<Node>>) => {
        const nodesAsArray: Array<Node> = [];

        grid.forEach((row) => {
            row.forEach((node) => nodesAsArray.push(node));
        });

        return nodesAsArray;
    };

    private getOptimalPath = (finishNode: Node) => {
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