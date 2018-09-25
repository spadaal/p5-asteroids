class Level {

    constructor(width, height, shipHealth, numAsteroids) {
        this.asteroids = [];
        this.ship = new Ship(createVector(width / 2, height / 2), 0, shipHealth);
        for (var i = 0; i < numAsteroids; i++) this.asteroids.push(new Asteroid(null, null, random(16, 32)));
        this.score = 0;
    }

    update(rot, thrust, firing) {
        this.ship.update(rot, thrust, firing);
        //Collision check ship vs asteroids
        for (let j = 0; j < this.asteroids.length; j++) {
            if (this.ship.hits(this.asteroids[j])) {
                this.ship.health -= floor(this.asteroids[j].r);
                this.asteroidHit(j);
            }
        }
        //Collision check bullets vs asteroids
        for (let i = 0; i < this.ship.lasers.length; i++) {
            let laser = this.ship.lasers[i];
            for (let j = 0; j < this.asteroids.length; j++) {
                if (laser.hits(this.asteroids[j])) {
                    //Remove laser
                    this.ship.lasers.splice(i, 1);
                    //Split the asteroid or destroy it
                    this.asteroidHit(j);
                    this.score++;
                }
            }
        }
        for (let a of this.asteroids) a.update();
        return (this.ship.health < 0 || this.asteroids.length <= 0);
    }

    asteroidHit(j) {
        if (this.asteroids[j].r > 6) {
            let a1 = new Asteroid(null, null, this.asteroids[j].r / 2);
            a1.pos = this.asteroids[j].pos.copy();
            a1.vel = this.asteroids[j].vel.copy().rotate(PI / 9);
            let a2 = new Asteroid(null, null, this.asteroids[j].r / 2);
            a2.pos = this.asteroids[j].pos.copy();
            a2.vel = this.asteroids[j].vel.copy().rotate(-PI / 9);
            this.asteroids.push(a1);
            this.asteroids.push(a2);
        }
        this.asteroids.splice(j, 1);
    }

}