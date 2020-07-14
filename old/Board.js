import React, { Component, useState } from "react";
import { Context } from "../src/Provider";

import Item from "../src/components/Item/Item";

// Algorithms
import dijkstra from "../src/algorithms/dijkstra";

// CSS
import "./Board.scss";

export default class Board extends Component {
    // Pull global context
    static contextType = Context;



    componentDidMount() {
        // this.resetGrid();
    }

    handleMouseDown = (rowID, colID) => {
        this.context.setWall(rowID, colID, !this.context.grid[rowID][colID].isWall);
        // this.setState({ ...this.state, mouseDown: true });
    };

    handleMouseEnter = (rowID, colID) => {
        if (this.state.mouseDown) {
            this.context.setWall(rowID, colID, true);
        }
    };

    handleMouseUp = () => {
        this.setState({ ...this.state, mouseDown: false });
    };

    // runDijkstras = () => {
    //     let { grid } = this.state;
    //     const startNode = grid[START_NODE_ROW][START_NODE_COL];
    //     const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    //     // eslint-disable-next-line no-unused-vars
    //     const { visitedNodes, shortestPath } = dijkstra(
    //         startNode,
    //         finishNode,
    //         grid
    //     );

    //     this.animateDijkstra(visitedNodes, shortestPath.reverse());

    //     this.setState({ grid });
    // };

    // animateDijkstra = async (visitedNodes, shortestPath) => {
    //     for (let i = 0; i < visitedNodes.length; i++) {
    //         const { rowID, colID } = visitedNodes[i];
    //         let newGrid = this.state.grid;
    //         newGrid[rowID][colID].isVisited = true;
    //         this.setState({ ...this.state, grid: newGrid });
    //         await sleep(100);
    //     }
    //     for (let i = 0; i < shortestPath.length; i++) {
    //         const { rowID, colID } = shortestPath[i];
    //         let newGrid = this.state.grid;
    //         newGrid[rowID][colID].isOnPath = true;
    //         this.setState({ ...this.state, grid: newGrid });
    //         await sleep(100);
    //     }
    // };

    // Set node at coords (colID, rowID) to be a wall or not based on setTo boolean
    // setWall = (rowID, colID, setTo) => {
    //     let newGrid = this.state.grid;
    //     newGrid[rowID][colID].isWall = setTo;
    //     this.setState({ ...this.state, grid: newGrid });
    // };

    // Set or Reset the grid but leave walls if any where they are
    // resetGrid = () => {
    //     // Get current grid
    //     const oldGrid = this.state.grid;
    //     // A grid already exists so reset everything except walls
    //     if (oldGrid.length) {
    //         const resetGridWithOldWalls = oldGrid.map((row) =>
    //             row.map((node) => ({
    //                 ...node,
    //                 isVisited: false,
    //                 isOnPath: false,
    //                 distance: Infinity,
    //                 previousNode: null,
    //             }))
    //         );
    //         this.setState({
    //             ...this.state,
    //             grid: resetGridWithOldWalls,
    //         });
    //     }
    //     // A grid does not already exist so initialise a grid using getInitialGrid
    //     else {
    //         const grid = getInitialGrid();
    //         this.setState({ ...this.state, grid });
    //     }
    // };

    // Reset walls only, not the entire grid
    // resetWalls = () => {
    //     let newGrid = this.state.grid;

    //     // Remove walls from new grid
    //     newGrid = newGrid.map((row) =>
    //         row.map((node) => ({
    //             ...node,
    //             isWall: false,
    //         }))
    //     );
    //     this.setState({ ...this.state, grid: newGrid });
    // };

    render() {
        // const { grid } = this.state;

        return (
            <div className='board'>
                <header className='header'>
                    <h1>Pathfinding With react</h1>
                </header>
                        <div className='grid'>
                            {this.context.grid.map((gridRow) => (
                                <div className='gridRow'>
                                    {gridRow.map((item) => {
                                        const {
                                            rowID,
                                            colID,
                                            isStart,
                                            isFinish,
                                            isVisited,
                                            isOnPath,
                                            isWall,
                                            distance,
                                        } = item;
                                        return (
                                            <Item
                                                key={colID}
                                                colID={colID}
                                                rowID={rowID}
                                                isStart={isStart}
                                                isFinish={isFinish}
                                                isVisited={isVisited}
                                                isOnPath={isOnPath}
                                                isWall={isWall}
                                                distance={distance}
                                                onMouseDown={
                                                    this.handleMouseDown
                                                }
                                                onMouseEnter={
                                                    this.handleMouseEnter
                                                }
                                                onMouseUp={this.handleMouseUp}
                                            />
                                        );
                                    })}
                                </div>
                            ))}
                        </div>

                <footer className='footer'>
                    <button
                        className='startBtn'
                        // onClick={() => this.runDijkstras()}
                    >
                        Go!
                    </button>
                    <button
                        className='resetBtn'
                        // onClick={() => this.resetGrid()}
                    >
                        Reset Path
                    </button>
                    <button
                        className='resetBtn'
                        // onClick={() => this.resetWalls()}
                    >
                        Reset Walls
                    </button>
                </footer>
            </div>
        );
    }
}

// Needs to go in context
// const getInitialGrid = () => {
//     const grid = [];
//     for (let rowID = 0; rowID < 21; rowID++) {
//         let row = [];
//         for (let colID = 0; colID < 21; colID++) {
//             row.push({
//                 colID: colID,
//                 rowID: rowID,
//                 isStart: rowID === START_NODE_ROW && colID === START_NODE_COL,
//                 isFinish:
//                     rowID === FINISH_NODE_ROW && colID === FINISH_NODE_COL,
//                 isWall: false,
//                 isVisited: false,
//                 isOnPath: false,
//                 distance: Infinity,
//                 previousNode: null,
//             });
//         }
//         grid.push(row);
//     }
//     return grid;
// };

const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
