import { World } from './World';
import { Vector } from './Vector';
import { MovingGameEntity } from './MovingGameEntity';
import { BaseGameEntity } from './BaseGameEntity';
import { SeekBehaviour } from './behaviours/SeekBehaviour';

export class BigBlackTriangle extends MovingGameEntity {
    public size: number;

    constructor(x: number, y: number, world: World) {
        super(x, y, world);
        this.acceleration = new Vector();
        this.velocity = new Vector();
        this.maxSpeed = 10;
        this.maxForce = 0.1;
        this.size = 10;

        this.behaviours.push(new SeekBehaviour(this, World.planets[0]));
    }

    private seek(target: BaseGameEntity): Vector {
        let desired = Vector.sub(target.position, this.position);
        desired.normalize();
        desired.mult(this.maxSpeed);

        let steer = Vector.sub(desired, this.velocity);
        steer.limit(this.maxForce);
        return steer;
    }

    private applyForce(): void {
        for (let key in this.behaviours) {
            this.acceleration.add(this.behaviours[key].apply());
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
        this.world.ctx.fillStyle = 'rgb(0, 0, 0)';
        this.world.ctx.beginPath();
        this.world.ctx.moveTo(this.position.x + Math.cos(Math.atan2(this.velocity.y, this.velocity.x) + Math.PI * 1.5) * this.size, this.position.y + Math.sin(Math.atan2(this.velocity.y, this.velocity.x) + Math.PI * 1.5) * this.size);
        this.world.ctx.lineTo(this.position.x + Math.cos(Math.atan2(this.velocity.y, this.velocity.x)) * this.size * 4, this.position.y + Math.sin(Math.atan2(this.velocity.y, this.velocity.x)) * this.size * 4);
        this.world.ctx.lineTo(this.position.x + Math.cos(Math.atan2(this.velocity.y, this.velocity.x) + Math.PI * 0.5) * this.size, this.position.y + Math.sin(Math.atan2(this.velocity.y, this.velocity.x) + Math.PI * 0.5) * this.size);
        this.world.ctx.fill();
        this.world.ctx.closePath();
    }
}