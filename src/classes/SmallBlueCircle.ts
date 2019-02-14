import { MovingGameEntity } from "./MovingGameEntity";
import { World } from "./World";
import { Vector } from "./Vector";

export class SmallBlueCircle extends MovingGameEntity {
    constructor(x: number, y: number, world: World) {
        super(x, y, world);
        this.maxSpeed = 10;
        this.maxForce = 0.3;
    }

    private wander(): Vector {
        return;
    }

    private applyForce(): void {
        this.acceleration.add(this.wander());

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
        ctx.fillStyle = 'rgb(0, 0, 255)';
        ctx.beginPath();
        ctx.arc(this.position.x + 3, this.position.y + 3, 6, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }
}