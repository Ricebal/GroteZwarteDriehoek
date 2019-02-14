import { World } from './World';
import { BaseGameEntity } from './BaseGameEntity';
import { Vector } from './vector';

export class BigBlackTriangle extends BaseGameEntity {
    public acceleration: Vector;
    public velocity: Vector;
    public maxSpeed: number;
    public maxForce: number;
    public size: number;

    constructor(x: number, y: number, world: World) {
        super(x, y, world);
        this.acceleration = new Vector();
        this.velocity = new Vector();
        this.maxSpeed = 10;
        this.maxForce = 0.1;
        this.size = 10;
    }

    private seek(target: BaseGameEntity) {
        let desired = Vector.sub(target.position, this.position);
        desired.normalize();
        desired.mult(this.maxSpeed);

        let steer = Vector.sub(desired, this.velocity);
        steer.limit(this.maxForce);
        return steer;
    }

    private applyForce() {
        this.acceleration.add(this.seek(World.planets[0]));

        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);

        this.acceleration.mult(0);
    }


    public update() {
        this.applyForce();
        this.draw();
    }

    private draw() {
        this.world.ctx.fillStyle = 'rgb(0, 0, 0)';
        this.world.ctx.beginPath();
        this.world.ctx.moveTo(this.position.x + Math.cos(Math.atan2(this.velocity.y, this.velocity.x) + Math.PI * 1.5) * this.size, this.position.y + Math.sin(Math.atan2(this.velocity.y, this.velocity.x) + Math.PI * 1.5) * this.size);
        this.world.ctx.lineTo(this.position.x + Math.cos(Math.atan2(this.velocity.y, this.velocity.x)) * this.size * 4, this.position.y + Math.sin(Math.atan2(this.velocity.y, this.velocity.x)) * this.size * 4);
        this.world.ctx.lineTo(this.position.x + Math.cos(Math.atan2(this.velocity.y, this.velocity.x) + Math.PI * 0.5) * this.size, this.position.y + Math.sin(Math.atan2(this.velocity.y, this.velocity.x) + Math.PI * 0.5) * this.size);
        this.world.ctx.fill();
        this.world.ctx.closePath();
    }
}