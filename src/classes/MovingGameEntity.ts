import { BaseGameEntity } from "./BaseGameEntity";
import { World } from "./World";

export class MovingGameEntity extends BaseGameEntity {
    constructor(x: number, y: number, world: World) {
        super(x, y, world);
    }
}