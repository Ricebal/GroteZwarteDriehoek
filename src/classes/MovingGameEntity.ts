import { BaseGameEntity } from "./BaseGameEntity";

export class MovingGameEntity extends BaseGameEntity {
    constructor(x: number, y: number, context: CanvasRenderingContext2D) {
        super(x, y, context);
    }
}