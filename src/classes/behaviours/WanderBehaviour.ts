import { MovingGameEntity } from "../MovingGameEntity";
import { Behaviour } from "./Behaviour";
import { Vector } from "../Vector";
import { SeekBehaviour } from "./SeekBehaviour";

export class WanderBehaviour extends Behaviour {
    constructor(owner: MovingGameEntity) {
        super(owner);
    }

    public apply(): Vector {
        let wanderRadius: number = 100;
        let wanderDistance: number = 60;
        let wanderJitter: number = 1;
        let wanderTarget: Vector = new Vector();

        wanderTarget.add(new Vector((Math.random() * 2 - 1) * wanderJitter, (Math.random() * 2 - 1) * wanderJitter));
        wanderTarget.normalize();
        wanderTarget.mult(wanderRadius);

        let targetLocal: Vector = wanderTarget.clone().add(new Vector(wanderDistance, 0));
        let targetWorld: Vector = new Vector();

        return wanderTarget;
    }
}