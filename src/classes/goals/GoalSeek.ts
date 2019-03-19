
import { MovingGameEntity } from "../entities/MovingGameEntity";
import { Vector } from "../Vector";
import { Config } from "../Config";
import { CompositeGoal } from "./CompositeGoal";
import { Goal } from "./Goal";
import { GoalNavToRandom } from "./GoalNavToRandom";
import { GoalReturn } from "./GoalReturn";

export class GoalSeek extends CompositeGoal {
    public target: MovingGameEntity;
    public status: string = 'inactive';

    constructor(owner: MovingGameEntity, target: MovingGameEntity) {
        super(owner);
        this.target = target;
        this.addSubGoal(new GoalNavToRandom(owner));
        this.addSubGoal(new GoalReturn(owner));
    }

    public start() {
        this.status = 'active';
        this.apply();
    }

    public nextGoal(): void {
        for (let i = 0; i < this.goals.length; i++) {
            if (i === 0 && this.goals[i].isInactive) {
                console.log('First goal');
                this.goals[i].status = 'active';
                this.goals[i].apply();
            } else if (this.goals[i].isFinished && this.goals[i + 1] && !this.goals[i + 1].isActive) {
                console.log('Next goal');
                this.goals[i + 1].status = 'active';
                this.goals[i + 1].apply();
            } else if (i === this.goals.length - 1 && this.goals[i].isFinished) {
                console.log('Completed GoalSeek');
                this.status = 'completed';
            }
        }
    }

    public apply() {
        this.nextGoal();
    }
}
