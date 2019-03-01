import { Behaviour } from "./Behaviour";
import { MovingGameEntity } from "../MovingGameEntity";
import { Vector } from "../Vector";
import { Config } from "../Config";

export class ObstacleAvoidBehaviour extends Behaviour {
    public target: Vector;
    public avoidSize: number;

    constructor(owner: MovingGameEntity, target: Vector = Config.mousePos, avoidSize: number) {
        super(owner);
        this.target = target;
        this.avoidSize = avoidSize;
    }

    public apply(): Vector {
        const avoidDistanceSquared = this.avoidSize * this.avoidSize;
        if (Vector.distanceSq(this.target, this.owner.position) > avoidDistanceSquared) {
            return new Vector(0, 0);
        }

        let desired: Vector = Vector.sub(this.owner.position, this.target);
        desired.normalize();
        desired.mult(this.owner.maxSpeed);

        return desired;
    }
}