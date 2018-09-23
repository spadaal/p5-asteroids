let ship;
let rot = 0;
let thrust = 0;
function setup() {
    createCanvas(800, 600);
    ship = new Ship(createVector(width / 2, height / 2), 0, 100);
}

function keyPressed() {
    if (keyCode == LEFT_ARROW) {
        rot = -PI / 12;
    } else if (keyCode == RIGHT_ARROW) {
        rot = PI / 12;
    }
    if (keyCode == UP_ARROW) {
        thrust = 0.05;
    }
}

function keyReleased() {
    rot = 0;
    thrust = 0;
}

function draw() {
    background(0);
    stroke(255);
    console.info(keyIsPressed + " " + keyCode);
    //rect(width/2,height/2,10,10);
    ship.update(rot, thrust);
    ship.draw();
}