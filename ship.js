class Ship {
    constructor(pos, direction, health, brain) {
        this.pos = pos;
        this.direction = direction;
        this.health = health;
        this.brain = brain;
        this.acc = createVector(0, 0);
        this.vel = createVector(0, 0);
    }

    update(rot, thrust) {
        this.direction += rot;
        this.acc.add(createVector(1,0).rotate(this.direction).setMag(thrust));
        if (this.acc.mag()>1) this.acc.setMag(1);
        this.vel = this.vel.add(this.acc);
        if (this.vel.mag()>10) this.vel.setMag(10);
        this.pos = this.pos.add(this.vel);
        if (this.pos.x<0) this.pos.x=width;
        if (this.pos.x>width) this.pos.x=0;
        if (this.pos.y<0) this.pos.y=height;
        if (this.pos.y>height) this.pos.y=0;

    }

    draw() {
        translate(this.pos);
        rotate(this.direction);
        noFill();
        triangle(10,0,-5,-5,-5,5);
    }
}