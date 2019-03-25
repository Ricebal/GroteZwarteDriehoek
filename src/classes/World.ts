import { BaseGameEntity } from "./entities/BaseGameEntity";
import { Planet } from "./entities/Planet";
import { BigBlackTriangle } from "./entities/BigBlackTriangle";
import { SmallBlueCircle } from "./entities/SmallBlueCircle";
import { Vector } from "./Vector";
import { Config } from "./Config";
import { NavGraph } from "./graph/NavGraph";
import { SmallBlackTriangle } from "./entities/SmallBlackTriangle";
import { MovingGameEntity } from "./entities/MovingGameEntity";
import { FuzzyModule } from "./fuzzy/FuzzyModule";
import { FuzzyAnd } from "./fuzzy/FuzzyAnd";
import { FuzzyTerm } from "./fuzzy/FuzzyTerm";
import { FuzzyVariable } from "./fuzzy/FuzzyVariable";
import { FuzzySetLeftShoulder } from "./fuzzy/FuzzySetLeftShoulder";
import { FuzzySet } from "./fuzzy/FuzzySet";
import { FuzzyVery } from "./fuzzy/FuzzyVery";

export class World {
    private _canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    public gameObjects: Array<BaseGameEntity>;
    public navGraph: NavGraph;
    public fuzzyModule: FuzzyModule;

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        this._canvas.width = Config.canvasSize.x;
        this._canvas.height = Config.canvasSize.y;
        this._canvas.addEventListener("click", this.onMouseClick, false);
        this.ctx = this._canvas.getContext("2d");
        this.gameObjects = [];
        this.gameObjects.push(new BigBlackTriangle(200, 200, this));
        this.gameObjects.push(new SmallBlueCircle(600, 600, this));
        this.gameObjects.push(new SmallBlackTriangle(Math.random() * 900, Math.random() * 900, this));
        this.gameObjects.push(new SmallBlackTriangle(Math.random() * 900, Math.random() * 900, this));
        this.gameObjects.push(new SmallBlackTriangle(Math.random() * 900, Math.random() * 900, this));
        // this.gameObjects.push(new SmallBlackTriangle(Math.random() * 900, Math.random() * 900, this));
        // this.gameObjects.push(new SmallBlackTriangle(Math.random() * 900, Math.random() * 900, this));
        // this.gameObjects.push(new SmallBlackTriangle(Math.random() * 900, Math.random() * 900, this));
        this.gameObjects.push(new SmallBlackTriangle(Math.random() * 900, Math.random() * 900, this));
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

        this.initializeFuzzyModule();

        this.navGraph = new NavGraph(30, this);
    }

    public getDesirability(distToTarget: number) {
        this.fuzzyModule.fuzzify('distToTarget', distToTarget);
        const lastDesirabilityScore = this.fuzzyModule.defuzzify('desirability', 'maxav');
        return lastDesirabilityScore;
    }

    public initializeFuzzyModule(): void {
        this.fuzzyModule = new FuzzyModule();
        let distToTarget: FuzzyVariable = this.fuzzyModule.createFLV('distToTarget');
        let targetClose: FuzzySet = distToTarget.addLeftShoulderSet('targetClose', 0, 25, 150);
        let targetMedium: FuzzySet = distToTarget.addTriangularSet('targetMedium', 25, 150, 300);
        let targetFar: FuzzySet = distToTarget.addRightShoulderSet('targetFar', 150, 300, 1000);

        let desirability: FuzzyVariable = this.fuzzyModule.createFLV('desirability');
        let veryDesirable: FuzzySet = desirability.addRightShoulderSet('veryDesirable', 50, 75, 100);
        let desirable: FuzzySet = desirability.addTriangularSet('desirable', 25, 50, 75);
        let undesirable: FuzzySet = desirability.addLeftShoulderSet('undesirable', 0, 25, 50);

        this.fuzzyModule.addRule(targetClose, desirable);
        this.fuzzyModule.addRule(targetMedium, undesirable);
        this.fuzzyModule.addRule(targetFar, undesirable);
    }

    public render(): void {
        let ctx: CanvasRenderingContext2D = this.ctx;
        ctx.clearRect(0, 0, Config.canvasSize.x, Config.canvasSize.y);
        if (Config.navGridVisualEnabled)
            this.navGraph.draw();

        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].update();
        }

        ctx.fillStyle = 'rgba(0, 0, 0, 1)'
        ctx.font = "15px Georgia";
        let distance = Vector.distance(this.gameObjects[0].position, this.gameObjects[1].position);
        ctx.fillText(`Desirability: ${this.getDesirability(distance)}`, 30, 30);
        ctx.fillText(`Distance: ${distance}`, 30, 45);
    }

    public onMouseClick(e: MouseEvent): void {
        let rect = e.srcElement.getBoundingClientRect();
        Config.mousePos = new Vector(e.clientX - rect.left, e.clientY - rect.top);
    }
}