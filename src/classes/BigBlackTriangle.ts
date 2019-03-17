import { World } from './World';
import { Vector } from './Vector';
import { MovingGameEntity } from './MovingGameEntity';
import { BaseGameEntity } from './BaseGameEntity';
import { SeekBehaviour } from './behaviours/SeekBehaviour';
import { Planet } from './Planet';
import { ObstacleAvoidBehaviour } from './behaviours/ObstacleAvoidBehaviour';

export class BigBlackTriangle extends MovingGameEntity {
    public size: number;
    public ahead: Vector;
    public ahead2: Vector;
    public minSpeed: number;
    public lineOfSightPoint: Vector;

    constructor(x: number, y: number, world: World) {
        super(x, y, world);
        this.acceleration = new Vector();
        this.velocity = new Vector();
        this.maxSpeed = 2.5;
        this.minSpeed = 0.3;
        this.maxForce = 1.3;
        this.maxAvoidForce = 0.02;
        this.size = 10;
        this.behaviours = [];
    }

    private distance(a: Vector, b: Vector): Number {
        return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
    }
    private lineIntersectsCircle(ahead: Vector, ahead2: Vector, obstacle: Planet): Boolean {
        return this.distance(obstacle.position, ahead) <= (obstacle.size) || this.distance(obstacle.position, ahead2) <= (obstacle.size);
    }
    private applyForce(): void {
        for (let i = 0; i < this.world.gameObjects.length; i++) {
            if (this.world.gameObjects[i] instanceof Planet) {
                if (this.lineIntersectsCircle(this.ahead, this.lineOfSightPoint, (<Planet>this.world.gameObjects[i]))) {
                    console.log("I can't see shit!");
                }
            }
        }

        if (this.world.gameObjects[2] && this.behaviours.length === 0) {

            this.behaviours.push(new SeekBehaviour(this, this.world.gameObjects[2].position));
        }
        this.behaviours.push(new ObstacleAvoidBehaviour(this))


        for (let key in this.behaviours) {
            this.acceleration.add(this.behaviours[key].apply());
        }

        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.velocity.limitMin(this.minSpeed);
        this.position.add(this.velocity);

    }


    public update(): void {
        let normVelocity = this.velocity.normalize();
        let dynamic_length = normVelocity.mag();
        this.ahead2 = new Vector(this.position.x + (this.velocity.x * 50), this.position.y + (this.velocity.y * 50));
        this.ahead = new Vector(this.position.x + (this.velocity.x * 100), this.position.y + (this.velocity.y * 100));
        this.lineOfSightPoint = new Vector(this.position.x + 800, this.position.y + 800);
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

        // this.world.ctx.beginPath();
        // this.world.ctx.arc(this.ahead.x, this.ahead.y, 2, 0, 2 * Math.PI);
        // this.world.ctx.arc(this.ahead2.x, this.ahead2.y, 2, 0, 2 * Math.PI);
        // this.world.ctx.stroke();
        // this.world.ctx.fill();
        // this.world.ctx.closePath();
    }
}