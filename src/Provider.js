import React, { Component, createContext } from "react";

import { grid, DIJKSTRA, ASTAR } from "./constants";

// Blank context
const Context = createContext();

// Wrapper around the application to Provide the state to the application
class Provider extends Component {
    constructor() {
        super();
        this.state = {
            algorithm: ASTAR,
            timerInterval: 450,
            startNode: {
                START_NODE_ROW: 10,
                START_NODE_COL: 5,
            },
            finishNode: {
                FINISH_NODE_ROW: 10,
                FINISH_NODE_COL: 15,
            },
            grid,
        };
    }

    // Can update any property of a single item eg: convert to wall, isVisited or OnPath
    updateItem = (rowID, colID, newProperty) => {
        let grid = this.state.grid;
        grid[rowID][colID] = { ...grid[rowID][colID], ...newProperty };
        this.setState({ ...this.state, grid });
    };

    updateSpeed = (newInterval) => {
        this.setState({ ...this.state, timerInterval: newInterval });
    };

    updateStart = (rowID, colID) => {
        this.setState({
            ...this.state,
            isWall: false,
            startNode: {
                START_NODE_ROW: rowID,
                START_NODE_COL: colID,
            },
        });
    };
    updateFinish = (rowID, colID) => {
        this.setState({
            ...this.state,
            isWall: false,
            finishNode: {
                FINISH_NODE_ROW: rowID,
                FINISH_NODE_COL: colID,
            },
        });
    };

    // Reset walls only, not the entire grid
    resetWalls = () => {
        let newGrid = this.state.grid;

        // Remove walls from new grid
        newGrid = newGrid.map((row) =>
            row.map((node) => ({
                ...node,
                isWall: false,
            }))
        );
        this.setState({ ...this.state, grid: newGrid });
    };

    // Set or Reset the grid but leave walls if any where they are
    resetGrid = () => {
        // Get current grid
        const oldGrid = this.state.grid;
        // A grid already exists so reset everything except walls
        if (oldGrid.length) {
            const resetGridWithOldWalls = oldGrid.map((row) =>
                row.map((node) => ({
                    ...node,
                    h: Infinity,
                    f: Infinity,
                    isVisited: false,
                    isOnPath: false,
                    distance: Infinity,
                    previousNode: null,
                }))
            );
            this.setState({
                ...this.state,
                grid: resetGridWithOldWalls,
            });
        }
        // A grid does not already exist so initialise a grid using getInitialGrid
        else {
            const grid = this.getInitialGrid();
            this.setState({ ...this.state, grid });
        }
    };

    // Needs to go in context
    getInitialGrid = () => {
        const { startNode, finishNode } = this.state;
        const grid = [];
        for (let rowID = 0; rowID < 21; rowID++) {
            let row = [];
            for (let colID = 0; colID < 21; colID++) {
                row.push({
                    colID: colID,
                    rowID: rowID,
                    isStart:
                        rowID === startNode.START_NODE_ROW &&
                        colID === startNode.START_NODE_COL,
                    isFinish:
                        rowID === finishNode.FINISH_NODE_ROW &&
                        colID === finishNode.FINISH_NODE_COL,
                    isWall: false,
                    isVisited: false,
                    isOnPath: false,
                    distance: Infinity,
                    // Factor these bad bois out
                    h: Infinity,
                    f: Infinity,
                    closed: false,
                    previousNode: null,
                });
            }
            grid.push(row);
        }
        return grid;
    };

    render() {
        return (
            <Context.Provider
                value={{
                    algorithm: this.state.algorithm,
                    startNode: this.state.startNode,
                    finishNode: this.state.finishNode,
                    timerInterval: this.state.timerInterval,
                    grid: this.state.grid,

                    // Functions
                    resetWalls: this.resetWalls,
                    updateSpeed: this.updateSpeed,
                    resetGrid: this.resetGrid,
                    updateItem: this.updateItem,
                    updateStart: this.updateStart,
                    updateFinish: this.updateFinish,
                }}
            >
                {this.props.children}
            </Context.Provider>
        );
    }
}

// Export Provider so that it can be instantiated around the application in App.js
// Export Context so that components lower down the tree can access Consumer directly to access this context state stored in Provider class.
export { Context, Provider };
