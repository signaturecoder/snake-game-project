import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseSnake, INCREMENT_SCORE, makeMove, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP, scoreUpdates } from "../store/actions";
import { IGlobalState } from "../store/reducers";
import { clearBoard, drawObject, generateRandomPosition, IObjectBody } from "../utilities";

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
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // create an instance of a RefObject that can take a ref of type "HTMLElement"; the "RefObject" has a single property "current" that can
    // be set to either "null" or an "HTMLElement" instance., Here the ref is initialized with null because the component is not rendered yet.
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

    const [pos, setPos] = useState<IObjectBody>(generateRandomPosition(width - 20, height - 20));
    const [isConsumed, setIsConsumed] = useState<Boolean>(false);
    // dispatching actions based on their coordinates
    const moveSnake = useCallback((dx = 0, dy = 0, ds: string) => {
        console.log(" DS :", ds);
        console.log("Start game dimenstion: dx", dx);
        console.log("Start game dimenstion: dy", dy);
        
        
        if(dx > 0 && dy === 0 && ds !== "RIGHT"){
            dispatch(makeMove(dx, dy, MOVE_RIGHT));
        }

        if(dx < 0 && dy === 0 && ds !== "LEFT"){
            dispatch(makeMove(dx, dy, MOVE_LEFT));
        }

        if(dx === 0 && dy < 0 && ds !== "DOWN"){
            dispatch(makeMove(dx, dy, MOVE_DOWN));
        }

        if(dx === 0 && dy > 0 && ds !== "UP"){
            dispatch(makeMove(dx, dy, MOVE_UP));
        }
    }, [dispatch]);

    // memoized the function  which called on every state change i,e disallowedDirection and moveSnake
    // called this function on every key pressed on Keyboard
    const handleKeyEvents = useCallback((event: KeyboardEvent) => {
        console.log("Key :", event.key);
        
        console.log("Disallowed direction - Canvas Board : ", disallowedDirection)
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

    // useEffect 2
    useEffect(() => {
        if(isConsumed) {
            console.log("inside is comsumed true statement");
            const pos = generateRandomPosition(width - 20, height - 20);
            setPos(pos);
            setIsConsumed(false);
            // Increase snake size when the object is consumed successfully
            dispatch(increaseSnake());

            // Increament the score
            dispatch(scoreUpdates());
        }
    }, [isConsumed, pos, height, width, dispatch])
    // useEffect 1
    useEffect(() => {
        // Draw on canvas each time
        console.log("After Context Changed:", context);
        setContext(canvasRef.current && canvasRef.current.getContext("2d")); // store in state variable
        clearBoard(context);
        drawObject(context, snake1, "#91C483"); // Draws snake at the required position
        drawObject(context, [pos], "#676FA3"); // Draws fruit randomly

        // when the object is consumed 
        if(snake1[0].x === pos?.x && snake1[0].y === pos?.y){
            setIsConsumed(true);
        }
    
    }, [context, pos,  snake1])

    // useEffect 0
    useEffect(() => {
        window.addEventListener("keypress", handleKeyEvents);
        console.log("key pressed useEffect");
        
        return () => {
            window.removeEventListener("keypress", handleKeyEvents);
        };
    }, [disallowedDirection, handleKeyEvents]);

    console.log("Context:", context);
    console.log("Snake 1: From Global State ", snake1);
    

    return (
        <canvas 
        ref={canvasRef}
        style={{
            border: "3px solid black",
        }}
        height={height}
        width={width}
        />
    )
}

export default CanvasBoard;
