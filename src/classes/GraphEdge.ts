import { GraphNode } from "./GraphNode";
import { World } from "./World";

export class GraphEdge {
    public destination: GraphNode;
    public cost: number = 1;
    private _world: World;

    constructor(destination: GraphNode, world: World) {
        this.destination = destination;
        this._world = world;
    }
}