import { BaseGameEntity } from "./entities/BaseGameEntity";
import { Planet } from "./entities/Planet";
import { BigBlackTriangle } from "./entities/BigBlackTriangle";
import { SmallBlueCircle } from "./entities/SmallBlueCircle";
import { Vector } from "./Vector";
import { Config } from "./Config";
import { NavGraph } from "./graph/NavGraph";
import { SmallBlackTriangle } from "./entities/SmallBlackTriangle";
import { MovingGameEntity } from "./entities/MovingGameEntity";
import { ObstacleAvoidBehaviour } from "./behaviours/ObstacleAvoidBehaviour";
import { SeekBehaviour } from "./behaviours/SeekBehaviour";
import { GoalSeek } from "./goals/GoalSeek";
import { GoalDestroyTerrain } from "./goals/GoalDestroyTerrain";
import { StaticGameEntity } from "./entities/StaticGameEntity";
import { GoalWanderTillLOS } from "./goals/GoalWanderTillLOS";

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
        this.gameObjects.push(new SmallBlueCircle(600, 600, this));
        (<BigBlackTriangle>this.gameObjects[0]).behaviours.push(new SeekBehaviour((<BigBlackTriangle>this.gameObjects[0]), (<BigBlackTriangle>this.gameObjects[1]).position))
        this.gameObjects.push(new SmallBlackTriangle(Math.random() * 900, Math.random() * 900, this));
        this.gameObjects.push(new SmallBlackTriangle(Math.random() * 900, Math.random() * 900, this));
        this.gameObjects.push(new SmallBlackTriangle(Math.random() * 900, Math.random() * 900, this));
        this.gameObjects.push(new SmallBlackTriangle(Math.random() * 900, Math.random() * 900, this));

        for (let i = 0; i < 40; i++) {
            let s = new Planet(this);
            let isok = true;
            for (let j = 5; j < this.gameObjects.length; j++) {
                if (Vector.distanceSq(s.position, this.gameObjects[j].position) < (Math.pow((<Planet>this.gameObjects[j]).size, 2) + Math.pow(s.size, 2)) + 5000) {
                    isok = false;
                }
            }
            if (isok)
                this.gameObjects.push(s);

        }

        this.navGraph = new NavGraph(30, this);

        this.gameObjects.forEach(e => {
            if (e instanceof SmallBlackTriangle) {
                this.gameObjects.forEach(x => {
                    if (x instanceof SmallBlackTriangle)
                        e.group.push(x);
                });
                // Each small black triangle gets a random goal all ending in following Big Black Triangle
                let randomNumber = Math.random();
                if (randomNumber > 0 && randomNumber < 0.333) {
                    e.goal = new GoalSeek(e, <MovingGameEntity>e.world.gameObjects[0]);
                } else if (randomNumber < 0.666) {
                    e.goal = new GoalDestroyTerrain(e, <StaticGameEntity>e.world.gameObjects[Math.floor(Math.random() * (e.world.gameObjects.length - 6)) + 6]);
                } else {
                    e.goal = new GoalWanderTillLOS(e, <MovingGameEntity>e.world.gameObjects[0]);
                }
            }
        })
    }

    public render(): void {
        this.ctx.fillStyle = `rgb(${0})`;
        this.ctx.fillRect(0, 0, Config.canvasSize.x, Config.canvasSize.y);
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