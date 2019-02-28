import { Vector } from "./Vector";
import { World } from "./World";
import { GraphEdge } from "./GraphEdge";

export class GraphNode {
    public position: Vector;
    public neighbours: Array<GraphEdge>;
    public world: World;
    public known: boolean = false;
    public distance: number = 0;
    public previousNode: GraphNode;

    constructor(x: number, y: number, world: World) {
        this.world = world;
        this.position = new Vector(x, y);
        this.neighbours = [];
    }

    public draw(): void {
        let ctx = this.world.ctx;
        ctx.fillStyle = 'rgb(255, 0, 0)';
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 3, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        // for (let key in this.neighbours) {
        //     ctx.beginPath();
        //     ctx.moveTo(this.position.x, this.position.y);
        //     ctx.lineTo(this.neighbours[key].destination.position.x, this.neighbours[key].destination.position.y);
        //     ctx.closePath();
        //     ctx.stroke();
        // }

        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(this.previousNode.position.x, this.previousNode.position.y);
        ctx.closePath();
        ctx.stroke();
    }
}