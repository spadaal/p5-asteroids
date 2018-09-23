let ship;
let asteroids=[];

let rot = 0;
let thrust = 0;
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
}

function draw() {
    background(0);
    stroke(255);
    handleKeyboard();
    ship.update(rot, thrust);
    for (let a of asteroids) a.update();
    ship.draw();
    for (let a of asteroids) a.draw();
}