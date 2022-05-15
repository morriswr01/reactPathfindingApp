import React, { useState, useContext, useRef } from "react";
import { Context } from "../../Provider";

import Node from "../../utils/interfaces/Node";
import ItemCoordinates from "../../utils/interfaces/ItemCoordinates";

import Item from "../Item/Item";

// Algorithms
import Dijkstra from "../../algorithms/Dijkstras/dijkstra";
import AStar from "../../algorithms/aStar";
import { DIJKSTRA, ASTAR } from "../../constants";
import { Pathfinder } from "../../algorithms/Pathfinder";

// CSS
import "./Board.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay, faUndoAlt } from "@fortawesome/free-solid-svg-icons";

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
        addWalls,
        newWall,
        updateSpeed,
        updateItem,
        resetGrid,
        resetWalls,
        updateStart,
        updateFinish,
        updateSelectedAlgorithm,
    } = context;
    const pathfinder = useRef<Pathfinder | null>(null);

    const [isPaused, setIsPaused] = useState(false);
    const [isRunning, setIsRunning] = useState(false);

    const [mouseDown, setMouseDown] = useState(false);
    const [movingStart, setMovingStart] = useState(false);
    const [movingFinish, setMovingFinish] = useState(false);

    const handleMouseDown = (coords: ItemCoordinates) => {
        const { rowID, colID } = coords;

        if (grid[rowID][colID].isStart) {
            setMovingStart(true);
        } else if (grid[rowID][colID].isFinish) {
            setMovingFinish(true);
        } else {
            const newProperty = { isWall: !grid[rowID][colID].isWall };
            const newClass = !grid[rowID][colID].isWall
                ? "item itemWall"
                : "item";
            document.getElementById(`${colID}, ${rowID}`)!.className = newClass;
            updateItem(rowID, colID, newProperty);
        }
        setMouseDown(true);
    };

    const handleMouseEnter = (coords: ItemCoordinates) => {
        const { rowID, colID } = coords;

        if (movingStart) {
            const newProperty = { isStart: true };
            updateItem(rowID, colID, newProperty);
        } else if (movingFinish) {
            const newProperty = { isFinish: true };
            updateItem(rowID, colID, newProperty);
        } else if (mouseDown) {
            if (!grid[rowID][colID].isFinish && !grid[rowID][colID].isStart) {
                document.getElementById(`${colID}, ${rowID}`)!.className =
                    "item itemWall";
                newWall(grid[rowID][colID]);
            }
        }
    };

    const handleMouseLeave = (coords: ItemCoordinates) => {
        const { rowID, colID } = coords;

        if (movingStart) {
            const newProperty = { isStart: false };
            updateItem(rowID, colID, newProperty);
        } else if (movingFinish) {
            const newProperty = { isFinish: false };
            updateItem(rowID, colID, newProperty);
        }
    };

    const handleMouseUp = (coords: ItemCoordinates) => {
        const { rowID, colID } = coords;

        if (movingStart) {
            updateStart(rowID, colID);
            setMovingStart(false);
        } else if (movingFinish) {
            updateFinish(rowID, colID);
            setMovingFinish(false);
        } else {
            addWalls();
        }
        setMouseDown(false);
    };

    const start = () => {
        if (isPaused && isRunning) {
            console.log("Animation resumed...");
            pathfinder.current?.resumeTimers();
        } else if (!isRunning) {
            pathfinder.current = new Pathfinder();
            runPathfindingAlgorithm(algorithm);
        }
        setIsRunning(true);
        setIsPaused(false);
    };

    const pause = () => {
        pathfinder.current!.pauseTimers();
        console.log("Animation paused...");
        setIsPaused(true);
    };

    const reset = () => {
        if (pathfinder.current) {
            pathfinder.current.deleteTimers();
            console.log("Animation reset...");
            setIsPaused(false);
            setIsRunning(false);
            resetGrid();
        }
    };

    const setAlgorithm = (algorithm: String) => {
        if (!isRunning) {
            updateSelectedAlgorithm(algorithm);
        }
    };

    const runPathfindingAlgorithm = (algorithm: String) => {
        switch (algorithm) {
            case DIJKSTRA:
                runDijkstras();
                break;
            case ASTAR:
                runAStar();
                break;
            default:
                console.log(
                    "You asked us to run an algorithm but there was an issue! :("
                );
                break;
        }
    };

    const runAStar = () => {
        let { grid, startNode, finishNode } = context;
        const startItem =
            grid[startNode.START_NODE_ROW][startNode.START_NODE_COL];
        const finishItem =
            grid[finishNode.FINISH_NODE_ROW][finishNode.FINISH_NODE_COL];

        const aStar = new AStar(startItem, finishItem, grid);

        const { visitedNodes, shortestPath } = aStar.run();

        animatePathfinding(visitedNodes, shortestPath.reverse());
    };

    const runDijkstras = () => {
        let { grid, startNode, finishNode } = context;
        const startItem =
            grid[startNode.START_NODE_ROW][startNode.START_NODE_COL];
        const finishItem =
            grid[finishNode.FINISH_NODE_ROW][finishNode.FINISH_NODE_COL];

        const dijkstras = new Dijkstra(startItem, finishItem, grid);

        const { visitedNodes, shortestPath } = dijkstras.run();

        animatePathfinding(visitedNodes, shortestPath.reverse());
    };

    // Refactor while loop
    const animatePathfinding = (
        visitedNodes: Array<Node>,
        shortestPath: Array<Node>
    ) => {
        let timerFactor = 1;

        while (visitedNodes.length) {
            // Definitely non-null so can be non-null asserted
            const visitedNode: Node = visitedNodes.shift()!;

            let updatedItem: Node = { ...visitedNode, isVisited: true };
            console.log(updatedItem);

            pathfinder.current!.addTimer(() => {
                updateItem(updatedItem.rowID, updatedItem.colID, updatedItem);
            }, timerInterval * timerFactor);

            timerFactor += 1;
        }

        while (shortestPath.length) {
            // Definitely non-null so can be non-null asserted
            const pathNode: Node = shortestPath.shift()!;
            let updatedItem: Node = {
                ...pathNode,
                isVisited: true,
                isOnPath: true,
            };

            pathfinder.current!.addTimer(() => {
                updateItem(updatedItem.rowID, updatedItem.colID, updatedItem);
            }, timerInterval * timerFactor);

            timerFactor += 1;
        }

        setIsRunning(false);
    };

    return (
        <div>
            <div className='board'>
                <header className='header'>
                    <div className='title'>
                        <h1>Pathfinding With react</h1>
                    </div>
                    <div className='controls'>
                        <div className='algorithmSelection'>
                            <select
                                className='algoSelectionDropdown'
                                name='algorithmSelection'
                                onChange={(e) => setAlgorithm(e.target.value)}
                            >
                                <option value={ASTAR}>A*</option>
                                <option value={DIJKSTRA}>Dijkstras</option>
                            </select>
                        </div>
                        <button className='startBtn' onClick={() => start()}>
                            <FontAwesomeIcon icon={faPlay} size='sm' />
                        </button>
                        <button className='pauseBtn' onClick={() => pause()}>
                            <FontAwesomeIcon icon={faPause} size='sm' />
                        </button>
                        <button className='resetBtn' onClick={() => reset()}>
                            <FontAwesomeIcon icon={faUndoAlt} size='sm' />
                        </button>
                        <button
                            className='resetWalls'
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
                                max='450'
                                step='100'
                                id='speed'
                                onChange={(e) => {
                                    updateSpeed(500 - parseInt(e.target.value));
                                }}
                            ></input>
                        </div>
                    </div>
                </header>
                <div className='gridContainer'>
                    <div className='grid'>
                        {grid.map((gridRow: Array<Node>) => (
                            <div className='gridRow'>
                                {gridRow.map((item: Node) => {
                                    return (
                                        <Item
                                            key={item.colID}
                                            node={item}
                                            onMouseDown={handleMouseDown}
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}
                                            onMouseUp={handleMouseUp}
                                        />
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
