import { World } from './World';
import { Vector } from './Vector';
import { MovingGameEntity } from './MovingGameEntity';
import { BaseGameEntity } from './BaseGameEntity';
import { SeekBehaviour } from './behaviours/SeekBehaviour';
import { PathfindingBehaviour } from './behaviours/PathfindingBehaviour';
import { Config } from './Config';
import { Planet } from './Planet';
import { ObstacleAvoidBehaviour } from './behaviours/ObstacleAvoidBehaviour';

export class BigBlackTriangle extends MovingGameEntity {
    public size: number;
    public pathTarget: Vector;

    constructor(x: number, y: number, world: World) {
        super(x, y, world);
        this.acceleration = new Vector();
        this.velocity = new Vector();
        this.maxSpeed = 0.5;
        this.maxForce = 0.3;
        this.size = 10;
        this.behaviours = [];
    }

    private applyForce(): void {
        // if (this.world.gameObjects[2] && this.behaviours.length === 0) {
        //     this.behaviours.push(new SeekBehaviour(this, this.world.gameObjects[2].position));
        // }

        if (!this.pathTarget && Config.mousePos)
            this.pathTarget = Config.mousePos;

        if (this.pathTarget && Vector.distanceSq(this.pathTarget, Config.mousePos) > 1) {
            this.pathTarget = Config.mousePos.clone();
            this.behaviours = [new PathfindingBehaviour(this, this.pathTarget)];
        }

        // for (let i = 0; i < this.world.gameObjects.length; i++) {
        //     if (this.world.gameObjects[i] instanceof Planet && Vector.distanceSq(this.world.gameObjects[i].position, this.position) < Math.pow((<Planet>this.world.gameObjects[i]).size, 2) + 100) {

        //         this.behaviours.push(new ObstacleAvoidBehaviour(this, this.world.gameObjects[i].position, ((<Planet>this.world.gameObjects[i]).size) / 2));
        //     }
        // }

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