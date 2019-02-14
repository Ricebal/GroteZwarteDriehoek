import { BaseGameEntity } from "./BaseGameEntity";
import { Planet } from "./planet";
import { BigBlackTriangle } from "./BigBlackTriangle";

export class World {
    private canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    private height: number = 900;
    private width: number = 900;
    public gameObjects: Array<BaseGameEntity>;
    public static planets: Array<Planet>;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext("2d");
        this.gameObjects = [];
        World.planets = [];
        this.gameObjects.push(new BigBlackTriangle(200, 200, this));
        this.gameObjects.push(new Planet(450, 450, this));
        for (let i = 0; i < this.gameObjects.length; i++) {
            if (this.gameObjects[i] instanceof Planet) {
                World.planets.push(<Planet>this.gameObjects[i]);
            }
        }
    }

    public render(): void {
        this.ctx.clearRect(0, 0, this.width, this.height);
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].update();
        }
    }
}