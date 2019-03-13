import { Behaviour } from "./Behaviour";
import { MovingGameEntity } from "../entities/MovingGameEntity";
import { Vector } from "../Vector";

export class ArriveBehaviour extends Behaviour {
    public target: Vector;
    private _startDistanceSq: number;

    constructor(owner: MovingGameEntity, target: Vector) {
        super(owner);
        this.target = target;
        this._startDistanceSq = Vector.distanceSq(owner.position, target);
    }

    public apply(): Vector {
        // Get the desired location relative to the owner
        let desired = Vector.sub(this.target, this.owner.position);
        desired.normalize();

        // Set the owners speed based on maxspeed and distance to the target
        desired.mult((Vector.distanceSq(this.owner.position, this.target) / this._startDistanceSq) * this.owner.maxSpeed);

        // Set steering limit
        let steer = Vector.sub(desired, this.owner.velocity);
        steer.limit(this.owner.maxForce);
        return steer;
    }
}