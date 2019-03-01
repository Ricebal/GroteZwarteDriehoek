import { Behaviour } from "./Behaviour";
import { MovingGameEntity } from "../MovingGameEntity";
import { Vector } from "../Vector";
import { SeekBehaviour } from "./SeekBehaviour";

export class PathfindingBehaviour extends Behaviour {
    public destination: Vector;
    public path: Array<Vector>;
    private _seek: SeekBehaviour;

    constructor(owner: MovingGameEntity, destination: Vector) {
        super(owner);
        this.destination = destination;
        this.path = owner.world.navGraph.findPath(owner.position, destination);
    }

    public apply(): Vector {
        if (this.path.length > 0) {
            if (!this._seek) {
                this._seek = new SeekBehaviour(this.owner, this.path[0]);
            }

            if ((Math.abs(this.owner.position.x - this.path[0].x) * 2) + (Math.abs(this.owner.position.y - this.path[0].y) * 2) < 25) {
                this.path = this.path.filter((value, index, arr) => {
                    return value !== this.path[0];
                });
                this._seek = new SeekBehaviour(this.owner, this.path[0]);
            }

            if (this.path.length > 0) {
                return this._seek.apply();
            } else {
                return new Vector();
            }
        }

        return new Vector();
    }
}