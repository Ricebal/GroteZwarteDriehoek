import { MovingGameEntity } from "./MovingGameEntity";
import { World } from "../World";
import { Planet } from "./Planet";
import { Config } from "../Config";
import { FleeBehaviour } from "../behaviours/FleeBehaviour";
import { Vector } from "../Vector";
import { WanderBehaviour } from "../behaviours/WanderBehaviour";
import { ObstacleAvoidBehaviour } from "../behaviours/ObstacleAvoidBehaviour";
import { GoalSeek } from "../goals/GoalSeek";
import { Goal } from "../goals/Goal";


export class SmallBlueCircle extends MovingGameEntity {
    private avoid: ObstacleAvoidBehaviour;

    constructor(x: number, y: number, world: World) {
        super(x, y, world);
        this.maxSpeed = 2;
        this.maxForce = 0.5;
        this.behaviours = [];
        this.behaviours.push(new WanderBehaviour(this));
        this.avoid = new ObstacleAvoidBehaviour(this);
    }

    private applyForce(): void {

        if (this.world.gameObjects[1].position && Vector.distanceSq(this.world.gameObjects[0].position, this.position) < Math.pow(Config.panicDistance, 2)) {
            // this.behaviours = [new FleeBehaviour(this, this.world.gameObjects[0].position)];
        } else {
            this.behaviours = [new WanderBehaviour(this)];
        }
        for (let i = 0; i < this.world.gameObjects.length; i++) {
            if (this.world.gameObjects[i] instanceof Planet && Vector.distanceSq(this.world.gameObjects[i].position, this.position) < Math.pow((<Planet>this.world.gameObjects[i]).size, 2) + 100) {

                //this.behaviours.push(new ObstacleAvoidBehaviour(this, this.world.gameObjects[i].position, ((<Planet>this.world.gameObjects[i]).size) / 2));
            }
        }

        for (let key in this.behaviours) {
            this.acceleration.add(this.behaviours[key].apply());
        }

        this.acceleration.add(this.avoid.apply());


        if (this.position.x < 0 || this.position.x > 900) {
            this.velocity.x *= -1;
        }

        if (this.position.y < 0 || this.position.y > 900) {
            this.velocity.y *= -1;
        }

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
        const ctx = this.world.ctx;

        if (Config.panicDistanceVisualEnabled) {
            ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, Config.panicDistance, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
        }

        ctx.fillStyle = 'rgb(0, 0, 255)';
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 6, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();


        for (let i = 0; i < this.world.gameObjects.length; i++) {
            if (this.world.gameObjects[i] instanceof Planet && !(<Planet>this.world.gameObjects[i]).isDestroyed) {
                var target = <Planet>this.world.gameObjects[i];
                ctx.strokeStyle = 'rgb(0, 0, 255)';
                ctx.beginPath();
                ctx.lineTo(this.position.x, this.position.y);
                var angle = this.position.angleDegrees(target.position);
                angle += 90;

                ctx.lineTo((((Math.cos(angle * Math.PI / 180)) * target.size) + target.position.x), ((Math.sin(angle * Math.PI / 180)) * target.size) + target.position.y);
                angle -= 180;
                ctx.moveTo(this.position.x, this.position.y);
                ctx.lineTo((((Math.cos(angle * Math.PI / 180)) * target.size) + target.position.x), ((Math.sin(angle * Math.PI / 180)) * target.size) + target.position.y);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}