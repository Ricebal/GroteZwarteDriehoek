import { BaseGameEntity } from "./entities/BaseGameEntity";
import { Planet } from "./entities/Planet";
import { BigBlackTriangle } from "./entities/BigBlackTriangle";
import { SmallBlueCircle } from "./entities/SmallBlueCircle";
import { Vector } from "./Vector";
import { Config } from "./Config";
import { NavGraph } from "./graph/NavGraph";
import { SmallBlackTriangle } from "./entities/SmallBlackTriangle";
import { MovingGameEntity } from "./entities/MovingGameEntity";

export class World {
    private _canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    public gameObjects: Array<BaseGameEntity>;
    public navGraph: NavGraph;

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        this._canvas.width = Config.canvasSize.x;
        this._canvas.height = Config.canvasSize.y;
        this._canvas.addEventListener("click", this.onMouseClick, false);
        this.ctx = this._canvas.getContext("2d");
        this.gameObjects = [];
        this.gameObjects.push(new BigBlackTriangle(200, 200, this));
        this.gameObjects.push(new SmallBlackTriangle(Math.random() * 900, Math.random() * 900, this));
        this.gameObjects.push(new SmallBlackTriangle(Math.random() * 900, Math.random() * 900, this));
        this.gameObjects.push(new SmallBlackTriangle(Math.random() * 900, Math.random() * 900, this));
        // this.gameObjects.push(new SmallBlackTriangle(Math.random() * 900, Math.random() * 900, this));
        // this.gameObjects.push(new SmallBlackTriangle(Math.random() * 900, Math.random() * 900, this));
        // this.gameObjects.push(new SmallBlackTriangle(Math.random() * 900, Math.random() * 900, this));
        this.gameObjects.push(new SmallBlackTriangle(Math.random() * 900, Math.random() * 900, this));
        this.gameObjects.push(new SmallBlueCircle(600, 600, this));
        for (let i = 0; i < 0; i++) {
            this.gameObjects.push(new Planet(this));
        }

        this.gameObjects.forEach(e => {
            if (e instanceof SmallBlackTriangle) {
                this.gameObjects.forEach(x => {
                    if (x instanceof SmallBlackTriangle)
                        e.group.push(x);
                });
            }
        });


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
}