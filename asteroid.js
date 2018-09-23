class Asteroid {
    constructor(pos, vel, r) {
        this.pos = pos ? pos : createVector(random(width), random(height));
        this.r = r;
        this.vel = vel ? vel : createVector(random(5) - 2.5, random(5) - 2.5);
        this.offsets = [];
        for (var i=0;i<16;i++) this.offsets.push(random(this.r/3)-this.r/6);
    }

    update() {
        this.pos = this.pos.add(this.vel);
        if (this.pos.x+this.r < 0) this.pos.x = width;
        if (this.pos.x-this.r > width) this.pos.x = 0;
        if (this.pos.y+this.r < 0) this.pos.y = height;
        if (this.pos.y-this.r > height) this.pos.y = 0;
    }

    draw() {
        push();
        translate(this.pos);
        noFill();
        if (this.r<3) {
            ellipse(0, 0, this.r*2, this.r*2);
        } else {
            beginShape();
            for (var i=0;i<this.offsets.length;i++) {
                let angle = map(i,0,this.offsets.length,0,PI*2);
                let x = (this.r+this.offsets[i])*cos(angle);
                let y = (this.r+this.offsets[i])*sin(angle);
                vertex(x,y);
            }
            endShape(CLOSE);
        }
        pop();
    }
}