import { Vector } from './Vector';
import { MovingGameEntity } from './MovingGameEntity';
import { World } from './World';

export class Planet extends MovingGameEntity {
    private right: boolean;
    private up: boolean;
    private vSpeed: number;
    private hSpeed: number;

    constructor(x: number, y: number, world: World) {
        super(x, y, world);
        this.right = true;
        this.up = true;
        this.vSpeed = 10;
        this.hSpeed = 5;
    }

    private move(): void {
        if (this.right) {
            if (this.position.x < 900) {
                this.position.add(new Vector(this.hSpeed, 0));
            } else {
                this.right = false;
                this.hSpeed = Math.floor(Math.random() * 10) + 5;
            }
        } else {
            if (this.position.x > 0) {
                this.position.add(new Vector(-this.hSpeed, 0));
            } else {
                this.right = true;
            }
        }

        if (this.up) {
            if (this.position.y < 900) {
                this.position.add(new Vector(0, this.vSpeed));
            } else {
                this.up = false;
            }
        } else {
            if (this.position.y > 0) {
                this.position.add(new Vector(0, -this.vSpeed));
            } else {
                this.up = true;
                this.vSpeed = Math.floor(Math.random() * 10) + 5;
            }
        }
    }

    public update(): void {
        this.move();
        this.draw();
    }

    private draw(): void {
        this.world.ctx.beginPath();
        this.world.ctx.arc(this.position.x + 10, this.position.y + 10, 20, 0, 2 * Math.PI);
        this.world.ctx.stroke();
    }
}