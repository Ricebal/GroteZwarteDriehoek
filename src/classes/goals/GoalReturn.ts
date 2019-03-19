
import { MovingGameEntity } from "../entities/MovingGameEntity";
import { Vector } from "../Vector";
import { Config } from "../Config";
import { CompositeGoal } from "./CompositeGoal";
import { Goal } from "./Goal";
import { PathfindingBehaviour } from "../behaviours/PathfindingBehaviour";
import { FollowBehaviour } from "../behaviours/FollowBehaviour";
import { SmallBlackTriangle } from "../entities/SmallBlackTriangle";

export class GoalReturn extends CompositeGoal {

    constructor(owner: MovingGameEntity) {
        super(owner);
    }

    public apply() {
        this.owner.behaviours.push(new FollowBehaviour(this.owner, <MovingGameEntity>this.owner.world.gameObjects[0], (<SmallBlackTriangle>this.owner).group));
    }
}