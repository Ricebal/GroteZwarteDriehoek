import { Behaviour } from "./Behaviour";
import { MovingGameEntity } from "../entities/MovingGameEntity";
import { Vector } from "../Vector";
import { Config } from "../Config";
import { Planet } from "../Planet";

export class ObstacleAvoidBehaviour extends Behaviour {
    public ahead: Vector;
    public ahead2: Vector;
    constructor(owner: MovingGameEntity) {
        super(owner);
    }
    private distance(a: Vector, b: Vector): Number {
        return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
    }

    private lineIntersectsCircle(ahead: Vector, ahead2: Vector, obstacle: Planet): Boolean {
        return this.distance(obstacle.position, ahead) <= (obstacle.size * 1.05) || this.distance(obstacle.position, ahead2) <= (obstacle.size * 1.05);
    }
    public apply(): Vector {
        this.ahead = new Vector(this.owner.position.x + (this.owner.velocity.normalize()).x * 100, this.owner.position.y + (this.owner.velocity.normalize()).y * 100);
        this.ahead2 = new Vector(this.owner.position.x + (this.owner.velocity.normalize()).x * 50, this.owner.position.y + (this.owner.velocity.normalize()).y * 50);
        var mostThreatening: Planet = this.findMostThreateningObstacle();
        var avoidance: Vector = new Vector(0, 0);
        if (mostThreatening != null) {
            avoidance.x = this.ahead.x - mostThreatening.position.x;
            avoidance.y = this.ahead.y - mostThreatening.position.y;

            avoidance.normalize();
            avoidance.mult(this.owner.maxAvoidForce);
        } else {
            avoidance.mult(0); // nullify the avoidance force
        }
        return avoidance;
    }

    private findMostThreateningObstacle(): Planet {
        var mostThreatening: Planet = null;

        for (var i: number = 0; i < this.owner.world.gameObjects.length; i++) {
            if (this.owner.world.gameObjects[i] instanceof Planet) {
                var obstacle: Planet = <Planet>this.owner.world.gameObjects[i];
                var collision: Boolean = this.lineIntersectsCircle(this.ahead, this.ahead2, obstacle);

                //this.position is bigblacktriangles position
                if (collision && (mostThreatening == null || this.distance(this.owner.position, obstacle.position) < this.distance(this.owner.position, mostThreatening.position))) {
                    mostThreatening = obstacle;
                }
            }
        }
        return mostThreatening;
    }
    // public apply(): Vector {

    //     let desired: Vector = new Vector(this.ahead.x - this.obstaclePosition.x, this.ahead.y - this.obstaclePosition.y);
    //     desired.normalize();
    //     desired.mult(this.owner.maxSpeed);

    //     desired = Vector.sub(desired, this.owner.velocity);
    //     desired.limit(this.owner.maxForce);
    //     return desired;
    // }
}