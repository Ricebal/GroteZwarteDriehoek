import { World } from '../World';
import { Vector } from '../Vector';
import { MovingGameEntity } from './MovingGameEntity';
import { Goal } from '../goals/Goal';
import { GoalSeek } from '../goals/GoalSeek';
import { ObstacleAvoidBehaviour } from '../behaviours/ObstacleAvoidBehaviour';
import { PathfindingBehaviour } from '../behaviours/PathfindingBehaviour';

export class SmallBlackTriangle extends MovingGameEntity {
    public size: number;
    public pathTarget: Vector;
    public group: Array<SmallBlackTriangle>;
    public goal: Goal;
    public avoid: ObstacleAvoidBehaviour;

    constructor(x: number, y: number, world: World) {
        super(x, y, world);
        this.acceleration = new Vector();
        this.velocity = new Vector();
        this.maxSpeed = 1.5;
        this.maxForce = 0.07;
        this.size = 5;
        this.behaviours = [];
        this.group = [];
        this.avoid = new ObstacleAvoidBehaviour(this);
        console.log("Small triangle created");
    }

    private applyForce(): void {
        if (this.world.navGraph && this.goal.isInactive) {
            this.goal.start();
        }

        if (this.goal.isActive) {
            this.goal.apply();
        }

        this.behaviours.forEach(e => {
            this.acceleration.add(e.apply());
        });

        if (!this.behaviours.some((v, i, a) => { return v instanceof PathfindingBehaviour }))
            this.acceleration.add(this.avoid.apply());

        this.acceleration.limit(this.maxForce);
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