export class Vector {
    public x: number;
    public y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    public add(v: Vector): Vector {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    public static sub(v1: Vector, v2: Vector): Vector {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }

    public mult(n: number): Vector {
        this.x *= n;
        this.y *= n;
        return this;
    }

    public div(n: number): Vector {
        this.x /= n;
        this.y /= n;
        return this;
    }

    private magSq(): number {
        return this.x * this.x + this.y * this.y;
    }

    private mag(): number {
        return Math.sqrt(this.magSq());
    }

    public normalize(): Vector {
        let len = this.mag();
        if (len !== 0) {
            this.mult(1 / len);
        }
        return this;
    }

    public limit(max: number): Vector {
        let mSq = this.magSq();
        if (mSq > max * max) {
            this.div(Math.sqrt(mSq));
            this.mult(max);
        }
        return this;
    }
}