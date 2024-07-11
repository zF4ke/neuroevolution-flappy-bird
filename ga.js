let numberOfGenerations = 1;

function nextGeneration() {
    numberOfGenerations++;
    
    console.log("Generation: " + numberOfGenerations);

    calculateFitness();

    for (let i = 0; i < TOTAL; i++) {
        birds[i] = pickBird();
    }

    savedBirds = [];
}

function pickOne() {
    let index = 0;
    let r = random(1);

    while (r > 0) {
        r = r - savedBirds[index].fitness;
        index++;
    }
    index--;

    return savedBirds[index];
}

function pickBird() {
    let bird = pickOne();
    let child = new Bird(bird.brain);
    child.mutate();

    return child;
}

function calculateFitness() {
    let sum = 0;

    for (let bird of savedBirds) {
        sum += bird.score;
    }

    for (let bird of savedBirds) {
        bird.fitness = bird.score / sum;
    }
}