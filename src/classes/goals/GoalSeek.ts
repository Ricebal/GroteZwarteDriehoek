
import { MovingGameEntity } from "../entities/MovingGameEntity";
import { Vector } from "../Vector";
import { Config } from "../Config";
import { CompositeGoal } from "./CompositeGoal";
import { Goal } from "./Goal";
import { GoalNavToRandom } from "./GoalNavToRandom";
import { GoalReturn } from "./GoalReturn";

export class GoalSeek extends CompositeGoal {
    public target: MovingGameEntity;

    constructor(owner: MovingGameEntity, target: MovingGameEntity) {
        super(owner);
        this.target = target;
        console.log(owner);
        this.addSubGoal(new GoalNavToRandom(owner));
        this.addSubGoal(new GoalReturn(owner));

    }
    public start() {
        this.goals[0].isActive = true;
        this.goals[0].apply();
    }
    public apply() {
        for (let i = 0; i < this.goals.length; i++) {
            if (this.goals[i].isActive) {
                this.goals[i].apply();
            }

        }

    }
}
