import { GraphNode } from "./GraphNode";
import { World } from "./World";
import { Config } from "./Config";
import { GraphEdge } from "./GraphEdge";

export class NavGraph {
    public nodes: Array<GraphNode>;
    public world: World;
    public gridSize: number;
    public path: Array<GraphNode>;

    constructor(gridSize: number, world: World) {
        this.nodes = [];
        this.world = world;
        this.gridSize = gridSize;
        this.floodFill(10, 10);
        this.connectNodes();

        this.findPath(this.nodes[5], this.nodes[576]);
    }

    public findPath(start: GraphNode, destination: GraphNode): void /* Array<GraphNode> */ {
        let priorityQueue: Array<GraphNode> = [start];
        while (priorityQueue.length > 0) {
            let currentNode: GraphNode = priorityQueue[0];

            // Get highest prio node
            for (let key in priorityQueue) {
                if (!priorityQueue[key].known && priorityQueue[key].distance < currentNode.distance)
                    currentNode = priorityQueue[key];
            }

            // Fill priority queue
            for (let key in currentNode.neighbours) {
                if (!currentNode.neighbours[key].destination.known) {
                    currentNode.neighbours[key].destination.distance = currentNode.distance + currentNode.neighbours[key].cost;
                    priorityQueue.push(currentNode.neighbours[key].destination);
                    currentNode.neighbours[key].destination.previousNode = currentNode;
                    currentNode.neighbours[key].destination.known = true;
                }
            }

            // Set current known to true and remove from queue
            currentNode.known = true;
            priorityQueue = priorityQueue.filter((value, index, arr) => {
                return value !== currentNode;
            });
        }
        this.path = [];
        this.listPath(destination, this.path);

        // return;
    }

    private listPath(node: GraphNode, array: Array<GraphNode>) {
        if (!node.previousNode)
            return;

        this.listPath(node.previousNode, array);
        array.push(node);
    }

    public floodFill(x: number, y: number): void {
        // Check if inside gameworld
        if (x > Config.canvasSize.x || x < 0 || y > Config.canvasSize.y || y < 0)
            return;

        // Check if valid space
        if (this.nodes.some(e => e.position.x === x && e.position.y === y))
            return;

        const newNode: GraphNode = new GraphNode(x, y, this.world);

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
                    this.nodes[i].neighbours.push(new GraphEdge(this.nodes[j], this.world));
                }
            }
        }
    }

    public draw(): void {
        let ctx = this.world.ctx;
        for (let key in this.path) {
            this.path[key].draw();
        }
    }

}