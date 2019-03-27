
import { MovingGameEntity } from "../entities/MovingGameEntity";
import { Vector } from "../Vector";
import { CompositeGoal } from "./CompositeGoal";
import { FollowBehaviour } from "../behaviours/FollowBehaviour";
import { SmallBlackTriangle } from "../entities/SmallBlackTriangle";

export class GoalReturn extends CompositeGoal {

    private _hasBehaviour: boolean = false;
    public label: string = "Return";

    constructor(owner: MovingGameEntity) {
        super(owner);
    }

    public apply() {
        if (!this._hasBehaviour) {
            console.log('added FollowBehaviour');
            this.owner.behaviours = [new FollowBehaviour(this.owner, <MovingGameEntity>this.owner.world.gameObjects[0], (<SmallBlackTriangle>this.owner).group)];
            this._hasBehaviour = true;
        }
    }

    get isFinished(): boolean {
        if (Vector.distanceSq(this.owner.position, this.owner.world.gameObjects[0].position) < 1500) {
            this.status = 'completed';
        }
        return this.status === 'completed';
    }
}