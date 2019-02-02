const BigBlackTriangle = class {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 50;
        this.direction = 0;
        this.velocity = 5;
        this.directionCap = 0.01;
    }

    steer() {
        var ax = destination.x - bbt.x;
        var ay = destination.y - bbt.y;
        var theta = Math.atan2(ay, ax);
        if (
            theta - this.direction < this.directionCap ||
            // theta - this.direction > -this.directionCap && theta - this.direction < 0
            theta - this.direction > Math.PI * 2 + this.directionCap
        ) {
            console.log('legal');
            return theta;
        } else if (theta < this.direction) {
            return this.direction - this.directionCap;
        } else if (theta > this.direction) {
            return this.direction + this.directionCap;
        }
    }

    calculateVelocity() {
        var height = destination.x - this.x;
        var width = destination.y - this.y;
        var speed = height * height + width * width;
        return 0.00000000015 * speed * speed + 1;
    }

    update() {
        this.direction = this.steer();
        this.velocity = this.calculateVelocity();
        this.x += Math.cos(this.direction) * this.velocity;
        this.y += Math.sin(this.direction) * this.velocity;
    }

    draw() {
        fill('black');
        triangle(
            this.x + Math.cos(this.direction + Math.PI * 1.5) * 5, this.y + Math.sin(this.direction + Math.PI * 1.5) * 5,
            this.x + Math.cos(this.direction) * 20, this.y + Math.sin(this.direction) * 20,
            this.x + Math.cos(this.direction + Math.PI * 0.5) * 5, this.y + Math.sin(this.direction + Math.PI * 0.5) * 5
        );
        noFill();
    }
}