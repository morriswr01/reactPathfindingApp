import uuidv4 from "uuid/v4";

// Board Size
export const ROWS = 25;
export const COLUMNS = 16;

// Initial Board
export const INIT_BOARD = [];
export const KEYS = [];
for (let i = 0; i < ROWS; i++) {
    INIT_BOARD[i] = [];
    KEYS[i] = [];
    for (let j = 0; j < COLUMNS; j++) {
        INIT_BOARD[i][j] = {
            visit: false,
        };
        KEYS[i][j] = uuidv4();
    }
}
