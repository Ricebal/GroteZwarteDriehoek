import { World } from '../World';
import { Vector } from '../Vector';
import { MovingGameEntity } from './MovingGameEntity';
import { PathfindingBehaviour } from '../behaviours/PathfindingBehaviour';
import { Config } from '../Config';
import { FollowBehaviour } from '../behaviours/FollowBehaviour';
import { SmallBlackTriangle } from './SmallBlackTriangle';
import { Planet } from './Planet';
import { ObstacleAvoidBehaviour } from '../behaviours/ObstacleAvoidBehaviour';
import { SeekBehaviour } from '../behaviours/SeekBehaviour';
import { SmallBlueCircle } from './SmallBlueCircle';

export class BigBlackTriangle extends MovingGameEntity {
    public size: number;
    public pathTarget: Vector;
    public minSpeed: number;
    public ahead: Vector;
    public ahead2: Vector;
    public lineOfSightPoint: Vector;
    public avoid: ObstacleAvoidBehaviour;


    constructor(x: number, y: number, world: World) {
        super(x, y, world);
        this.maxSpeed = 1.5;
        this.minSpeed = 0.3;
        this.maxForce = 0.025;
        this.size = 10;
        this.behaviours = [];
        this.avoid = new ObstacleAvoidBehaviour(this);
    }

    private lineIntersectsCircle(ahead: Vector, ahead2: Vector, obstacle: Planet): Boolean {
        return Vector.distance(obstacle.position, ahead) <= (obstacle.size) || Vector.distance(obstacle.position, ahead2) <= (obstacle.size);
    }

    private applyForce(): void {
        if (!this.pathTarget && Config.mousePos)
            this.pathTarget = Config.mousePos;

        if (this.pathTarget && Vector.distanceSq(this.pathTarget, Config.mousePos) > 1) {
            this.pathTarget = Config.mousePos.clone();
            this.behaviours = [new PathfindingBehaviour(this, this.pathTarget)];
        }

        this.behaviours.forEach(e => {
            this.acceleration.add(e.apply());
        });

        if (!this.behaviours.some((v, i, a) => { return v instanceof PathfindingBehaviour }))
            this.acceleration.add(this.avoid.apply());

        this.acceleration.limit(this.maxForce);

        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        // this.velocity.limitMin(this.minSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }


    public update(): void {
        let normVelocity = this.velocity.clone().normalize();
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
    }
}