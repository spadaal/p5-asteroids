class Ship {
    constructor(pos, direction, health) {
        this.pos = pos;
        this.direction = direction;
        this.health = health;
        this.acc = createVector(0, 0);
        this.vel = createVector(0, 0);
        this.maxAcc = 2;
        this.maxVel = 6;
        this.r = 8;

        this.lasers = [];
        this.maxLasers = 5;
        this.lastFired=0;
        this.laserCooldown=7;
    }

    update(rot, thrust, firing) {

        this.direction += rot;
        this.acc = (createVector(1, 0).rotate(this.direction).setMag(thrust));
        if (this.acc.mag() > this.maxAcc) this.acc.setMag(this.maxAcc);
        this.vel = this.vel.add(this.acc);
        if (this.vel.mag() > this.maxVel) this.vel.setMag(this.maxVel);
        this.pos = this.pos.add(this.vel);
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.y < 0) this.pos.y = height;
        if (this.pos.y > height) this.pos.y = 0;
        if (firing && this.lastFired>this.laserCooldown) {
            this.fire();
            this.lastFired=0;
        } else {
            this.lastFired++;
        }
        for (let i = 0; i < this.lasers.length; i++) {
            if (this.lasers[i].update()) {
                this.lasers.splice(i, 1);
            }
        }
    }

    fire() {
        if (this.lasers.length < this.maxLasers) {
            this.lasers.push(new Laser(this.pos, this.direction));
        }
    }

    hits(target) {
        return (dist(this.pos.x,this.pos.y,target.pos.x,target.pos.y)<this.r+target.r);
    }

    draw() {
        push();
        translate(this.pos);
        rotate(this.direction);
        noFill();
        triangle(this.r * 2, 0, -this.r, -this.r, -this.r, this.r);
        if (this.acc.mag()>0) {
            triangle(-this.r *random(1.3,2.2), 0, -this.r, -this.r/2, -this.r, this.r/2);
        }
        pop();
        for (let laser of this.lasers) {
            laser.draw();
        }
    }
}