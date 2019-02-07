// const BigBlackTriangle = class {
//     public acceleration: any;

//     constructor(x, y) {
//         this.acceleration = createVector(0, 0);
//         this.velocity = p5.Vector.random2D();
//         this.position = createVector(x, y);
//         this.maxSpeed = 5;
//         this.maxForce = 0.01;
//     }

//     seek() {
//         let desired = p5.Vector.sub(destination.position, this.position);
//         desired.normalize();
//         desired.mult(this.maxSpeed);

//         let steer = p5.Vector.sub(desired, this.velocity);
//         steer.limit(this.maxForce);
//         return steer;
//     }

//     applyForce() {
//         this.acceleration.add(this.seek());

//         this.velocity.add(this.acceleration);
//         this.velocity.limit(this.maxSpeed);
//         this.position.add(this.velocity);

//         this.acceleration.mult(0);
//     }


//     update() {
//         this.applyForce();
//         this.draw();
//     }

//     draw() {
//         fill('black');
//         triangle(
//             this.position.x + Math.cos(Math.atan2(this.velocity.y, this.velocity.x) + Math.PI * 1.5) * 5, this.position.y + Math.sin(Math.atan2(this.velocity.y, this.velocity.x) + Math.PI * 1.5) * 5,
//             this.position.x + Math.cos(Math.atan2(this.velocity.y, this.velocity.x)) * 20, this.position.y + Math.sin(Math.atan2(this.velocity.y, this.velocity.x)) * 20,
//             this.position.x + Math.cos(Math.atan2(this.velocity.y, this.velocity.x) + Math.PI * 0.5) * 5, this.position.y + Math.sin(Math.atan2(this.velocity.y, this.velocity.x) + Math.PI * 0.5) * 5
//         );

//         // circle(this.position.x, this.position.y, 10);
//         noFill();
//     }
// }