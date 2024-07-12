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
let saveButton;
let runButton;
let trainButton;

let trainMode = true;

function setup() {
    createCanvas(640, 480);
    saveButton = createButton("Save");
    saveButton.mouseClicked(saveOneBird)
    runButton = createButton("Run Bird");
    runButton.mouseClicked(runBird)
    trainButton = createButton("Train");
    trainButton.mouseClicked(() => location.reload())

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

    if (trainMode) {
        if (birds.length == 0) {
            counter = 0;
            nextGeneration()
            pipes = []
        }
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

function saveOneBird() {
    let bird = birds[0];
    let json = bird.brain.serialize();

    localStorage.setItem("bird", json);
    console.log("Saved");
}

function runBird() {
    let json = localStorage.getItem("bird");
    let bird = new Bird();
    bird.brain = NeuralNetwork.deserialize(json);
    birds = [bird];
    pipes = [];
    pipes.push(new Pipe());
    trainMode = false;
}