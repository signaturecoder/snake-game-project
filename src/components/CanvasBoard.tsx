import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { IGlobalState } from "../store/reducers";
import { drawObject, generateRandomPosition, IObjectBody } from "../utilities";

export interface ICanvasBoard {
    height: number;
    width: number;
}
// Canvas Board dimension (height * width) 600 * 1000 divides into blocks of dimenstion (20 * 20)
const CanvasBoard = ({ height, width }: ICanvasBoard) => {

    // create a canvas Ref to pass it into canvas element.
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // create an instance of a RefObject that can take a ref of type "HTMLElement"; the "RefObject" has a single property "current" that can
    // be set to either "null" or an "HTMLElement" instance., Here the ref is initialized with null because the component is not rendered yet.
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

    // get the snake position from global state
    const snake1 = useSelector((state: IGlobalState) => state.snake);
    const [pos, setPos] = useState<IObjectBody>(generateRandomPosition(width -20, height- 20));
    
    useEffect(() => {
        // Draw on canvas each time
        setContext(canvasRef.current && canvasRef.current.getContext("2d")); // store in state variable
        drawObject(context, snake1, "#91C483"); // Draws snake at the required position
        drawObject(context, [pos], "#676FA3"); // Draws fruit randomly
    }, [context])

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