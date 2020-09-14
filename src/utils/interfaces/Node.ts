export default interface Node {
    colID: number;
    rowID: number;
    isStart: boolean;
    isVisited: boolean;
    isFinish: boolean;
    isWall: boolean;
    isOnPath: boolean;
    distance: number;
    previousNode: Node;
    isSeen?: boolean;
    h?: number;
    f?: number;
}
