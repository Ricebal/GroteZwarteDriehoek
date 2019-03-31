import { Behaviour } from "./Behaviour";
import { MovingGameEntity } from "../entities/MovingGameEntity";
import { Vector } from "../Vector";
import { Config } from "../Config";
import { Planet } from "../entities/Planet";

export class ObstacleAvoidBehaviour extends Behaviour {
    public ahead: Vector;
    public ahead2: Vector;
    constructor(owner: MovingGameEntity) {
        super(owner);
    }
    private lineIntersectsCircle(ahead: Vector, ahead2: Vector, obstacle: Planet): boolean {
        return Vector.distance(obstacle.position, ahead) <= (obstacle.size * 1.2) || Vector.distance(obstacle.position, ahead2) <= (obstacle.size * 1.2);
    }

    public apply(): Vector {
        // The ahead vector scales with velocity, the faster it goes the further it looks ahead.
        let dynamicLength: number = Vector.distance(new Vector(), this.owner.velocity) / this.owner.maxSpeed;
        dynamicLength *= 25;
        this.ahead = this.owner.velocity.clone().normalize().mult(dynamicLength).add(this.owner.position);
        this.ahead2 = this.owner.velocity.clone().normalize().mult(dynamicLength).add(this.owner.position);

        // The mostThreatening Planet is the planet closest
        let mostThreatening: Planet = this.findMostThreateningObstacle();
        let avoidance: Vector = new Vector(0, 0);

        if (mostThreatening != null) {
            avoidance = Vector.sub(this.ahead, mostThreatening.position);
            avoidance.normalize();
            avoidance.limit(this.owner.maxAvoidForce);
            avoidance.mult(this.owner.maxSpeed);
        } else {
            avoidance.mult(0); // nullify the avoidance force is there's no scary planet
        }
        return avoidance;
    }

    // returns null if there's no intersection
    private findMostThreateningObstacle(): Planet {
        let mostThreatening: Planet = null;

        for (let i: number = 0; i < this.owner.world.gameObjects.length; i++) {
            if (this.owner.world.gameObjects[i] instanceof Planet) {
                let obstacle: Planet = <Planet>this.owner.world.gameObjects[i];
                let collision: Boolean = this.lineIntersectsCircle(this.ahead, this.ahead2, obstacle);
                if (collision && (mostThreatening == null || Vector.distance(this.owner.position, obstacle.position) < Vector.distance(this.owner.position, mostThreatening.position))) {
                    mostThreatening = obstacle;
                }
            }
        }
        return mostThreatening;
    }
}