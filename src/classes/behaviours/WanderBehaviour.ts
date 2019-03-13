import { MovingGameEntity } from "../entities/MovingGameEntity";
import { Behaviour } from "./Behaviour";
import { Vector } from "../Vector";
import { SeekBehaviour } from "./SeekBehaviour";

export class WanderBehaviour extends Behaviour {
    constructor(owner: MovingGameEntity) {
        super(owner);
    }

    public apply(): Vector {
        let wanderRadius: number = 30; // Wander circle radius
        let wanderDistance: number = 60; // Distance between agent and circle
        let wanderJitter: number = 1; // Random jitter
        let wanderTarget: Vector = new Vector();

        // Generate a number between -1 and 1, add jitter
        wanderTarget.add(new Vector((Math.random() * 2 - 1) * wanderJitter, (Math.random() * 2 - 1) * wanderJitter));
        wanderTarget.normalize();
        wanderTarget.mult(wanderRadius);

        // Add circle to the world
        let targetWorld: Vector = this.owner.position.clone().add(this.owner.velocity.clone().normalize().mult(wanderDistance)).add(wanderTarget);

        const seekBehaviour = new SeekBehaviour(this.owner, targetWorld);

        return seekBehaviour.apply();
    }
}