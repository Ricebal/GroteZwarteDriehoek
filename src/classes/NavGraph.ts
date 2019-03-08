import { GraphNode } from "./GraphNode";
import { World } from "./World";
import { Config } from "./Config";
import { GraphEdge } from "./GraphEdge";
import { Vector } from "./Vector";
import { Planet } from "./Planet";

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
        // Reset each node
        this.nodes.forEach(e => {
            e.previousNode = null;
            e.distance = 0;
            e.heuristic = Math.sqrt(Vector.distanceSq(e.position, destination));
        });

        // Take arbitrary starting nodes, in this case first in list
        let startNode: GraphNode = this.nodes[0];
        let destinationNode: GraphNode = this.nodes[0];

        // Find the closest graph node to the starting positing and destination
        this.nodes.forEach(e => {
            if (Vector.distanceSq(start, e.position) < Vector.distanceSq(start, startNode.position))
                startNode = e;

            if (Vector.distanceSq(destination, e.position) < Vector.distanceSq(destination, destinationNode.position))
                destinationNode = e;
        });

        // Apply pathfinding algorithm
        let nodePath: Array<GraphNode> = this.findPathAlgoritm(startNode, destinationNode);

        //Convert graphnodes to vectors for the behaviour to parse
        let vectorPath: Array<Vector> = [];
        nodePath.forEach(e => {
            vectorPath.push(e.position);
        });

        return vectorPath;
    }

    public findPathAlgoritm(start: GraphNode, destination: GraphNode): Array<GraphNode> {
        let open: Array<GraphNode> = [start];
        let closed: Array<GraphNode> = [];

        while (open.length > 0) {
            let currentNode: GraphNode = open.reduce((a, b) => a.distance < b.distance ? a : b);

            if (currentNode === destination)
                break;

            open = open.filter((v, i, a) => { return v !== currentNode });
            closed.push(currentNode);

            currentNode.neighbours.forEach(edge => {
                let score: number = currentNode.distance + edge.cost;
                let scoreIsBest: boolean = false;

                if (!closed.some(e => e === edge.destination)) {

                    if (!open.some(e => e === edge.destination)) {
                        scoreIsBest = true;
                        open.push(edge.destination);
                    } else if (score + edge.destination.heuristic < edge.destination.distance && edge.destination.distance !== 0) {
                        scoreIsBest = true;
                    }

                    if (scoreIsBest) {
                        edge.destination.previousNode = currentNode;
                        edge.destination.distance = score;
                    }
                }
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

        // Check if a node is not in this space
        if (this.nodes.some(e => e.position.x === x && e.position.y === y))
            return;

        // Check if a planet is not in this space
        let planetFound: boolean = false;
        this.world.gameObjects.forEach(e => {
            if (e instanceof Planet) {
                if (Vector.distanceSq(e.position, new Vector(x, y)) < Math.pow(e.size, 2) * 1.2) {
                    planetFound = true;
                    return;
                }
            }
        });

        if (planetFound)
            return;

        // Add node to graph
        const newNode: GraphNode = new GraphNode(x, y, this.world);
        this.nodes.push(newNode);

        // Recursively fill the world
        this.floodFill(x + this.gridSize, y);
        this.floodFill(x - this.gridSize, y);
        this.floodFill(x, y + this.gridSize);
        this.floodFill(x + this.gridSize, y + this.gridSize);
        this.floodFill(x + this.gridSize, y - this.gridSize);
        this.floodFill(x - this.gridSize, y + this.gridSize);
        this.floodFill(x - this.gridSize, y - this.gridSize);
    }

    private connectNodes(): void {
        // Add neighbours to each node
        this.nodes.forEach(node1 => {
            this.nodes.forEach(node2 => {
                if (
                    node1.position.x <= node2.position.x + this.gridSize &&
                    node1.position.x >= node2.position.x - this.gridSize &&
                    node1.position.y <= node2.position.y + this.gridSize &&
                    node1.position.y >= node2.position.y - this.gridSize &&
                    !(node1.position.x === node2.position.x && node1.position.y === node2.position.y)
                ) {
                    let newNode: GraphEdge = new GraphEdge(node2, this.world, Math.sqrt(Vector.distanceSq(node1.position, node2.position)));
                    node1.neighbours.push(newNode);
                }
            });
        });
    }

    public draw(): void {
        for (let key in this.nodes) {
            this.nodes[key].draw();
        }
    }

}