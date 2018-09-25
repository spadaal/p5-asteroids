let ship;
let asteroids=[];

let rot = 0;
let thrust = 0;
let firing = false;
let score=0;
let level=null;
function setup() {
    createCanvas(800, 600);
    level= new Level(width, height, 100,10);
}

function handleKeyboard() {
    if (keyIsDown(LEFT_ARROW)) {
        rot = -PI / 21;
    } else if (keyIsDown(RIGHT_ARROW)) {
        rot = PI / 21;
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
    if (level.update(rot, thrust, firing)) {
        noLoop();
        text("Game Over",width/2,height/2);
    }
}

function draw() {
    background(0);
    stroke(255);
    handleKeyboard();
    update();

    level.ship.draw();
    for (let a of level.asteroids) a.draw();
    noFill();
    text("Health: " + level.ship.health + " Score: " + level.score,10,10);
}