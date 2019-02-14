import { BaseGameEntity } from "../BaseGameEntity";
import { Vector } from "../Vector";
import { MovingGameEntity } from "../MovingGameEntity";
import { Behaviour } from "./Behaviour";

export class SeekBehaviour extends Behaviour {
    public owner: MovingGameEntity;
    public target: BaseGameEntity;

    constructor(owner: MovingGameEntity, target: BaseGameEntity) {
        super(owner);
        this.target = target;
    }

    public apply(): Vector {
        let desired = Vector.sub(this.target.position, this.owner.position);
        desired.normalize();
        desired.mult(this.owner.maxSpeed);

        let steer = Vector.sub(desired, this.owner.velocity);
        steer.limit(this.owner.maxForce);
        return steer;
    }
}