
import { MovingGameEntity } from "../entities/MovingGameEntity";
import { Vector } from "../Vector";
import { Config } from "../Config";
import { CompositeGoal } from "./CompositeGoal";
import { Goal } from "./Goal";
import { PathfindingBehaviour } from "../behaviours/PathfindingBehaviour";
import { FollowBehaviour } from "../behaviours/FollowBehaviour";
import { SmallBlackTriangle } from "../entities/SmallBlackTriangle";
import { ArriveBehaviour } from "../behaviours/ArriveBehaviour";
import { StaticGameEntity } from "../entities/StaticGameEntity";
import { Planet } from "../entities/Planet";

export class GoalArrivePlanet extends Goal {

    private _hasBehaviour: boolean = false;
    private target: StaticGameEntity;
    public label: string = "EnterPlanet";

    constructor(owner: MovingGameEntity, target: StaticGameEntity) {
        super(owner);
        this.target = target;
    }

    public apply() {
        if (!this._hasBehaviour) {
            (<SmallBlackTriangle>this.owner).avoid = null;
            this.owner.behaviours = [new ArriveBehaviour(this.owner, this.target.position)];
            this._hasBehaviour = true;
        }

    }
    // Checks i
    get isFinished(): boolean {
        if (this.status !== 'completed') {
            let distance = Vector.distanceSq(this.owner.position, this.target.position);
            if (distance < (<Planet>this.target).size * 1.10) {
                console.log('is called');
                this.status = 'completed';
            }
            return this.status === 'completed';
        }
    }
}