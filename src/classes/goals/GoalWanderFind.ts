
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
        let x1 = lineStart.x - target.position.x;
        let x2 = lineEnd.x - target.position.x;
        let y1 = lineStart.y - target.position.y;
        let y2 = lineEnd.y - target.position.y;
        let dx = x2 - x1;
        let dy = y2 - y1;
        let dr_sq = Math.sqrt(dx) + Math.sqrt(dy);
        let D = x1 * y2 - x2 * y1;
        return Math.sqrt((<Planet>target).size) * dr_sq > Math.sqrt(D);
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