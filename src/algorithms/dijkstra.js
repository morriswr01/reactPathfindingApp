export default function dijkstra(startNode, finishNode, grid) {
    const visitedNodes = [];
    let unvisitedNodes = getAllNodes(grid);
    startNode.distance = 0;

    while (unvisitedNodes.length) {
        unvisitedNodes = sortNodesByDisatnce(unvisitedNodes);
        const currentNode = unvisitedNodes.shift();

        // Check we are not trapped
        if (currentNode.distance === Infinity) {
            return visitedNodes;
        }

        // Update state to show that current node has been visited
        currentNode.isVisited = true;
        visitedNodes.push(currentNode);

        // Check if we are at the finish
        if (currentNode === finishNode) return visitedNodes;

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
    return visitedNodes;
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

// const updateUnvisitedNeighbours = (currentNode, grid) => {
//     const unvisitedNeighbours = getUnvisitedNeighbours(currentNode, grid);

//     // Take currentNode distance from start and add one to get neighbours distance
//     unvisitedNeighbours.forEach((neighbour) => {
//         neighbour.distance = currentNode.distance + 1;
//         neighbour.previousNode = currentNode;
//     });

//     return unvisitedNeighbours;
// };

// const getUnvisitedNeighbours = (currentNode, grid) => {
//     const neighbours = [];
//     const { rowID, colID } = currentNode;
//     // Find neighbour above
//     if (rowID > 0) neighbours.push(grid[rowID - 1][colID]);
//     // Find neighbour below
//     if (rowID < grid.length - 1) neighbours.push(grid[rowID + 1][colID]);
//     // Find neighbour left
//     if (colID > 0) neighbours.push(grid[rowID][colID - 1]);
//     // Find neighbour right
//     if (colID < grid[0].length - 1) neighbours.push(grid[rowID][colID + 1]);

//     return neighbours.filter((neighbour) => !neighbours.isVisited);
// };
