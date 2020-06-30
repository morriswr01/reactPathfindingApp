export default function dijkstra(startNode, finishNode, grid) {
    // const visitedNodes = [];
    let unvisitedNodes = getAllNodes(grid);
    startNode.distance = 0;

    while (unvisitedNodes.length) {
        unvisitedNodes = sortNodesByDisatnce(unvisitedNodes);
        const currentNode = unvisitedNodes.shift();

        // Check we are not trapped
        if (currentNode.distance === Infinity) return;

        // Update state to show that current node has been visited
        currentNode.isVisited = true;
        // visitedNodes.push(currentNode);

        // Check if we are at the finish
        // if (currentNode === finishNode) return visitedNodes;
        if (currentNode === finishNode) return;

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

        getOptimalPath(finishNode);
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

const getOptimalPath = (finishNode) => {
    const optimalPath = [];
    console.log(optimalPath);
    let currentNode = finishNode;
    while (currentNode.previousNode) {
        optimalPath.push(currentNode.previousNode);
    }
};
