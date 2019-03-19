import { Vector } from "../Vector";
import { World } from "../World";
import { MovingGameEntity } from "../entities/MovingGameEntity";

export abstract class Goal {

    public owner: MovingGameEntity;
    subgoal: Goal;
    isActive: Boolean;

    constructor(owner: MovingGameEntity) {
        this.owner = owner;
    }

    public addSubGoal(goal: Goal) {
        this.subgoal = goal;
    }
    public apply() {

    }
    public isFinished(): Boolean {
        return
    }
    public start() {

    }
}