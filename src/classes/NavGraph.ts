import { GraphNode } from "./GraphNode";
import { World } from "./World";
import { Config } from "./Config";
import { GraphEdge } from "./GraphEdge";
import { Vector } from "./Vector";

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

    }

    public findPath(start: Vector, destination: Vector): Array<Vector> {
        this.nodes.forEach(e => {
            e.known = false;
            e.previousNode = null;
            e.distance = 0;
            e.heuristic = Math.abs(e.position.x - destination.x) + Math.abs(e.position.y - destination.y);
        });

        let startNode: GraphNode = this.nodes[0];
        let destinationNode: GraphNode = this.nodes[0];

        this.nodes.forEach(e => {
            if ((Math.abs(start.x - e.position.x) * 2) + (Math.abs(start.y - e.position.y) * 2) < (Math.abs(startNode.position.x - e.position.x) * 2) + (Math.abs(startNode.position.y - e.position.y) * 2))
                startNode = e;

            if ((Math.abs(destination.x - e.position.x) * 2) + (Math.abs(destination.y - e.position.y) * 2) < (Math.abs(destinationNode.position.x - e.position.x) * 2) + (Math.abs(destinationNode.position.y - e.position.y) * 2))
                destinationNode = e;
        });

        let nodePath: Array<GraphNode> = this.findPathAlgoritm(startNode, destinationNode);
        let vectorPath: Array<Vector> = [];
        nodePath.forEach(e => {
            vectorPath.push(e.position);
        });

        return vectorPath;
    }

    public findPathAlgoritm(start: GraphNode, destination: GraphNode): Array<GraphNode> {
        let priorityQueue: Array<GraphNode> = [start];
        while (priorityQueue.length > 0) {
            let currentNode: GraphNode = priorityQueue[0];

            // Get highest prio node
            priorityQueue.forEach(e => {
                if (!e.known && e.distance < currentNode.distance)
                    currentNode = e;
            });

            // Fill priority queue
            currentNode.neighbours.forEach(e => {
                if (!e.destination.known || e.destination.distance > currentNode.distance + e.cost + e.destination.heuristic) {
                    e.destination.distance = currentNode.distance + e.cost + e.destination.heuristic;
                    priorityQueue.push(e.destination);
                    e.destination.previousNode = currentNode;
                    e.destination.known = true;
                }
            });

            // Set current known to true and remove from queue
            currentNode.known = true;
            priorityQueue = priorityQueue.filter((value, index, arr) => {
                return value !== currentNode;
            });
        }
        this.path = [];
        this.listPath(destination, this.path);

        return this.path;
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
        this.nodes.forEach(node1 => {
            this.nodes.forEach(node2 => {
                if (
                    node1.position.x <= node2.position.x + this.gridSize &&
                    node1.position.x >= node2.position.x - this.gridSize &&
                    node1.position.y <= node2.position.y + this.gridSize &&
                    node1.position.y >= node2.position.y - this.gridSize &&
                    !(node1.position.x === node2.position.x && node1.position.y === node2.position.y)
                ) {
                    if (node1.position.x != node2.position.x && node1.position.y != node2.position.y) {
                        node1.neighbours.push(new GraphEdge(node2, this.world, 1.5));
                    } else {
                        node1.neighbours.push(new GraphEdge(node2, this.world, 1));
                    }
                }
            });
        });
    }

    public draw(): void {
        let ctx = this.world.ctx;
        for (let key in this.nodes) {
            this.nodes[key].draw();
        }
    }

}