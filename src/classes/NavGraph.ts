import { GraphNode } from "../GraphNode";
import { World } from "./World";

export class NavGraph {
    public nodes: Array<GraphNode>;
    public world: World;

    constructor(size: number, world: World) {
        this.nodes = [];
        this.world = world;
        this.floodFill();
    }

    public floodFill(): void {
        this.nodes.push(new GraphNode(10, 10, this.world));

    }

    public draw(): void {
        let ctx = this.world.ctx;
        for (let key in this.nodes) {
            this.nodes[key].draw();
        }
    }

}