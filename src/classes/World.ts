import { BaseGameEntity } from "./BaseGameEntity";
import { Planet } from "./Planet";
import { BigBlackTriangle } from "./BigBlackTriangle";
import { SmallBlueCircle } from "./SmallBlueCircle";
import { Vector } from "./Vector";
import { Config } from "./Config";
import { NavGraph } from "./NavGraph";

export class World {
    private _canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    public height: number = 900;
    public width: number = 900;
    public gameObjects: Array<BaseGameEntity>;
    public planets: Array<Planet>;
    public navGraph: NavGraph;

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        this._canvas.width = this.width;
        this._canvas.height = this.height;
        this._canvas.addEventListener("mousemove", this.onMouseMove, false);
        this.ctx = this._canvas.getContext("2d");
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
        this.navGraph = new NavGraph(15, this);
    }

    public render(): void {
        this.ctx.clearRect(0, 0, this.width, this.height);
        if (Config.navGridVisualEnabled)
            this.navGraph.draw();

        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].update();
        }
    }

    public onMouseMove(e: MouseEvent): void {
        let rect = e.srcElement.getBoundingClientRect();
        Config.mousePos = new Vector(e.clientX - rect.left, e.clientY - rect.top);
    }
}