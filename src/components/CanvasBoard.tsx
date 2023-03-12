import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseSnake, INCREMENT_SCORE, makeMove, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP, scoreUpdates, stopGame, resetGame, RESET_SCORE } from "../store/actions";
import { IGlobalState } from "../store/reducers";
import { clearBoard, drawObject, generateRandomPosition, hasSnakeCollided, IObjectBody } from "../utilities";
import Instruction from "./Instructions";

export interface ICanvasBoard {
    height: number;
    width: number;
}
// Canvas Board dimension (height * width) 600 * 1000 divides into blocks of dimenstion (20 * 20)
const CanvasBoard = ({ height, width }: ICanvasBoard) => {

    const dispatch = useDispatch();
    // get the snake position from global state
    const snake1 = useSelector((state: IGlobalState) => state.snake);
    const disallowedDirection = useSelector((state: IGlobalState) => state.disallowedDirection);
    // create a canvas Ref to pass it into canvas element.
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // create an instance of a RefObject that can take a ref of type "HTMLElement"; the "RefObject" has a single property "current" that can
    // be set to either "null" or an "HTMLElement" instance., Here the ref is initialized with null because the component is not rendered yet.
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const [pos, setPos] = useState<IObjectBody>(generateRandomPosition(width - 20, height - 20));
    const [isConsumed, setIsConsumed] = useState<Boolean>(false);
    const [gameEnded, setGameEnded] = useState<Boolean>(false);
   
    // dispatching actions based on their coordinates
    const moveSnake = useCallback((dx = 0, dy = 0, ds: string) => {        
        if(dx > 0 && dy === 0 && ds !== "RIGHT"){
            dispatch(makeMove(dx, dy, MOVE_RIGHT));
        }

        if(dx < 0 && dy === 0 && ds !== "LEFT"){
            dispatch(makeMove(dx, dy, MOVE_LEFT));
        }

        if(dx === 0 && dy < 0 && ds !== "UP"){
            dispatch(makeMove(dx, dy, MOVE_UP));
        }

        if(dx === 0 && dy > 0 && ds !== "DOWN"){
            dispatch(makeMove(dx, dy, MOVE_DOWN));
        }

    }, [dispatch]);

    // memoized the function  which called on every state change i,e disallowedDirection and moveSnake
    // called this function on every key pressed on Keyboard
    const handleKeyEvents = useCallback((event: KeyboardEvent) => {
        if(disallowedDirection) {
            switch(event.key) {
                case "w": 
                    moveSnake(0, -20, disallowedDirection);
                    break;
                case "s": 
                    moveSnake(0, 20, disallowedDirection);
                    break;
                case "a": 
                    moveSnake(-20, 0, disallowedDirection);
                    break;
                case "d": 
                    event.preventDefault();
                    moveSnake(20, 0, disallowedDirection);
                    break;
            }
        } else {
            if (
                disallowedDirection !== "LEFT" && 
                disallowedDirection !== "UP" && 
                disallowedDirection !== "DOWN" && 
                event.key === "d"
            )
                moveSnake(20, 0, disallowedDirection); // Move RIGHT at sstart
        }
    }, 
    [disallowedDirection, moveSnake]);

    // reset Board
    const resetBoard = useCallback(() => {
        console.log('Reset Game Button Clicked!!');
        // remove listner from window object
        window.removeEventListener("keypress", handleKeyEvents);
        // dispatch reset Game action
        dispatch(resetGame());
        // dispatcj reset score action
        dispatch(scoreUpdates(RESET_SCORE));
        // clear the canvas
        clearBoard(context);
        // Draws snake at its initial position
        drawObject(context, snake1, "#91C483");
        // Drwas fruit at a new randowm position
        drawObject(context, [generateRandomPosition(width-20, height-20)], "#676FA3");
        // Add event listner to start the game again
        window.addEventListener("keypress", handleKeyEvents);

    }, [context, dispatch, handleKeyEvents, snake1, width, height]);

    // useEffect 2
    useEffect(() => {
        console.log("Rendered Effect 2 isConsumed", isConsumed);
        
        if(isConsumed) {
            console.log(height + " " + width);
            const pos = generateRandomPosition(width - 20, height - 20);
            console.log("Position: ", pos);
            
            setPos(pos);
            setIsConsumed(false);
            console.log("Inside effect isconsumed", isConsumed);
            
            // Increase snake size when the object is consumed successfully
            dispatch(increaseSnake());

            // Increament the score
            dispatch(scoreUpdates(INCREMENT_SCORE));
        }
    }, [isConsumed, pos, height, width, dispatch]);

    // useEffect 1
    useEffect(() => {
        // Draw on canvas each time
        // console.log("After Context Changed:", context);
        // console.log("2nd position ", pos);
        
        setContext(canvasRef.current && canvasRef.current.getContext("2d")); // store in state variable
        clearBoard(context);
        drawObject(context, snake1, "#91C483"); // Draws snake at the required position
        drawObject(context, [pos], "#676FA3"); // Draws fruit randomly

        console.log("Before snake touch fruit");
        
        // when the object is consumed 
        if(snake1[0].x === pos?.x && snake1[0].y === pos?.y){
            console.log("When snake touch fruit");
            
            setIsConsumed(true);
        }

        //Checks if the snake has collided with itself
        if(hasSnakeCollided(snake1, snake1[0]) || 
        
        //Checks if the snake head is out of the boundries of the box 
        snake1[0].x >= width || snake1[0].x <= 0 || snake1[0].y <= 0 || snake1[0].y >= height) {
            console.log("GAME ENDED !!!!");
            
            setGameEnded(true);
            dispatch(stopGame());
            window.removeEventListener("keypress", handleKeyEvents);
        } else {
            setGameEnded(false);
        }
    
    }, [context, pos, snake1, width, height, dispatch, handleKeyEvents]);

    // useEffect 0
    useEffect(() => {
        window.addEventListener("keypress", handleKeyEvents);
        return () => {
            window.removeEventListener("keypress", handleKeyEvents);
        };
    }, [disallowedDirection, handleKeyEvents]);

    // console.log("direction :", disallowedDirection);
    // console.log("Snake 1: From Global State ", snake1);
    

    return (
        <>
            <canvas 
                ref={canvasRef}
                style={{
                    border: `3px solid ${gameEnded ? "red" : "black"}`,
                }}
                height={height}
                width={width}
            />
            <Instruction resetBoard={resetBoard}/>
        </>
    )
}

export default CanvasBoard;
