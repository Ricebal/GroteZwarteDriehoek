import { World } from '../World';
import { Vector } from '../Vector';
import { MovingGameEntity } from './MovingGameEntity';
import { Goal } from '../goals/Goal';
import { GoalSeek } from '../goals/GoalSeek';
import { ObstacleAvoidBehaviour } from '../behaviours/ObstacleAvoidBehaviour';
import { PathfindingBehaviour } from '../behaviours/PathfindingBehaviour';
import { Config } from '../Config';
import { CompositeGoal } from '../goals/CompositeGoal';
import { StaticGameEntity } from './StaticGameEntity';
import { Planet } from './Planet';

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

        if (!this.behaviours.some((v, i, a) => { return v instanceof PathfindingBehaviour }) && this.avoid)
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

    public inCircle(lineStart: Vector, lineEnd: Vector, target: StaticGameEntity): boolean {
        let x1 = lineStart.x - target.position.x;
        let x2 = lineEnd.x - target.position.x;
        let y1 = lineStart.y - target.position.y;
        let y2 = lineEnd.y - target.position.y;
        let dx = x2 - x1;
        let dy = y2 - y1;
        let dr_sq = Math.sqrt(dx) + Math.sqrt(dy);
        let D = x1 * y2 - x2 * y1;
        return Math.sqrt((<Planet>target).size) * dr_sq > Math.sqrt(D);
    }

    private draw(): void {
        const ctx = this.world.ctx;
        let owner = this;
        if (Config.goalBehaviorsCheckboxEnabled) {
            ctx.fillStyle = 'rgb(0, 0, 0)';
            ctx.font = "10px Arial";
            ctx.fillText(this.goal.label, this.position.x + 5, this.position.y + 5);
            let posx = 15;
            let posy = 15;
            (<CompositeGoal>this.goal).goals.forEach(function (element) {
                if (element.status === 'active') {
                    ctx.fillStyle = 'rgb(255,0,0';
                }
                else if (element.status === 'completed') {
                    ctx.fillStyle = 'rgb(20,200,20';
                }
                ctx.fillText(element.label, owner.position.x + posx, owner.position.y + posy);
                posy += 10;
            })
        }
        let context = this;
        let inLOS: boolean = true;
        this.world.gameObjects.forEach(function (element) {
            if (element instanceof Planet) {

                if (context.inCircle(owner.position, owner.world.gameObjects[1].position, element)) {
                    inLOS = false;
                }
            }
        })
        if (inLOS) {
            ctx.strokeStyle = 'rgb(0, 255, 0)';
        } else {
            ctx.strokeStyle = 'rgb(255, 0, 0)';
        }
        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(this.world.gameObjects[1].position.x, this.world.gameObjects[1].position.y);
        ctx.stroke();
        ctx.closePath();
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.beginPath();
        ctx.moveTo(this.position.x + Math.cos(Math.atan2(this.velocity.y, this.velocity.x) + Math.PI * 1.5) * this.size, this.position.y + Math.sin(Math.atan2(this.velocity.y, this.velocity.x) + Math.PI * 1.5) * this.size);
        ctx.lineTo(this.position.x + Math.cos(Math.atan2(this.velocity.y, this.velocity.x)) * this.size * 4, this.position.y + Math.sin(Math.atan2(this.velocity.y, this.velocity.x)) * this.size * 4);
        ctx.lineTo(this.position.x + Math.cos(Math.atan2(this.velocity.y, this.velocity.x) + Math.PI * 0.5) * this.size, this.position.y + Math.sin(Math.atan2(this.velocity.y, this.velocity.x) + Math.PI * 0.5) * this.size);
        ctx.fill();
        ctx.closePath();
    }
}