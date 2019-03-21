
import { MovingGameEntity } from "../entities/MovingGameEntity";
import { Vector } from "../Vector";
import { Config } from "../Config";
import { CompositeGoal } from "./CompositeGoal";
import { Goal } from "./Goal";
import { GoalReturn } from "./GoalReturn";
import { StaticGameEntity } from "../entities/StaticGameEntity";
import { GoalNavToPlanet } from "./GoalNavToPlanet";
import { GoalArrivePlanet } from "./GoalArrivePlanet";
import { GoalDestroyPlanet } from "./GoalDestroyPlanet";

export class GoalDestroyTerrain extends CompositeGoal {
    public target: StaticGameEntity;
    public status: string = 'inactive';
    public label: string = "DestoryTerrain";

    constructor(owner: MovingGameEntity, target: StaticGameEntity) {
        super(owner);
        this.target = target;
        this.addSubGoal(new GoalNavToPlanet(owner, target));
        this.addSubGoal(new GoalArrivePlanet(owner, target));
        this.addSubGoal(new GoalDestroyPlanet(owner, target));
        this.addSubGoal(new GoalReturn(owner));
        console.log(this.goals);
    }

    public start() {

        this.status = 'active';
        this.apply();
    }

    public nextGoal(): void {
        for (let i = 0; i < this.goals.length; i++) {
            if (i === 0 && this.goals[i].isInactive && this.goals[i].status !== 'completed') {
                console.log('First goal');
                this.goals[i].status = 'active';
                this.goals[i].apply();
            } else if (this.goals[i].isFinished && this.goals[i + 1] && !this.goals[i + 1].isActive && !(this.goals[i + 1].status === 'completed')) {
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