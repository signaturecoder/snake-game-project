// create two types of sagas - watcherSaga and workerSaga

import { CallEffect, delay, put, PutEffect, takeLatest } from "@redux-saga/core/effects";
import { DOWN, ISnakeCoord, LEFT, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP, RIGHT, setDisDirection, UP } from "../actions"


// move saga - worker saga
export function* moveSaga(params: {type: string; payload: ISnakeCoord;}): Generator<
| PutEffect<{ type: string; payload: ISnakeCoord}>
| PutEffect<{ type: string; payload: string }>
| CallEffect<true>
> {
    console.log("coming from move saga", params);
    // while(true) {
        // dispatches movement actions
        yield put({
            type: params.type.split("_")[1],
            payload: params.payload,
        });

        // Dispatches SET_DIS_DIRECTION action
        switch(params.type.split("_")[1]) {
            case RIGHT:
                yield put(setDisDirection(LEFT));
                break;
            case LEFT: 
                yield put(setDisDirection(RIGHT));
                break;
            case UP:
                yield put(setDisDirection(DOWN));
                break;
            case DOWN: 
                yield put(setDisDirection(UP));
                break;
        }
        yield delay(100);
    // }
}


// this saga will watch for the below actions and execute the moveSaga fn ( worker saga )
function* watcherSaga() {
    console.log("coming from watcherSaga ");
    
    yield takeLatest(
        [MOVE_RIGHT, MOVE_LEFT, MOVE_UP, MOVE_DOWN],
        moveSaga
    );
}




export default watcherSaga;