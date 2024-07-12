// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&

// with some minor tweaks

function Bird(brain) {
    this.y = height/2;
    this.x = 64;
    this.h = 32
  
    this.gravity = 0.1;
    this.lift = -4;
    this.velocity = 0;

    this.score = 0
    this.fitness = 0

    if (brain) {
        this.brain = brain.copy();
    } else {   
        this.brain = new NeuralNetwork(5, 4, 1);
    }

    this.think = function(pipes) {
        closest = this.findClosestPipe(pipes);

        closest.highlight = true;

        let inputs = [];
        inputs[0] = this.y / height;
        inputs[1] = closest.top / height;
        inputs[2] = closest.bottom / height;
        inputs[3] = closest.x / width;
        inputs[4] = this.velocity / 10;

        let output = this.brain.predict(inputs);

        if (output[0] > 0.5) {
            this.up()
        }
    }

    this.findClosestPipe = function(pipes) {
        let closest = null;
        let closestDistance = Infinity;

        for (let i = 0; i < pipes.length; i++) {

            let d = (pipes[i].x + pipes[i].w) - this.x

            if (d < closestDistance && d > 0) {
                closest = pipes[i]
                closestDistance = d
            }
        }

        return closest;
    }

    this.offscreen = function() {
        return this.y > height || this.y < 0;
    }

    this.mutate = function () {
        this.brain.mutate(0.1)
    }
  
    this.update = function() {
        // birds get points as they live longer
        this.score++;

        this.velocity += this.gravity;
        // this.velocity *= 0.9;
        this.y += this.velocity;
    }
  
    this.show = function() {
        stroke(255);
        fill(255, 50);
        ellipse(this.x, this.y, 32, 32);
    }
  
    this.up = function() {
        this.velocity = this.lift;
    }
  
  }
  