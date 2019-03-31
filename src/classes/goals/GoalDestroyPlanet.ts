
import { MovingGameEntity } from "../entities/MovingGameEntity";
import { Vector } from "../Vector";
import { Config } from "../Config";
import { CompositeGoal } from "./CompositeGoal";
import { Goal } from "./Goal";
import { PathfindingBehaviour } from "../behaviours/PathfindingBehaviour";
import { FollowBehaviour } from "../behaviours/FollowBehaviour";
import { SmallBlackTriangle } from "../entities/SmallBlackTriangle";
import { StaticGameEntity } from "../entities/StaticGameEntity";
import { Planet } from "../entities/Planet";
import { ObstacleAvoidBehaviour } from "../behaviours/ObstacleAvoidBehaviour";

export class GoalDestroyPlanet extends Goal {

    private _hasBehaviour: boolean = false;
    private target: StaticGameEntity;
    private hasDestroyedPlanet: boolean = false;
    public label: string = "DestroyPlanet";

    constructor(owner: MovingGameEntity, target: StaticGameEntity) {
        super(owner);
        this.target = target;
    }

    public apply() {
        if (!this._hasBehaviour) {
            (<Planet>this.target).isDestroyed = true;
            this._hasBehaviour = true;
            (<SmallBlackTriangle>this.owner).avoid = new ObstacleAvoidBehaviour(this.owner);
            this.hasDestroyedPlanet = true;
        }
    }
    get isFinished(): boolean {
        if (this.hasDestroyedPlanet) {
            this.status = 'completed';
        }
        return this.status === 'completed';
    }
}