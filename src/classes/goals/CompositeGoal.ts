import { Goal } from "./Goal";
import { MovingGameEntity } from "../entities/MovingGameEntity";

export abstract class CompositeGoal extends Goal {

    goals: Array<Goal>
    constructor(owner: MovingGameEntity) {
        super(owner);
        this.goals = [];
    }
    public addSubGoal(Goal: Goal) {
        this.goals.push(Goal);
    }
    public update(): void {

    }
}