import { MovingGameEntity } from "./MovingGameEntity";
import { World } from "./World";
import { Config } from "./Config";
import { FleeBehaviour } from "./behaviours/FleeBehaviour";
import { Vector } from "./Vector";
import { WanderBehaviour } from "./behaviours/WanderBehaviour";

export class SmallBlueCircle extends MovingGameEntity {

    constructor(x: number, y: number, world: World) {
        super(x, y, world);
        this.maxSpeed = 2;
        this.maxForce = 0.5;
        this.behaviours = [];
        // this.behaviours.push(new WanderBehaviour(this));
    }

    private applyForce(): void {
        if (this.world.gameObjects[1].position && Vector.distanceSq(this.world.gameObjects[1].position, this.position) < Math.pow(Config.panicDistance, 2)) {
            this.behaviours = [new FleeBehaviour(this, this.world.gameObjects[1].position)];
            console.log('Fleeing!');
        } else {
            this.behaviours = [new WanderBehaviour(this)];
        }

        for (let key in this.behaviours) {
            this.acceleration.add(this.behaviours[key].apply());
        }


        if (this.position.x < 0 || this.position.x > 900) {
            this.velocity.x *= -1;
        }

        if (this.position.y < 0 || this.position.y > 900) {
            this.velocity.y *= -1;
        }

        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    public update(): void {
        this.applyForce();
        this.draw();
    }

    private draw(): void {
        const ctx = this.world.ctx;

        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, Config.panicDistance, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();

        ctx.fillStyle = 'rgb(0, 0, 255)';
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 6, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }
}