import { Behaviour } from "./Behaviour";
import { MovingGameEntity } from "../entities/MovingGameEntity";
import { Vector } from "../Vector";
import { Config } from "../Config";

export class FollowBehaviour extends Behaviour {
    public target: MovingGameEntity;
    public group: Array<MovingGameEntity>;
    private _angle: number;

    constructor(owner: MovingGameEntity, target: MovingGameEntity, group: Array<MovingGameEntity>) {
        super(owner);
        this.target = target;
        this.group = group;
        this._angle = 180 / group.length * (group.indexOf(owner)) + 90 + (180 / group.length / 2);
    }

    public apply(): Vector {
        if (this.target.velocity.x === 0 && this.target.velocity.y === 0) {
            return new Vector();
        }

        // Get the desired location relative to the owner
        let targetLocation: Vector = this.target.velocity.clone().rotate(this._angle).normalize().mult(5 * 7.5).add(this.target.position);

        let desired = Vector.sub(targetLocation, this.owner.position);
        desired.normalize();


        // Set the owners speed based on maxspeed and distance to the target
        if (Vector.distanceSq(targetLocation, this.owner.position) < 100) {
            desired.mult((Vector.distanceSq(this.owner.position, targetLocation) / 20) * this.owner.maxSpeed);
        } else {
            desired.mult(this.owner.maxSpeed);
        }

        // Set steering limit
        let steer = Vector.sub(desired, this.owner.velocity);
        steer.limit(this.owner.maxForce);
        return steer;
    }
}