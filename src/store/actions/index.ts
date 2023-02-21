// ACTIONS DISPATCHED FROM THE CANVAS BOARD
export const MOVE_RIGHT = 'MOVE_RIGHT';
export const MOVE_LEFT = 'MOVE_LEFT';
export const MOVE_UP = 'MOVE_UP';
export const MOVE_DOWN = 'MOVE_DOWN';

// ACTIONS YIELD BY THE SAGA
export const RIGHT = 'RIGHT';
export const LEFT = 'LEFT';
export const UP = 'UP';
export const DOWN = 'DOWN';

export const SET_DIS_DIRECTION = 'SET_DIS_DIRECTION';
export const INCREMENT_SCORE = 'INCREMENT_SCORE';
export const INCREASE_SNAKE = 'INCREASE_SNAKE';

export interface ISnakeCoord {
    x: number;
    y: number;
}

// action creators
export const makeMove = (dx: number, dy: number, move: string) => {    
    return {
        type: move,
        payload: [dx, dy]
    }
};

export const setDisDirection = (direction: string) => ({
    type: SET_DIS_DIRECTION,
    payload: direction
});

export const increaseSnake = () => ({
    type: INCREASE_SNAKE
})

export const scoreUpdates = () => ({
    type: INCREMENT_SCORE
})