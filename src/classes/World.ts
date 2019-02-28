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
    public gameObjects: Array<BaseGameEntity>;
    public planets: Array<Planet>;
    public navGraph: NavGraph;

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        this._canvas.width = Config.canvasSize.x;
        this._canvas.height = Config.canvasSize.y;
        // this._canvas.addEventListener("mousemove", this.onMouseMove, false);
        this._canvas.addEventListener("click", this.onMouseClick, false);
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
        this.navGraph = new NavGraph(30, this);
    }

    public render(): void {
        this.ctx.clearRect(0, 0, Config.canvasSize.x, Config.canvasSize.y);
        if (Config.navGridVisualEnabled)
            this.navGraph.draw();

        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].update();
        }
    }

    public onMouseClick(e: MouseEvent): void {
        let rect = e.srcElement.getBoundingClientRect();
        Config.mousePos = new Vector(e.clientX - rect.left, e.clientY - rect.top);
    }

    // public onMouseMove(e: MouseEvent): void {
    //     let rect = e.srcElement.getBoundingClientRect();
    //     Config.mousePos = new Vector(e.clientX - rect.left, e.clientY - rect.top);
    // }
}