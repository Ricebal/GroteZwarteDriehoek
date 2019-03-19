
import { MovingGameEntity } from "../entities/MovingGameEntity";
import { Vector } from "../Vector";
import { CompositeGoal } from "./CompositeGoal";
import { PathfindingBehaviour } from "../behaviours/PathfindingBehaviour";

export class GoalNavToRandom extends CompositeGoal {

    public randomGoal: Vector;
    private _hasBehaviour = false;

    constructor(owner: MovingGameEntity) {
        super(owner);
        console.log('NavToRandom created');
        this.randomGoal = this.owner.world.navGraph.nodes[Math.floor(Math.random() * this.owner.world.navGraph.nodes.length)].position;
    }

    public apply() {
        if (!this._hasBehaviour) {
            this.owner.behaviours.push(new PathfindingBehaviour(this.owner, this.randomGoal));
            this._hasBehaviour = true;
        }
    }

    get isFinished(): boolean {
        let distance = Vector.distanceSq(this.owner.position, this.randomGoal);
        if (distance < 100) {
            this.status = 'completed';
        }
        return this.status === 'completed';
    }
}