import React, { useState, useContext, useRef } from "react";
import { Context } from "../../Provider";

import Item from "../Item/Item";

// Algorithms
import dijkstra from "../../algorithms/dijkstra";
import { DIJKSTRA } from "../../constants";
import { Pathfinder } from "../../algorithms/Timer";

// CSS
import "./Board.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

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
        updateSpeed,
        updateItem,
        resetGrid,
        resetWalls,
    } = context;
    const pathfinder = useRef(null);

    const [isPaused, setIsPaused] = useState(false);
    const [isRunning, setIsRunning] = useState(false);

    const [mouseDown, setMouseDown] = useState(false);

    const handleMouseDown = (rowID, colID) => {
        const newProperty = { isWall: !grid[rowID][colID].isWall };
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

    const start = () => {
        if (isPaused) {
            console.log("Animation resumed...");
            pathfinder.current.resumeTimers();
        } else {
            pathfinder.current = new Pathfinder();
            runPathfindingAlgorithm(algorithm);
        }
        setIsRunning(true);
        setIsPaused(false);
    };

    const pause = () => {
        pathfinder.current.pauseTimers();
        console.log("Animation paused...");
        setIsPaused(true);
    };

    const reset = () => {
        pathfinder.current.deleteTimers();
        console.log("Animation reset...");
        setIsPaused(false);
        setIsRunning(false);
        resetGrid();
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

    // Refactor while loop
    const animatePathfinding = (visitedNodes, shortestPath) => {
        let timerFactor = 1;

        while (visitedNodes.length) {
            const { rowID, colID } = visitedNodes.shift();
            let updatedProperty = { isVisited: true };

            pathfinder.current.addTimer({
                callback: () => {
                    updateItem(rowID, colID, updatedProperty);
                },
                delay: timerInterval * timerFactor,
            });

            timerFactor += 1;
        }

        while (shortestPath.length) {
            const { rowID, colID } = shortestPath.shift();
            let updatedProperty = { isOnPath: true };

            pathfinder.current.addTimer({
                callback: () => {
                    updateItem(rowID, colID, updatedProperty);
                },
                delay: timerInterval * timerFactor,
            });

            timerFactor += 1;
        }

        setIsRunning(false);
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
                <button className='startBtn' onClick={() => start()}>
                    <FontAwesomeIcon icon={faPlay} size='sm' />
                </button>
                <button className='pauseBtn' onClick={() => pause()}>
                    <FontAwesomeIcon icon={faPause} size='sm' />
                </button>
                <button className='resetBtn' onClick={() => reset()}>
                    Reset Path
                </button>
                <button
                    className='resetBtn'
                    onClick={() => {
                        if (!isRunning) {
                            resetWalls();
                        }
                    }}
                >
                    Reset Walls
                </button>
                <div className='speedSlider'>
                    <label htmlFor='speed'>Animation Speed</label>
                    <input
                        type='range'
                        min='50'
                        max='500'
                        step='50'
                        id='speed'
                        onChange={(e) => {
                            updateSpeed(e.target.value);
                        }}
                    ></input>
                </div>
            </footer>
        </div>
    );
}
