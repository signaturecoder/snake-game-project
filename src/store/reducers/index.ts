export interface ISnakeCoord {
    x: number;
    y: number;
}

export interface IGlobalState {
    snake: ISnakeCoord[] | [];
}

const GlobalState: IGlobalState = {
    snake: [
        { x: 580, y: 300 },
        { x: 560, y: 300 },
        { x: 540, y: 300 },
        { x: 520, y: 300 },
        { x: 500, y: 300 },
    ] 
};

const gameReducer = (state = GlobalState, action: any) => {
    switch(action.type) {
        case "MOVE_RIGHT": 
        /*
            Perform a certain set of operations
        */
        return {
            ...state, data: action.payload
        };

        default:
            return state;
    }
}

export default gameReducer;