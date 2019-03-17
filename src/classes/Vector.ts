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

    public rotate(n: number): Vector {
        n = n * Math.PI / 180;
        let ca: number = Math.cos(n);
        let sa: number = Math.sin(n);
        let x: number = ca * this.x - sa * this.y;
        let y: number = sa * this.x + ca * this.y;

        this.x = x;
        this.y = y;
        return this;
    }

    public static sub(v1: Vector, v2: Vector): Vector {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }

    public static random(): Vector {
        return new Vector(Math.random() * 900, Math.random() * 900);
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

    public static distanceSq(v1: Vector, v2: Vector): number {
        return Math.pow(v2.x - v1.x, 2) + Math.pow(v2.y - v1.y, 2);
    }

    public clone(): Vector {
        return new Vector(this.x, this.y);
    }

    public magSq(): number {
        return this.x * this.x + this.y * this.y;
    }

    public mag(): number {
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
    public limitMin(min: number): Vector {
        let mSq = this.magSq();
        if (mSq < min * min) {
            this.div(Math.sqrt(mSq));
            this.mult(min);
        }
        return this;
    }

    public angleDegrees(v2: Vector): number {
        var angleDeg = Math.atan2(v2.y - this.y, v2.x - this.x) * 180 / Math.PI;
        return angleDeg;
    }
}