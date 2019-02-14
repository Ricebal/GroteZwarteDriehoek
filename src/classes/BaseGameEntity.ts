import { Vector } from "./vector";
import { World } from "./World";

export class BaseGameEntity {
    public position: Vector;
    public world: World;

    constructor(x: number, y: number, world: World) {
        this.position = new Vector(x, y);
        this.world = world;
    }

    public update(): void {

    }
}