import { BaseGameEntity } from "./BaseGameEntity";
import { Planet } from "./Planet";
import { BigBlackTriangle } from "./BigBlackTriangle";
import { SmallBlueCircle } from "./SmallBlueCircle";
import { Vector } from "./Vector";
import { Config } from "./Config";

export class World {
    private canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;

    private height: number = 900;
    private width: number = 900;
    public gameObjects: Array<BaseGameEntity>;
    public planets: Array<Planet>;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.addEventListener("mousemove", this.onMouseMove, false);
        this.ctx = this.canvas.getContext("2d");
        this.gameObjects = [];
        this.planets = [];
        this.gameObjects.push(new Planet(450, 450, this));
        this.gameObjects.push(new BigBlackTriangle(200, 200, this));
        this.gameObjects.push(new SmallBlueCircle(600, 600, this));
        for (let i = 0; i < this.gameObjects.length; i++) {
            if (this.gameObjects[i] instanceof Planet) {
                this.planets.push(<Planet>this.gameObjects[i]);
            }
        }
    }

    public render(): void {
        this.ctx.clearRect(0, 0, this.width, this.height);
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].update();
        }
    }

    public onMouseMove(e: MouseEvent): void {
        let rect = e.srcElement.getBoundingClientRect();
        Config.mousePos = new Vector(e.clientX - rect.left, e.clientY - rect.top);
    }
}