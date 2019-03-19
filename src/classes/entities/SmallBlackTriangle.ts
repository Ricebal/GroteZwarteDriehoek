import { World } from '../World';
import { Vector } from '../Vector';
import { MovingGameEntity } from './MovingGameEntity';
import { PathfindingBehaviour } from '../behaviours/PathfindingBehaviour';
import { Config } from '../Config';
import { FollowBehaviour } from '../behaviours/FollowBehaviour';
import { BigBlackTriangle } from './BigBlackTriangle';
import { Goal } from '../goals/Goal';
import { GoalSeek } from '../goals/GoalSeek';

export class SmallBlackTriangle extends MovingGameEntity {
    public size: number;
    public pathTarget: Vector;
    public group: Array<SmallBlackTriangle>;
    goal: Goal;
    constructor(x: number, y: number, world: World) {
        super(x, y, world);
        this.acceleration = new Vector();
        this.velocity = new Vector();
        this.maxSpeed = 1.5;
        this.maxForce = 0.07;
        this.size = 5;
        this.behaviours = [];
        this.group = [];
        console.log("im created");
        this.goal = new GoalSeek(this, <MovingGameEntity>this.world.gameObjects[0]);
    }

    private applyForce(): void {
        if (!this.goal.isActive) {
            this.goal.start();
        }
        if (this.goal.isFinished) {

        }
        // if (this.world.gameObjects[1] && this.behaviours.length === 0 && this.group.length !== 0) {
        //     this.behaviours.push(new FollowBehaviour(this, <BigBlackTriangle>this.world.gameObjects[0], this.group));
        // }

        this.behaviours.forEach(e => {
            this.acceleration.add(e.apply());
        });

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