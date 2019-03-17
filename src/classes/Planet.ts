import { Vector } from './Vector';
import { MovingGameEntity } from './entities/MovingGameEntity';
import { World } from './World';
import { StaticGameEntity } from './entities/StaticGameEntity';


export class Planet extends StaticGameEntity {
    public size: number;

    constructor(world: World) {
        super(Math.floor(Math.random() * (+900 - +0)) + +0, Math.floor(Math.random() * (+900 - +0)) + +0, world);
        this.size = Math.floor(Math.random() * (+60 - +10)) + +10;
    }

    public update(): void {
        this.draw();
    }

    private draw(): void {
        let ctx = this.world.ctx;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
    }
}