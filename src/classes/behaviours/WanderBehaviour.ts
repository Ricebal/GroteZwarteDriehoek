import { MovingGameEntity } from "../MovingGameEntity";
import { Behaviour } from "./Behaviour";
import { Vector } from "../Vector";
import { SeekBehaviour } from "./SeekBehaviour";

export class WanderBehaviour extends Behaviour {
    constructor(owner: MovingGameEntity) {
        super(owner);
    }

    public apply(): Vector {
        let wanderRadius: number = 50;
        let wanderDistance: number = 40;
        let wanderJitter: number = 1;
        let wanderTarget: Vector = new Vector();

        wanderTarget.add(new Vector((Math.random() * 2 - 1) * wanderJitter, (Math.random() * 2 - 1) * wanderJitter));
        wanderTarget.normalize();
        wanderTarget.mult(wanderRadius);

        let targetWorld: Vector = this.owner.position.clone().add(this.owner.velocity.clone().mult(wanderDistance)).add(wanderTarget);

        const seekBehaviour = new SeekBehaviour(this.owner, targetWorld);

        return seekBehaviour.apply();
    }
}