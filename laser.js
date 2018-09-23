class Laser {
    constructor(shipPos, shipDirection) {
        this.pos = shipPos.copy();
        this.vel = p5.Vector.fromAngle(shipDirection).setMag(10);
    }

    update() {
        this.pos.add(this.vel);
        return (this.pos.x<0 || this.pos.x>width || this.pos.y<0 || this.pos.y>height);
    }

    draw() {
        push();
        noFill();
        stroke(255);
        ellipse(this.pos.x, this.pos.y, 2, 2);
        pop();
    }

    hits(target) {
        return (dist(this.pos.x,this.pos.y,target.pos.x,target.pos.y)<2+target.r);
    }
}