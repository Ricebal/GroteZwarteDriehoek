
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

export class GoalWanderFind extends CompositeGoal {

    private _hasBehaviour: boolean = false;
    public label: string = "Wander";

    constructor(owner: MovingGameEntity) {
        super(owner);
    }

    // public inCircle(lineStart: Vector, lineEnd: Vector, target: StaticGameEntity): boolean {
    //     let x = Vector.distance(lineStart, lineEnd);
    //     if (((target.position.x - lineStart.x) * (lineEnd.y - lineStart.y) * (target.position.y - lineStart.y) * (lineEnd.x - lineStart.x) / x) <= (<Planet>target).size) {
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    // }

    public inCircle(lineStart: Vector, lineEnd: Vector, target: StaticGameEntity): boolean {
        let ax = lineStart.x - target.position.x;
        let ay = lineEnd.x - target.position.x;
        let bx = lineStart.y - target.position.y;
        let by = lineEnd.y - target.position.y;
        let a = Math.sqrt(ax) + Math.sqrt(ay) - Math.sqrt((<Planet>target).size);
        let b = 2 * (ax * (bx - ax) + ay * (by - ay));
        let c = Math.sqrt(bx - ax) + Math.sqrt(by - ay);
        let disc = Math.sqrt(b) - 4 * a * c;
        if (disc <= 0) return false;
        let sqrtdisc = Math.sqrt(disc);
        let t1 = (-b + sqrtdisc) / (2 * a);
        let t2 = (-b - sqrtdisc) / (2 * a);
        if ((0 < t1 && t1 < 1) || (0 < t2 && t2 < 1)) return true;
        return false;
    }

    public apply() {
        if (!this._hasBehaviour) {
            console.log('added wanderbehav');
            this.owner.behaviours = [new WanderBehaviour(this.owner)];
            this._hasBehaviour = true;
        }
    }
    get isFinished(): boolean {
        let owner = this.owner;
        let context = this;
        let inLOS: boolean = true;
        this.owner.world.gameObjects.forEach(function (element) {
            if (element instanceof Planet) {

                if (context.inCircle(owner.position, owner.world.gameObjects[1].position, element)) {
                    inLOS = false;
                }
            }
        })
        if (inLOS) {
            this.status = 'completed';
        }

        return this.status == 'completed';
    }

}