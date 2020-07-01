export default function dijkstra(startNode, finishNode, grid) {
    // const visitedNodes = [];
    let unvisitedNodes = getAllNodes(grid);
    startNode.distance = 0;

    while (unvisitedNodes.length) {
        unvisitedNodes = sortNodesByDisatnce(unvisitedNodes);
        const currentNode = unvisitedNodes.shift();

        // Check we are not trapped
        if (currentNode.distance === Infinity) {
            unvisitedNodes = [];
            break;
        }

        // Update state to show that current node has been visited
        currentNode.isVisited = true;

        // Check if we are at the finish
        if (currentNode === finishNode) {
            unvisitedNodes = [];
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

    // Get optimal path
    let onOptPathNode = finishNode;
    while (onOptPathNode.previousNode !== null) {
        onOptPathNode.previousNode.isOnPath = true;
        console.log(onOptPathNode.previousNode);
        
        onOptPathNode = onOptPathNode.previousNode;
    }
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