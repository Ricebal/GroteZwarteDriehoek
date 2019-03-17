import { Vector } from "../Vector";
import { MovingGameEntity } from "../entities/MovingGameEntity";
import { Behaviour } from "./Behaviour";

export class SeekBehaviour extends Behaviour {
    public owner: MovingGameEntity;
    public target: Vector;

    constructor(owner: MovingGameEntity, target: Vector) {
        super(owner);
        this.target = target;
    }

    public apply(): Vector {
        let desired = Vector.sub(this.target, this.owner.position);
        desired.normalize();
        desired.mult(this.owner.maxSpeed);

        let steer = Vector.sub(desired, this.owner.velocity);
        steer.limit(this.owner.maxForce);
        return steer;
    }
}