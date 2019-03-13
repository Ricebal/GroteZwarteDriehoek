import { MovingGameEntity } from "../entities/MovingGameEntity";
import { Vector } from "../Vector";

export abstract class Behaviour {
    public owner: MovingGameEntity;

    constructor(owner: MovingGameEntity) {
        this.owner = owner;
    }

    public apply(): Vector {
        return;
    }
}