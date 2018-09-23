class Ship {
    constructor(pos, direction, health, brain) {
        this.pos = pos;
        this.direction = direction;
        this.health = health;
        this.brain = brain;
        this.acc = createVector(0, 0);
        this.vel = createVector(0, 0);
        this.maxAcc=2;
        this.maxVel=6;
        this.r=8;
    }

    update(rot, thrust) {
        this.direction += rot;
        this.acc=(createVector(1,0).rotate(this.direction).setMag(thrust));
        if (this.acc.mag()>this.maxAcc) this.acc.setMag(this.maxAcc);
        this.vel = this.vel.add(this.acc);
        if (this.vel.mag()>this.maxVel) this.vel.setMag(this.maxVel);
        this.pos = this.pos.add(this.vel);
        if (this.pos.x<0) this.pos.x=width;
        if (this.pos.x>width) this.pos.x=0;
        if (this.pos.y<0) this.pos.y=height;
        if (this.pos.y>height) this.pos.y=0;

    }

    draw() {
        push();
        translate(this.pos);
        rotate(this.direction);
        noFill();
        triangle(this.r*2,0,-this.r,-this.r,-this.r,this.r);
        pop();
    }
}