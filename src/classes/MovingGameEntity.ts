import { BaseGameEntity } from "./BaseGameEntity";
import { World } from "./World";
import { Vector } from "./Vector";
import { Behaviour } from "./behaviours/Behaviour";

export class MovingGameEntity extends BaseGameEntity {
    public acceleration: Vector;
    public velocity: Vector;
    public maxSpeed: number;
    public maxForce: number;
    public maxAvoidForce: number;
    public behaviours: Array<Behaviour>;

    constructor(x: number, y: number, world: World) {
        super(x, y, world);
        this.acceleration = new Vector();
        this.velocity = new Vector();
    }
}