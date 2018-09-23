let ship;
let asteroids=[];

let rot = 0;
let thrust = 0;
let firing = false;

function setup() {
    createCanvas(800, 600);
    ship = new Ship(createVector(width / 2, height / 2), 0, 100);
    for (var i=0;i<16;i++) asteroids.push(new Asteroid(null,null,random(6,32)));
}

function handleKeyboard() {
    if (keyIsDown(LEFT_ARROW)) {
        rot = -PI / 18;
    } else if (keyIsDown(RIGHT_ARROW)) {
        rot = PI / 18;
    } else {
        rot = 0;
    }
    if (keyIsDown(UP_ARROW)) {
        thrust = 0.05;
    } else {
        thrust = 0;
    }
    
    firing = keyIsDown(32);
}

function update() {
    ship.update(rot, thrust, firing);
     //Collision check bullets vs asteroids
     for (let i = 0;i<ship.lasers.length;i++) {
        let laser = ship.lasers[i];
        for (let j = 0;j<asteroids.length;j++) {
            if (laser.hits(asteroids[j])) {
                //Remove laser
                ship.lasers.splice(i,1);
                //Split the asteroid or destroy it
                
                if (asteroids[j].r>6) {
                    let a1 = new Asteroid(null,null,asteroids[j].r/2);
                    a1.pos = asteroids[j].pos.copy();
                    a1.vel = asteroids[j].vel.copy().rotate(PI/9);
                    let a2 = new Asteroid(null,null,asteroids[j].r/2);
                    a2.pos = asteroids[j].pos.copy();
                    a2.vel = asteroids[j].vel.copy().rotate(-PI/9);
                    asteroids.push(a1);
                    asteroids.push(a2);
                }
                asteroids.splice(j,1);
            }
        }
    }
    for (let a of asteroids) a.update();
}

function draw() {
    background(0);
    stroke(255);
    handleKeyboard();
    update();

    ship.draw();
    for (let a of asteroids) a.draw();
}