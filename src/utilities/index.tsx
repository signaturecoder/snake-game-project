// clear the canvas board
export const clearBoard = (context: CanvasRenderingContext2D | null) => {
    if(context){
        context.clearRect(0, 0, 1000, 600);
    }
};


// object interface
export interface IObjectBody {
    x: number;
    y: number;
} 

// draw an object 
/**
 * 
 * @param context - A 2D context object for drawing the object on the canvas.
 * @param objectBody - An array of objects with each object having x and y properties like "IObjectBody" interface
 * @param fillColor - Color to be filled inside the Object
 * @param strokeStyle - Color to be filled in the outline of the object. Defaults to "#146356" 
 */
export const drawObject = (
    context: CanvasRenderingContext2D | null,
    objectBody: IObjectBody[],
    fillColor: string,
    strokeStyle = "#146356"
    ) => {
    if(context) {
        objectBody.forEach((object: IObjectBody) => {
            context.fillStyle = fillColor;
            context.strokeStyle = strokeStyle;
            context?.fillRect(object.x, object.y, 20, 20);
            context?.strokeRect(object.x , object.y, 20, 20);
        })
    }
}

function randomNumber(min: number, max: number) {
    let random = Math.random() * max;
    return random - (random % 20);
}

export const generateRandomPosition = (width: number, height: number) => {
    return {
        x: randomNumber(0, width),
        y: randomNumber(0, height),
    };
};