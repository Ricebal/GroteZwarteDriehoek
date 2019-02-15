import { Behaviour } from "./Behaviour";
import { MovingGameEntity } from "../MovingGameEntity";
import { Vector } from "../Vector";
import { Config } from "../Config";

export class FleeBehaviour extends Behaviour {
    public target: Vector;

    constructor(owner: MovingGameEntity, target: Vector = Config.mousePos) {
        super(owner);
        this.target = target;
    }

    public apply(): Vector {
        const panicDistanceSquared = Config.panicDistance * Config.panicDistance;

        if (Vector.distanceSq(this.target, this.owner.position) > panicDistanceSquared) {
            return new Vector(0, 0);
        }

        let desired: Vector = Vector.sub(this.owner.position, this.target);
        desired.normalize();
        desired.mult(this.owner.maxSpeed);

        return desired;
    }
}