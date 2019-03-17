import { Behaviour } from "./Behaviour";
import { MovingGameEntity } from "../entities/MovingGameEntity";
import { Vector } from "../Vector";
import { Config } from "../Config";
import { Planet } from "../entities/Planet";

export class HideBehaviour extends Behaviour {
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

    public rayCast() {
        for (var i: number = 0; i < this.owner.world.gameObjects.length; i++) {
            if (this.owner.world.gameObjects[i] instanceof Planet) {
                var obstacle: Planet = <Planet>this.owner.world.gameObjects[i];


            }
        }
    }
}