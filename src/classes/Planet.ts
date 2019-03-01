import { Vector } from './Vector';
import { StaticGameEntity } from './StaticGameEntity';

export class Planet extends StaticGameEntity {
    private right: boolean;
    private up: boolean;
    private vSpeed: number;
    private hSpeed: number;

    constructor(x: number, y: number, context: CanvasRenderingContext2D) {
        super(x, y, context);
    }


    public update(): void {
        this.draw();
    }

    private draw(): void {
        this.ctx.beginPath();
        this.ctx.arc(this.position.x + 10, this.position.y + 10, 20, 0, 2 * Math.PI);
        this.ctx.stroke();
    }
}