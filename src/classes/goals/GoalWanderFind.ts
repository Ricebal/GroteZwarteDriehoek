
import { MovingGameEntity } from "../entities/MovingGameEntity";
import { Vector } from "../Vector";
import { Config } from "../Config";
import { CompositeGoal } from "./CompositeGoal";
import { Goal } from "./Goal";
import { PathfindingBehaviour } from "../behaviours/PathfindingBehaviour";
import { FollowBehaviour } from "../behaviours/FollowBehaviour";
import { SmallBlackTriangle } from "../entities/SmallBlackTriangle";
import { WanderBehaviour } from "../behaviours/WanderBehaviour";
import { Planet } from "../entities/Planet";
import { StaticGameEntity } from "../entities/StaticGameEntity";

export class GoalWanderFind extends Goal {

    private _hasBehaviour: boolean = false;
    public label: string = "Wander";
    public LOSGoal: number = 0;

    constructor(owner: MovingGameEntity) {
        super(owner);
    }
    // Checks if line goes trough or touches a circle
    public isInCircle(lineStart: Vector, lineEnd: Vector, target: Planet): boolean {
        let ax = lineEnd.x - lineStart.x;
        let ay = lineEnd.y - lineStart.y;
        let cx = target.position.x - lineStart.x;
        let cy = target.position.y - lineStart.y;
        let cv = new Vector(cx, cy);

        let s = (cx * ax + cy * ay) / (ax * ax + ay * ay);
        let d = new Vector(ax * s, ay * s);
        return this.isBetween(this.owner.position, this.owner.world.gameObjects[1].position, d.clone().add(this.owner.position)) && Vector.distanceSq(d.clone().add(this.owner.position), target.position) <= Math.pow(target.size, 2) && !target.isDestroyed;
    }

    public isBetween(a: Vector, b: Vector, c: Vector): boolean {
        return Vector.distance(a, c) + Vector.distance(c, b) === Vector.distance(a, b);
    }

    public apply() {
        if (!this._hasBehaviour) {
            console.log('added WanderBehaviour');
            this.owner.behaviours = [new WanderBehaviour(this.owner)];
            this._hasBehaviour = true;
        }
    }
    get isFinished(): boolean {
        let owner = this.owner;
        let context = this;
        let inLOS: boolean = false;
        let Planets: number = 0;
        let PlanetsOutOfLOS: number = 0;
        this.owner.world.gameObjects.forEach(function (element) {
            if (element instanceof Planet) {
                Planets++;
                if (!context.isInCircle(owner.position, owner.world.gameObjects[1].position, element)) {
                    PlanetsOutOfLOS++;
                }
            }
        });

        if (Planets === PlanetsOutOfLOS) {
            this.LOSGoal++;
        }
        if (this.LOSGoal > 20) {
            this.status = 'completed';
        }
        return this.status === 'completed';
    }

}