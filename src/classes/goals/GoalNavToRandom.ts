
import { MovingGameEntity } from "../entities/MovingGameEntity";
import { Vector } from "../Vector";
import { Config } from "../Config";
import { CompositeGoal } from "./CompositeGoal";
import { Goal } from "./Goal";
import { PathfindingBehaviour } from "../behaviours/PathfindingBehaviour";

export class GoalNavToRandom extends CompositeGoal {

    randomGoal: Vector;
    constructor(owner: MovingGameEntity) {
        super(owner);
    }

    public apply() {

        this.randomGoal = this.owner.world.navGraph.nodes[Math.floor(Math.random() * this.owner.world.navGraph.nodes.length)].position;
        this.owner.behaviours.push(new PathfindingBehaviour(this.owner, this.randomGoal));

    }
    public isFinished(): Boolean {
        return (this.owner.position == this.randomGoal)
    }
}