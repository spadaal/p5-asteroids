let ship;
let rot = 0;
let thrust = 0;
function setup() {
    createCanvas(800, 600);
    ship = new Ship(createVector(width / 2, height / 2), 0, 100);
}

function handleKeyboard() {
    thrust = 0;
    if (keyIsPressed) {
        switch (keyCode) {
            case (LEFT_ARROW):
                rot = -PI / 12
                break;
            case (RIGHT_ARROW):
                rot = PI / 12;
                break;
            case (UP_ARROW):
                thrust = 0.1;
                break;
        }
    }
}

function draw() {
    background(0);
    stroke(255);
    fill(0);
    handleKeyboard();
    console.info(keyIsPressed + " " + keyCode);
    //rect(width/2,height/2,10,10);
    ship.update(rot, thrust);
    ship.draw();
    rot = 0;
}