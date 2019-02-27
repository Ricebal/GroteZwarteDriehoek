import { Vector } from "./classes/Vector";
import { World } from "./classes/World";

export class GraphNode {
    public position: Vector;
    public neighbours: Array<GraphNode>;
    public world: World;

    constructor(x: number, y: number, world: World) {
        this.world = world;
        this.position = new Vector(x, y);
        this.neighbours = [];
    }

    public draw(): void {
        let ctx = this.world.ctx;
        ctx.fillStyle = 'rgb(255, 0, 0)';
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 4, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }
}