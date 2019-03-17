import { Behaviour } from "./Behaviour";
import { MovingGameEntity } from "../entities/MovingGameEntity";
import { Vector } from "../Vector";
import { SeekBehaviour } from "./SeekBehaviour";
import { ArriveBehaviour } from "./ArriveBehaviour";

export class PathfindingBehaviour extends Behaviour {
    public destination: Vector;
    public path: Array<Vector>;
    private _subBehaviour: Behaviour;

    constructor(owner: MovingGameEntity, destination: Vector) {
        super(owner);
        this.destination = destination;
        this.path = owner.world.navGraph.findPath(owner.position, destination);
    }

    public apply(): Vector {
        // If there is more than 1 vector left in the path seek to the next vector
        if (this.path.length > 1) {
            if (!this._subBehaviour) {
                this._subBehaviour = new SeekBehaviour(this.owner, this.path[0]);
            }

            if (Vector.distanceSq(this.owner.position, this.path[0]) < Math.pow(this.owner.world.navGraph.gridSize, 2)) {
                this.path = this.path.filter((value, index, arr) => {
                    return value !== this.path[0];
                });
                this._subBehaviour = new SeekBehaviour(this.owner, this.path[0]);
            }
        }

        // If there is only 1 vector left arrive at the last vector and thus stop
        if (this.path.length === 1 && !(this._subBehaviour instanceof ArriveBehaviour)) {
            if (!this._subBehaviour) {
                this._subBehaviour = new ArriveBehaviour(this.owner, this.path[0]);
            }

            this._subBehaviour = new ArriveBehaviour(this.owner, this.path[0]);
        }

        return this._subBehaviour.apply();
    }
}