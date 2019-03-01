import { GraphNode } from "./GraphNode";
import { World } from "./World";

export class GraphEdge {
    public destination: GraphNode;
    public cost: number;
    private _world: World;

    constructor(destination: GraphNode, world: World, cost: number = 1) {
        this.destination = destination;
        this._world = world;
        this.cost = cost;
    }
}