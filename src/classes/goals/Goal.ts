import { Vector } from "../Vector";
import { World } from "../World";
import { MovingGameEntity } from "../entities/MovingGameEntity";

export abstract class Goal {

    public owner: MovingGameEntity;
    public status: string = 'inactive';
    public label: string;

    constructor(owner: MovingGameEntity) {
        this.owner = owner;
    }

    public apply() {

    }

    get isActive(): boolean {
        return this.status === 'active';
    }

    get isInactive(): boolean {
        return this.status === 'inactive';
    }

    get isFinished(): boolean {
        return this.status === 'completed';
    }

    public start() {

    }
}