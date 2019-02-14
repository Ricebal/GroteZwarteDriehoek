import { MovingGameEntity } from "./MovingGameEntity";
import { World } from "./World";
import { WanderBehaviour } from "./behaviours/WanderBehaviour";

export class SmallBlueCircle extends MovingGameEntity {

    constructor(x: number, y: number, world: World) {
        super(x, y, world);
        this.maxSpeed = 2;
        this.maxForce = 0.5;
        this.behaviours = [];
        this.behaviours.push(new WanderBehaviour(this));
    }

    private applyForce(): void {
        for (let key in this.behaviours) {
            this.acceleration.add(this.behaviours[key].apply());
        }

        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);


        if (this.position.x < 0 || this.position.x > 900) {
            this.velocity.x *= -1;
        }

        if (this.position.y < 0 || this.position.y > 900) {
            this.velocity.y *= -1;
        }


        this.position.add(this.velocity);

        this.acceleration.mult(0);
    }

    public update(): void {
        this.applyForce();
        this.draw();
    }

    private draw(): void {
        const ctx = this.world.ctx;
        ctx.fillStyle = 'rgb(0, 0, 255)';
        ctx.beginPath();
        ctx.arc(this.position.x + 3, this.position.y + 3, 6, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }
}