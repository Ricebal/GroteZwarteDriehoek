
import { MovingGameEntity } from "../entities/MovingGameEntity";
import { Vector } from "../Vector";
import { CompositeGoal } from "./CompositeGoal";
import { PathfindingBehaviour } from "../behaviours/PathfindingBehaviour";
import { StaticGameEntity } from "../entities/StaticGameEntity";
import { Planet } from "../entities/Planet";

export class GoalNavToPlanet extends CompositeGoal {

    public target: StaticGameEntity;
    private _hasBehaviour = false;
    public label: string = "NavToRdnPlanet";

    constructor(owner: MovingGameEntity, target: StaticGameEntity) {
        super(owner);
        this.target = target;
    }

    public apply() {
        if (!this._hasBehaviour) {
            this.owner.behaviours.push(new PathfindingBehaviour(this.owner, this.target.position));
            this._hasBehaviour = true;
        }
    }

    get isFinished(): boolean {
        let distance = Vector.distanceSq(this.owner.position, this.target.position);
        if (distance < 4000) {
            this.status = 'completed';
        }
        return this.status === 'completed';
    }
}