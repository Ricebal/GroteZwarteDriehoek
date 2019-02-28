import { Behaviour } from "./Behaviour";
import { MovingGameEntity } from "../MovingGameEntity";
import { Vector } from "../Vector";

export class PathfindingBehaviour extends Behaviour {
    public destination: Vector;
    public path: Array<Vector>;

    constructor(owner: MovingGameEntity, destination: Vector) {
        super(owner);
        this.destination = destination;
        owner.world.navGraph.findPath(owner.position, destination);
    }


}