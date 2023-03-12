import { DOWN, INCREASE_SNAKE, INCREMENT_SCORE, ISnakeCoord, LEFT, RESET, RESET_SCORE, RIGHT, SET_DIS_DIRECTION, UP } from "../actions";

export interface IGlobalState {
    snake: ISnakeCoord[] | [];
    disallowedDirection: string;
    score: number;
}

const GlobalState: IGlobalState = {
    snake: [
        { x: 580, y: 300 },
        { x: 560, y: 300 },
        { x: 540, y: 300 },
        { x: 520, y: 300 },
        { x: 500, y: 300 },
    ],
    disallowedDirection: "", 
    score: 0
};

const gameReducer = (state = GlobalState, action: any) => {
    // console.log("Action Type: ", action.type);
    
    switch(action.type) {
        case RIGHT:
        case LEFT:
        case UP:
        case DOWN: 
        let newSnake = [...state.snake];
        // console.log("Snake position :", state.snake);
        // console.log("Action Payload: ", action);
        
        newSnake = [{
            // New x and y coordinates
            x: state.snake[0].x + action.payload[0],
            y: state.snake[0].y + action.payload[1],
        }, ...newSnake];
        newSnake.pop();

        return {
            ...state, snake: newSnake
        };

        case SET_DIS_DIRECTION:
            return {...state, disallowedDirection: action.payload };

        case INCREASE_SNAKE:
            const snakeLen = state.snake.length;
            console.log("Snake Length: ", snakeLen);
            
            return {
                ...state, 
                    snake: [
                        ...state.snake, 
                        {
                            x: state.snake[snakeLen- 1].x - 20, y: state.snake[snakeLen- 1].y -20
                        },
                    ],
                };

        case INCREMENT_SCORE:
            console.log("State Score :", state.score); 
                return {...state, score: state.score + 1};
        
        case RESET_SCORE:
            return {...state, score: 0};

        case RESET: 
            return {...state, 
                snake: [ 
                    { x: 580, y: 300 },
                    { x: 560, y: 300 },
                    { x: 540, y: 300 },
                    { x: 520, y: 300 },
                    { x: 500, y: 300 },
                ],
                disallowedDirection: ""
            };
        default:
            return state;
    }
}

export default gameReducer;