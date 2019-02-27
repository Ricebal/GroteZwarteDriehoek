import { GraphNode } from "./GraphNode";
import { World } from "./World";

export class NavGraph {
    public nodes: Array<GraphNode>;
    public world: World;
    public gridSize: number;

    constructor(gridSize: number, world: World) {
        this.nodes = [];
        this.world = world;
        this.gridSize = gridSize;
        this.floodFill(10, 10);
        this.connectNodes();
        console.log(this.nodes);
    }

    public floodFill(x: number, y: number): void {
        // Check if inside gameworld
        if (x > this.world.width || x < 0 || y > this.world.height || y < 0)
            return;

        const newNode: GraphNode = new GraphNode(x, y, this.world);

        // Check if valid space
        if (this.nodes.some(e => e.position.x === x && e.position.y === y))
            return;

        this.nodes.push(newNode);
        this.floodFill(x + this.gridSize, y);
        this.floodFill(x - this.gridSize, y);
        this.floodFill(x, y + this.gridSize);
        this.floodFill(x + this.gridSize, y + this.gridSize);
        this.floodFill(x + this.gridSize, y - this.gridSize);
        this.floodFill(x - this.gridSize, y + this.gridSize);
        this.floodFill(x - this.gridSize, y - this.gridSize);
    }

    private connectNodes(): void {
        for (let i in this.nodes) {
            for (let j in this.nodes) {
                if (
                    this.nodes[i].position.x <= this.nodes[j].position.x + this.gridSize &&
                    this.nodes[i].position.x >= this.nodes[j].position.x - this.gridSize &&
                    this.nodes[i].position.y <= this.nodes[j].position.y + this.gridSize &&
                    this.nodes[i].position.y >= this.nodes[j].position.y - this.gridSize &&
                    !(this.nodes[i].position.x === this.nodes[j].position.x && this.nodes[i].position.y === this.nodes[j].position.y)
                ) {
                    this.nodes[i].neighbours.push(this.nodes[j]);
                }
            }
        }
    }

    public draw(): void {
        let ctx = this.world.ctx;
        for (let key in this.nodes) {
            this.nodes[key].draw();
        }
    }

}