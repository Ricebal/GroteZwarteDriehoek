import { Vector } from './vector';
import { MovingGameEntity } from './MovingGameEntity';
import { World } from './World';

export class Planet extends MovingGameEntity {
    constructor(x: number, y: number, world: World) {
        super(x, y, world);
    }

    private wander() {

    }

    private flee() {

    }

    private applyForce() {

    }

    public update(): void {
        this.draw();
    }

    private draw(): void {
        this.world.ctx.beginPath();
        this.world.ctx.arc(this.position.x + 10, this.position.y + 10, 20, 0, 2 * Math.PI);
        this.world.ctx.stroke();
    }
}