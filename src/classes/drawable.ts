import { Vector } from "./vector";

export class Drawable {
    public position: Vector;
    public ctx: CanvasRenderingContext2D;

    constructor(x: number, y: number, context: CanvasRenderingContext2D) {
        this.position = new Vector(x, y);
        this.ctx = context;
    }

    public update(): void {

    }
}