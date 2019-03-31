import { Behaviour } from "./Behaviour";
import { MovingGameEntity } from "../entities/MovingGameEntity";
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
        if (this.owner.position.x - 20 > Config.canvasSize.x || this.owner.position.x + 20 < 0) {
            desired.x *= -1;
            console.log('wow end x');
        }
        if (this.owner.position.y - 20 > Config.canvasSize.y || this.owner.position.y + 20 < 0) {
            desired.y *= -1;
            console.log('wow end y');
        }
        return desired;
    }
}