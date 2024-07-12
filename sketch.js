// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&

const TOTAL = 500;
let birds = [];
let savedBirds = [];
let pipes = [];
let counter = 1;
let slider;

function setup() {
    createCanvas(640, 480);
    slider = createSlider(1, 1000, 1);

    for (let i = 0; i < TOTAL; i++) {
        birds[i] = new Bird();
    }
    pipes.push(new Pipe());
}

function draw() {
    for (let n = 0; n < slider.value(); n++) {
        logic();
    }

    background(0);

    for (let bird of birds) {
        bird.show()
    }

    for (let pipe of pipes) {
        pipe.show()
    }
}

function logic() {
    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].update();

        for (let j = 0; j < birds.length; j++) {
            if (pipes[i].hits(birds[j])) {
                savedBirds.push(birds[j]);
                birds.splice(j, 1)
            }
        }

        if (pipes[i].offscreen()) {
            pipes.splice(i, 1);
        }
    }

    for (let i = 0; i < birds.length; i++) {
        if (birds[i].offscreen()) {
            savedBirds.push(birds[i]);
            birds.splice(i, 1)
        }
    }

    for (let bird of birds) {
        bird.think(pipes);
        bird.update();
    }

    if (birds.length == 0) {
        counter = 0;
        nextGeneration()
        pipes = []
    }

    if (counter % 150 == 0) {
        pipes.push(new Pipe());
    }

    counter++;
}

// function keyPressed() {
//     if (key == " ") {
//         bird.up();
//         //console.log("SPACE");
//     }
// }
