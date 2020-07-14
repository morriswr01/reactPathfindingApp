import React, { Component, useState, useContext } from "react";
import { Context } from "../../Provider";

import Item from "../Item/Item";

// Algorithms
import dijkstra from "../../algorithms/dijkstra";

// CSS
import "./Board.scss";
import { DIJKSTRA } from "../../constants";

export default function Board() {
    // Pull global context
    const context = useContext(Context);
    const {
        // User settings
        algorithm,
        timerInterval,

        // Board State
        grid,

        // Board Update Methods
        updateItem,
        resetGrid,
        resetWalls,
    } = context;

    const [mouseDown, setMouseDown] = useState(false);

    const handleMouseDown = (rowID, colID) => {
        const newProperty = { isWall: true };
        updateItem(rowID, colID, newProperty);
        setMouseDown(true);
    };

    const handleMouseEnter = (rowID, colID) => {
        if (mouseDown) {
            const newProperty = { isWall: true };
            updateItem(rowID, colID, newProperty);
        }
    };

    const handleMouseUp = () => {
        setMouseDown(false);
    };

    const runPathfindingAlgorithm = (algorithm) => {
        switch (algorithm) {
            case DIJKSTRA:
                runDijkstras();
                break;
            default:
                console.log(
                    "You asked us to run an algorithm but there was an issue! :("
                );
                break;
        }
    };

    const runDijkstras = () => {
        let { grid, startNode, finishNode } = context;
        const startItem =
            grid[startNode.START_NODE_ROW][startNode.START_NODE_COL];
        const finishItem =
            grid[finishNode.FINISH_NODE_ROW][finishNode.FINISH_NODE_COL];

        const { visitedNodes, shortestPath } = dijkstra(
            startItem,
            finishItem,
            grid
        );

        animatePathfinding(visitedNodes, shortestPath.reverse());
    };

    const animatePathfinding = async (visitedNodes, shortestPath) => {
        for (let i = 0; i < visitedNodes.length; i++) {
            const { rowID, colID } = visitedNodes[i];
            let updatedProperty = { isVisited: true };
            updateItem(rowID, colID, updatedProperty);
            await sleep(timerInterval);
        }
        for (let i = 0; i < shortestPath.length; i++) {
            const { rowID, colID } = shortestPath[i];
            let updatedProperty = { isOnPath: true };
            updateItem(rowID, colID, updatedProperty);
            await sleep(timerInterval);
        }
    };

    return (
        <div className='board'>
            <header className='header'>
                <h1>Pathfinding With react</h1>
            </header>
            <div className='grid'>
                {grid.map((gridRow) => (
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
                                    onMouseDown={handleMouseDown}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseUp={handleMouseUp}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>

            <footer className='footer'>
                <button
                    className='startBtn'
                    onClick={() => runPathfindingAlgorithm(algorithm)}
                >
                    Go!
                </button>
                <button className='resetBtn' onClick={() => resetGrid()}>
                    Reset Path
                </button>
                <button className='resetBtn' onClick={() => resetWalls()}>
                    Reset Walls
                </button>
            </footer>
        </div>
    );
}

const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
