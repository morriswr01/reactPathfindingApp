import React from "react";

import Item from "../Item/Item";

// Algorithms
import dijkstra from "../../algorithms/dijkstra";

// CSS
import "./Board.scss";

const START_NODE_ROW = 10;
const START_NODE_COL = 5;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 15;

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
        };
    }

    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({ grid });
    }

    runDijkstras() {
        let { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        // eslint-disable-next-line no-unused-vars
        dijkstra(startNode, finishNode, grid);

        this.setState({ grid });
    }

    render() {
        const { grid } = this.state;

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
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
                <footer className='footer'>
                    <button
                        className='startBtn'
                        onClick={() => this.runDijkstras()}
                    >
                        Go!
                    </button>
                </footer>
            </div>
        );
    }
}

const getInitialGrid = () => {
    const grid = [];
    for (let rowID = 0; rowID < 21; rowID++) {
        let row = [];
        for (let colID = 0; colID < 21; colID++) {
            row.push({
                colID: colID,
                rowID: rowID,
                isStart: rowID === START_NODE_ROW && colID === START_NODE_COL,
                isFinish:
                    rowID === FINISH_NODE_ROW && colID === FINISH_NODE_COL,
                isVisited: false,
                isWall: false,
                distance: Infinity,
                previousNode: null,
            });
        }
        grid.push(row);
    }
    return grid;
};
