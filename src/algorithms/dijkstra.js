export default function dijkstra(startNode, finishNode, grid) {
    const visitedNodes = [];
    let unvisitedNodes = getAllNodes(grid);
    startNode.distance = 0;

    let pathFound = false;

    while (unvisitedNodes.length && !pathFound) {
        unvisitedNodes = sortNodesByDisatnce(unvisitedNodes);
        const currentNode = unvisitedNodes.shift();

        if (currentNode.isWall) {
            continue;
        }

        // Check we are not trapped
        if (currentNode.distance === Infinity) {
            break;
        }

        // Update state to show that current node has been visited
        // currentNode.isVisited = true;
        visitedNodes.push(currentNode);

        // Check if we are at the finish
        if (currentNode === finishNode) {
            // pathFound = true;
            break;
        }

        // Find and update neighbours
        unvisitedNodes.map((node) => {
            const { rowID, colID } = node;
            if (
                (colID === currentNode.colID &&
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

    // Get the optimal path from the completed djikstras pathfind
    const shortestPath = getOptimalPath(finishNode);

    return { visitedNodes, shortestPath };
}

const sortNodesByDisatnce = (unvisitedNodes) => {
    return unvisitedNodes.sort(
        (nodeA, nodeB) => nodeA.distance - nodeB.distance
    );
};

const getAllNodes = (grid) => {
    const nodes = [];

    grid.forEach((row) => {
        row.forEach((node) => nodes.push(node));
    });

    return nodes;
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
