/*

Game project 5: Multiple Interactables

*/

var canvasWidth;
var canvasHeight;
var gameChar_x;
var gameChar_y;
var ground_y;
var ground_height;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var isJumping;

var obj = {
    head: {
        c: "#020e21", // color
        w: 20, // width
        h: 18, // height
        d: 10, // depth
    },
    neck: {
        c: "#C9304F",
        w: 10,
        h: 2,
        d: 5,
    },
    body: {
        c: "#FFCE63",
        w: 26,
        h: 30,
        d: 15
    },
    arm: {
        c: "#1a0702 ",
        w: 5,
        h: 22,
        top: 2,
        d: 5,
    },
    leg: {
        c: "#020e21",
        w: 5,
        h: 17,
        d: 5,
        jumping: {
            h: 10
        }
    },
    foot: {
        c: "#FF3D63",
        w: 8,
        h: 3,
    },
    eye: {
        c: "255",
        r: 7, // radii
        d: 4,
        inner: {
            c: "red",
            top: 0.5 // offset
        },
        top: 7,
    },
    height: 0,
    jumpLength: 100,
};

var canyons = [
    {
        x_pos: 0,
        width: 0,
    }
]

// Idea is there can be any type of collectable
function Collectable(x, y, size, found) {
    this.x_pos = x;
    this.y_pos = y;
    this.size = size;
    this.found = found;

    this.draw = function () {
        push();
        fill(`rgb(${Math.round(random(0, 255))}, ${Math.round(random(0, 100))}, ${Math.round(random(0, 200))})`);
        stroke("black")
        strokeWeight(2)
        rect(this.x_pos - (this.size / 2), (ground_y - this.y_pos) - (this.size / 2), this.size)
        pop();
    }

    this.checkCollectable = function () {
        if (this.inRange()) {
            this.found = true;
            score++;
            Sound.collect()
        }
    }

    this.inRange = function () {
        var points_to_check = [
            [gameChar_x, gameChar_y],
            [gameChar_x - obj.foot.w, gameChar_y],  // left foot
            [gameChar_x + obj.foot.w, gameChar_y],  // right foot
            [gameChar_x - obj.body.w / 2, gameChar_y + obj.foot.h + obj.leg.h],  // lower-left body
            [gameChar_x + obj.body.w / 2, gameChar_y + obj.foot.h + obj.leg.h],  // lower-right body
            [gameChar_x - obj.body.w / 2, gameChar_y + obj.foot.h + obj.leg.h + obj.body.h],  // upper-left body
            [gameChar_x + obj.body.w / 2, gameChar_y + obj.foot.h + obj.leg.h + obj.body.h],  // upper-right body
            [gameChar_x - (obj.arm.w + (obj.body.w / 2)), (gameChar_y - obj.height) + obj.head.h + obj.neck.h + obj.arm.top],  // upper-left arm
            [gameChar_x - (obj.arm.w + (obj.body.w / 2)), (gameChar_y - obj.height) + obj.head.h + obj.neck.h + obj.arm.top + (obj.arm.h / 2)],  // half-left arm
            [gameChar_x + (obj.arm.w + (obj.body.w / 2)), (gameChar_y - obj.height) + obj.head.h + obj.neck.h + obj.arm.top],  // upper-right arm
            [gameChar_x + (obj.arm.w + (obj.body.w / 2)), (gameChar_y - obj.height) + obj.head.h + obj.neck.h + obj.arm.top + (obj.arm.h / 2)],  // half-right arm
            [gameChar_x - (obj.arm.w + (obj.body.w / 2)), (gameChar_y - obj.height) + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h],  // lower-left arm
            [gameChar_x + (obj.arm.w + (obj.body.w / 2)), (gameChar_y - obj.height) + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h],  // lower-right arm
            [gameChar_x - (obj.head.w / 2), gameChar_y - obj.height],  // upper-left head
            [gameChar_x + (obj.head.w / 2), gameChar_y - obj.height],  // upper-right head
            [gameChar_x - (obj.head.w / 2), (gameChar_y - obj.height) + (obj.head.h / 2)],  // upper-half-left head
            [gameChar_x + (obj.head.w / 2), (gameChar_y - obj.height) + (obj.head.h / 2)],  // upper-half-right head
        ]

        for (let i = 0; i < points_to_check.length; i++){
            var points = points_to_check[i];
            var x = points[0];
            var y = points[1];
            if (dist(x, y, this.x_pos, ground_y - this.y_pos) <= this.size / 2) {
                return true;
            }
        }
    }

    this.display = function () {
        if (!this.found) {
            this.draw();
            this.checkCollectable();
        }
    }
}

// dummy data for type inference, will be init in setup()
var collectables = [
    new Collectable(0, 0, 0, false)
]

const COLLECTIBLE_TYPES = [
    Collectable,
]


var clouds;
var mountains;
var trees_x;
var trees_height;
var trees_color;
var cameraPosX;
var sky;

// This variable is to store the current game character draw function
var character_draw_function;

var score;

var flagpole = {
    isReached: false,
    x_pos: 0,
    height: 0,
}

// Set the values for LEFT, RIGHT and SPACE keys
const LEFT = 37;
const RIGHT = 39;
const SPACE = 32;

var lives;
const defaultLives = 3;

var gameOver;
var gameCompleted;

const STARTING_POINT = -20000;
const ENDING_POINT = 20000;


const TREE_HEIGHT_MIN = 100;
const TREE_HEIGHT_MAX = 200;

const MOUNTAIN_COLORS = [
    "#852604",
    "#05574f",
    "#053a57",
    "#822e04",
]

class SoundBuilder {
    jumpSound;
    collectSound;
    completeSound;
    endSound;
    deathSound;

    constructor() {
        this.jumpSound = null;
    }

    init() {
        soundFormats('mp3', 'wav');
        this.jumpSound = loadSound("assets/sounds/jump.wav");
        this.collectSound = loadSound("assets/sounds/mixkit-player-jumping-in-a-video-game-2043.wav");
        this.completeSound = loadSound("assets/sounds/mixkit-completion-of-a-level-2063.wav");
        this.endSound = loadSound("assets/sounds/mixkit-arcade-space-shooter-dead-notification-272.wav");
        this.deathSound = loadSound("assets/sounds/mixkit-creature-cry-of-hurt-2208.wav");
    };

    jump() {
        this.jumpSound.play();
        this.jumpSound.setVolume(0.1);
    };

    collect() {
        this.collectSound.play();
        this.collectSound.setVolume(0.1);
    };

    gameComplete() {
        this.completeSound.play();
        this.completeSound.setVolume(0.1);
    };

    gameOver() {
        this.endSound.play();
        this.endSound.setVolume(0.1);
    };

    falling() {
        this.deathSound.play();
        this.deathSound.setVolume(0.1);
    }
}

let Sound = new SoundBuilder();

function startGame() {
    ground_y = canvasHeight * 3 / 4;
    ground_height = canvasHeight - ground_y

    gameChar_x = 0;
    gameChar_y = ground_y;

    // Create random trees
    trees_x = []
    trees_height = []
    trees_color = []

    for (let i = STARTING_POINT; i < ENDING_POINT; i += 350) {
        trees_x.push(random(i - 100, i + 100));
        trees_height.push(random(TREE_HEIGHT_MIN, TREE_HEIGHT_MAX));
        trees_color.push({
            head: `rgb(${round(random(0, 105))}, 30, ${round(random(0, 20))})`,
            trunk: "#08800e",
            fruit: `rgb(${round(random(0, 200))}, 150, ${round(random(0, 20))})`,
        });
    }

    // Create random collectables
    collectables = []

    for (let i = STARTING_POINT; i < ENDING_POINT; i += 200) {
        var data = {
            x_pos: random(i - 100, i + 100),
            y_pos: random(30, 120),
            size: random(10, 30),
            found: false
        }

        // continue if collectable is too close to gameChar_x
        const CollectibleType = random(COLLECTIBLE_TYPES);
        var collectable = new CollectibleType(data.x_pos, data.y_pos, data.size, data.found);
        if (collectable.inRange()) {
            continue;
        }
        collectables.push(collectable);
    }

    // Create random clouds
    clouds = [
    ]

    for (let i = STARTING_POINT; i < ENDING_POINT; i += 400) {
        clouds.push({
            x: random(i - 100, i + 100),
            y: random(70, 250),
        });
    }

    // Create random mountains
    mountains = []
    for (let i = STARTING_POINT; i < ENDING_POINT; i += 500) {
        var start = random(i - 100, i + 100);
        var width = random(150, 300);
        var height = random(width, width + 200);
        var color = random(MOUNTAIN_COLORS);
        mountains.push({
            start: start,
            width: width,
            height: height,
            color: color
        });
    }

    // Create random canyons
    canyons = []
    for (let i = STARTING_POINT; i < ENDING_POINT; i += 700) {
        var x_pos = random(i - 100, i + 100);

        // Make sure the canyon is not too close to the previous one
        if (canyons.length > 0) {
            while (x_pos < canyons[canyons.length - 1].x_pos + canyons[canyons.length - 1].width + 100) {
                x_pos = random(i - 100, i + 100);
            }
        }

        // Continue if the canyon is too close to gameChar_x
        if (dist(x_pos, 0, gameChar_x, 0) < 300) {
            continue;
        }

        var width = random(100, 120);
        canyons.push({
            x_pos: x_pos,
            width: width,
        });
    }

    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;
    isJumping = false;

    // Calculate the obj total height
    obj.height = obj.head.h + obj.body.h + obj.neck.h + obj.leg.h + obj.foot.h;

    cameraPosX = 0;

    sky = "rgb(100, 155, 255)"

    score = 0;

    flagpole = {
        isReached: false,
        x_pos: 1500,
        height: 500,
    }
}

function initGame() {
    lives = defaultLives;
    startGame();
    gameOver = false;
    gameCompleted = false;
}

function preload() {
    // load sounds
    Sound.init();
}

function setup() {
    // Set the canvas to be the same size as the window
    // This allows the game to be full screen
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    createCanvas(canvasWidth, canvasHeight);

    initGame()
}

function draw() {
    // Calculate the camera position based on the game character x position
    // and the half of the canvas width.
    cameraPosX = gameChar_x - canvasWidth / 2;

    // fill the sky blue
    background(sky);
    noStroke();


    //draw some green ground
    push();
    fill(0, 46, 22);
    rect(0, ground_y, canvasWidth, ground_height);
    pop();

    // Translate the next objects by the camera position
    push();
    translate(-cameraPosX, 0);

    //1. clouds in the sky
    drawClouds()

    //2. mountains on the ground
    drawMountains()

    //3. trees drawn in respect to their x position
    drawTrees()

    //4. a canyon
    canyons.forEach(canyon => {
        drawCanyon(canyon)
        checkCanyon(canyon)
    })

    //5. a collectable token - eg. a jewel, fruit, coins
    collectables.forEach((collectible) => {
        collectible.display();
    })

    // Check if character is jumping
    if (isJumping && (ground_y - gameChar_y) < obj.jumpLength) {
        gameChar_y -= 4;
    }

    // Check if character should be falling
    if ((ground_y - gameChar_y) >= obj.jumpLength || !isJumping) {
        isFalling = true;
        isJumping = false;
    }

    // Check if character has gotten to the ground
    if (gameChar_y >= ground_y && !isPlummeting) {
        isFalling = false;
        gameChar_y = ground_y;
    }

    // Check if character is falling, then move down
    if (isFalling) {
        gameChar_y += 4;
    }

    // The game character
    if (isLeft && isFalling) {
        // add your jumping-left code
        gameChar_x -= 5;
        character_draw_function = jumpLeft;
    }
    else if (isRight && isFalling) {
        // add your jumping-right code
        gameChar_x += 5;
        character_draw_function = jumpingRight;
    }
    else if (isLeft) {
        // add your walking left code
        gameChar_x -= 5;
        character_draw_function = walkingLeft;
    }
    else if (isRight) {
        // add your walking right code
        gameChar_x += 5;
        character_draw_function = walkingRight;
    }
    else if (isFalling || isPlummeting) {
        // add your jumping facing forwards code
        character_draw_function = jumpFaceForward;
    }
    else {
        // add your standing front facing code
        character_draw_function = faceFront;
    }


    if (isPlummeting) {
        gameChar_y += 5;

        // stop current movements
        isLeft = false;
        isRight = false;
    }


    // Draw the game character
    character_draw_function(gameChar_x, gameChar_y);

    // Draw flagpole
    checkReachedFlagpole()
    drawFlagPole()

    // Pop the camera translation
    pop();

    // Check if player die
    checkPlayerDie()

    // Draw the score
    drawScore()

    // Draws the lives
    drawLives()

    // Check if the game is completed
    if (gameCompleted) {
        gameComplete()
    }

    // If the game is over, draw the game over screen
    if (gameOver) {
        gameEnd()
    }
}

// Created a simple function to draw a triangle (mountains), with default values
// This can help us to draw multiple mountains with different sizes and positions
function buildTriangle({ start, width = 100, height = 250, color = "#333" }) {
    push();
    fill(color);
    triangle(start, ground_y, start + (width / 2), ground_y - height, start + width, ground_y)
    pop();
}

function keyPressed() {
    if (gameOver || gameCompleted) {
        if (keyCode == SPACE) {
            initGame()
        }
        return
    }

    if (isPlummeting) {
        // don't allow any movement while plummeting
        return
    }

    if (keyCode == LEFT) {
        isLeft = true;
    } else if (keyCode == RIGHT) {
        isRight = true;
    } else if (keyCode == SPACE) {
        if (!isFalling) {
            Sound.jump();
            isJumping = true;
        }
    }
}

function keyReleased() {
    if (keyCode == LEFT) {
        isLeft = false;
        isJumping = false;
    } else if (keyCode == RIGHT) {
        isRight = false;
        isJumping = false;
    }
}

// Draws the game character facing forward
function faceFront(gameChar_x, gameChar_y) {
    // head
    fill(obj.head.c)
    rect(gameChar_x - obj.head.w / 2, gameChar_y - obj.height, obj.head.w, obj.head.h, 2);

    fill(obj.eye.c)
    ellipse(gameChar_x, gameChar_y - obj.height + obj.eye.top, obj.eye.r)
    stroke(obj.eye.inner.c)
    point(gameChar_x, gameChar_y - obj.height + obj.eye.top + obj.eye.inner.top)
    noStroke()

    // neck
    fill(obj.neck.c)
    rect(gameChar_x - obj.neck.w / 2, gameChar_y - obj.height + obj.head.h, obj.neck.w, obj.neck.h)

    // body
    fill(obj.body.c)
    rect(gameChar_x - obj.body.w / 2, gameChar_y - obj.height + obj.head.h + obj.neck.h, obj.body.w, obj.body.h, 2)

    // arms
    fill(obj.arm.c)

    // right arm
    rect(gameChar_x - obj.arm.w - 13, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top, obj.arm.w, obj.arm.h, 5, 0, 0, 0)

    // left arm
    rect(gameChar_x + 13, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top, obj.arm.w, obj.arm.h, 0, 5, 0, 0)

    // legs
    fill(obj.leg.c)

    // right leg
    rect(gameChar_x - (obj.leg.w + 3.5), gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.body.h, obj.leg.w, obj.leg.h)

    // left leg
    rect(gameChar_x + 3.5, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.body.h, obj.leg.w, obj.leg.h)

    // foot
    fill(obj.foot.c)

    // right foot
    rect(gameChar_x - (obj.leg.w / 2) - (obj.foot.w / 2) - 3.5, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.body.h + obj.leg.h, obj.foot.w, obj.foot.h)

    // left foot
    rect(gameChar_x + 2, gameChar_y - obj.height + (obj.head.h + obj.neck.h + obj.body.h + obj.leg.h), obj.foot.w, obj.foot.h)

}

// Draws the game character jumping facing forward
function jumpFaceForward(gameChar_x, gameChar_y) {
    // head
    fill(obj.head.c)
    rect(gameChar_x - 10, gameChar_y - obj.height, obj.head.w, obj.head.h, 2);

    fill(obj.eye.c)
    ellipse(gameChar_x, gameChar_y - obj.height + obj.eye.top, obj.eye.r)
    stroke(obj.eye.inner.c)
    point(gameChar_x, gameChar_y - obj.height + obj.eye.top + obj.eye.inner.top)
    noStroke()

    // neck
    fill(obj.neck.c)
    rect(gameChar_x - obj.neck.w / 2, gameChar_y - obj.height + obj.head.h, obj.neck.w, obj.neck.h)

    // body
    fill(obj.body.c)
    rect(gameChar_x - obj.body.w / 2, gameChar_y - obj.height + obj.head.h + obj.neck.h, obj.body.w, obj.body.h, 2)

    // arms
    fill(obj.arm.c)

    // right arm
    rect(gameChar_x - 5 - 13, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top, obj.arm.w, obj.arm.h, 5, 0, 0, 0)

    // left arm
    rect(gameChar_x + 13, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top, obj.arm.w, obj.arm.h, 0, 5, 0, 0)

    // legs
    fill(obj.leg.c)

    // right leg
    rect(gameChar_x - 8.5, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.body.h, obj.leg.w, obj.leg.jumping.h)

    // left leg
    rect(gameChar_x + 3.5, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.body.h, obj.leg.w, obj.leg.jumping.h)

    // foot
    fill(obj.foot.c)

    // right foot
    rect(gameChar_x - 2.5 - 4 - 3.5, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.body.h + obj.leg.jumping.h, obj.foot.w, obj.foot.h, 2)

    // left foot
    rect(gameChar_x + 2, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.body.h + obj.leg.jumping.h, obj.foot.w, obj.foot.h, 2)

}

// Draws the game character walking left
function walkingLeft(gameChar_x, gameChar_y) {
    // eyes
    fill(obj.eye.c)
    stroke(100)
    ellipse(gameChar_x - obj.eye.d, gameChar_y - obj.height + obj.eye.top, obj.eye.r)
    noStroke()

    // head
    fill(obj.head.c)
    rect(gameChar_x - obj.head.d / 2, gameChar_y - obj.height, obj.head.d, obj.head.h);

    // neck
    fill(obj.neck.c)
    rect(gameChar_x - obj.neck.d / 2, gameChar_y - obj.height + obj.head.h, obj.neck.d, obj.neck.h)

    // Right arm
    fill(obj.arm.c)
    beginShape()
    vertex(gameChar_x + obj.arm.d * 2 + obj.arm.d, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h + obj.arm.d * 0.3)
    vertex(gameChar_x + obj.arm.d * 2 + obj.arm.d, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h - obj.arm.d)
    vertex(gameChar_x - obj.arm.d / 2 + obj.arm.d, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top)
    vertex(gameChar_x - obj.arm.d / 2, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.d)
    endShape(CLOSE)

    // body
    fill(obj.body.c)
    rect(gameChar_x - obj.body.d / 2, gameChar_y - obj.height + obj.head.h + obj.neck.h, obj.body.d, obj.body.h, 2)

    // left arm
    fill(obj.arm.c)
    beginShape()
    vertex(gameChar_x - obj.arm.d / 2, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top)
    vertex(gameChar_x - obj.arm.d / 2, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h - 10)
    vertex(gameChar_x - obj.arm.d * 2, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h - 5)
    vertex(gameChar_x - obj.arm.d * 2, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h)
    vertex(gameChar_x - obj.arm.d / 2 + obj.arm.d, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h - 8)
    vertex(gameChar_x - obj.arm.d / 2 + obj.arm.d, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top)
    vertex(gameChar_x - obj.arm.d / 2, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top)
    endShape(CLOSE)

    // left leg
    fill(obj.leg.c)
    rect(gameChar_x - obj.leg.d / 2, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.body.h, obj.leg.d, obj.leg.h)
    // left foot
    fill(obj.foot.c)
    rect(gameChar_x - obj.foot.w / 2, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.body.h + obj.leg.h, obj.foot.w, obj.foot.h, 2)
}

// Draws the game character walking right
function walkingRight(gameChar_x, gameChar_y) {
    // eyes
    fill(obj.eye.c)
    stroke(100)
    ellipse(gameChar_x + obj.eye.d, gameChar_y - obj.height + obj.eye.top, obj.eye.r)
    noStroke()

    // head
    fill(obj.head.c)
    rect(gameChar_x - obj.head.d / 2, gameChar_y - obj.height, obj.head.d, obj.head.h);

    // neck
    fill(obj.neck.c)
    rect(gameChar_x - obj.neck.d / 2, gameChar_y - obj.height + obj.head.h, obj.neck.d, obj.neck.h)

    // Right arm
    fill(obj.arm.c)
    beginShape()
    vertex(gameChar_x - obj.arm.d * 2 - obj.arm.d, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h + obj.arm.d * 0.3)
    vertex(gameChar_x - obj.arm.d * 2 - obj.arm.d, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h - obj.arm.d)
    vertex(gameChar_x - obj.arm.d / 2, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top + 3)
    vertex(gameChar_x - obj.arm.d / 2, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.d + 5)
    endShape(CLOSE)

    // body
    fill(obj.body.c)
    rect(gameChar_x - obj.body.d / 2, gameChar_y - obj.height + obj.head.h + obj.neck.h, obj.body.d, obj.body.h, 2)

    // left arm
    fill(obj.arm.c)
    beginShape()
    vertex(gameChar_x - obj.arm.d / 2, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top)
    vertex(gameChar_x - obj.arm.d / 2, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h - 8)
    vertex(gameChar_x + obj.arm.d * 2, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h)
    vertex(gameChar_x + obj.arm.d * 2, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h - 5)
    vertex(gameChar_x - obj.arm.d / 2 + obj.arm.d, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h - 10)
    vertex(gameChar_x - obj.arm.d / 2 + obj.arm.d, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top)
    vertex(gameChar_x - obj.arm.d / 2, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top)
    endShape(CLOSE)

    // left leg
    fill(obj.leg.c)
    rect(gameChar_x - obj.leg.d / 2, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.body.h, obj.leg.d, obj.leg.h)
    // left foot
    fill(obj.foot.c)
    rect(gameChar_x - obj.foot.w / 2, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.body.h + obj.leg.h, obj.foot.w, obj.foot.h, 2)
}

// Draws the game character jumping left
function jumpLeft(gameChar_x, gameChar_y) {
    // eyes
    fill(obj.eye.c)
    stroke(100)
    ellipse(gameChar_x - obj.eye.d, gameChar_y - obj.height + obj.eye.top, obj.eye.r)
    noStroke()

    // head
    fill(obj.head.c)
    rect(gameChar_x - obj.head.d / 2, gameChar_y - obj.height, obj.head.d, obj.head.h);

    // neck
    fill(obj.neck.c)
    rect(gameChar_x - obj.neck.d / 2, gameChar_y - obj.height + obj.head.h, obj.neck.d, obj.neck.h)

    // Right arm
    fill(obj.arm.c)
    beginShape()
    vertex(gameChar_x + obj.arm.d * 2 + obj.arm.d, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h + obj.arm.d * 0.3)
    vertex(gameChar_x + obj.arm.d * 2 + obj.arm.d, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h - obj.arm.d)
    vertex(gameChar_x - obj.arm.d / 2 + obj.arm.d, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top)
    vertex(gameChar_x - obj.arm.d / 2, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.d)
    endShape(CLOSE)

    // body
    fill(obj.body.c)
    rect(gameChar_x - obj.body.d / 2, gameChar_y - obj.height + obj.head.h + obj.neck.h, obj.body.d, obj.body.h, 2)

    // left arm
    fill(obj.arm.c)
    beginShape()
    vertex(gameChar_x - obj.arm.d / 2, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top)
    vertex(gameChar_x - obj.arm.d / 2, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h - 10)
    vertex(gameChar_x - obj.arm.d * 2, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h - 5)
    vertex(gameChar_x - obj.arm.d * 2, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h)
    vertex(gameChar_x - obj.arm.d / 2 + obj.arm.d, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h - 8)
    vertex(gameChar_x - obj.arm.d / 2 + obj.arm.d, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top)
    vertex(gameChar_x - obj.arm.d / 2, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top)
    endShape(CLOSE)

    // left leg
    fill(obj.leg.c)
    rect(gameChar_x - obj.leg.d / 2, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.body.h, obj.leg.d, obj.leg.jumping.h)
    // left foot
    fill(obj.foot.c)
    rect(gameChar_x - obj.foot.w / 2, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.body.h + obj.leg.jumping.h, obj.foot.w, obj.foot.h, 2)
}

// Draws the game character jumping right
function jumpingRight(gameChar_x, gameChar_y) {
    // eyes
    fill(obj.eye.c)
    stroke(100)
    ellipse(gameChar_x + obj.eye.d, gameChar_y - obj.height + obj.eye.top, obj.eye.r)
    noStroke()

    // head
    fill(obj.head.c)
    rect(gameChar_x - obj.head.d / 2, gameChar_y - obj.height, obj.head.d, obj.head.h);

    // neck
    fill(obj.neck.c)
    rect(gameChar_x - obj.neck.d / 2, gameChar_y - obj.height + obj.head.h, obj.neck.d, obj.neck.h)

    // Right arm
    fill(obj.arm.c)
    beginShape()
    vertex(gameChar_x - obj.arm.d * 2 - obj.arm.d, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h + obj.arm.d * 0.3)
    vertex(gameChar_x - obj.arm.d * 2 - obj.arm.d, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h - obj.arm.d)
    vertex(gameChar_x - obj.arm.d / 2, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top + 3)
    vertex(gameChar_x - obj.arm.d / 2, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.d + 5)
    endShape(CLOSE)

    // body
    fill(obj.body.c)
    rect(gameChar_x - obj.body.d / 2, gameChar_y - obj.height + obj.head.h + obj.neck.h, obj.body.d, obj.body.h, 2)

    // left arm
    fill(obj.arm.c)
    beginShape()
    vertex(gameChar_x - obj.arm.d / 2, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top)
    vertex(gameChar_x - obj.arm.d / 2, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h - 8)
    vertex(gameChar_x + obj.arm.d * 2, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h)
    vertex(gameChar_x + obj.arm.d * 2, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h - 5)
    vertex(gameChar_x - obj.arm.d / 2 + obj.arm.d, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h - 10)
    vertex(gameChar_x - obj.arm.d / 2 + obj.arm.d, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top)
    vertex(gameChar_x - obj.arm.d / 2, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.arm.top)
    endShape(CLOSE)

    // left leg
    fill(obj.leg.c)
    rect(gameChar_x - obj.leg.d / 2, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.body.h, obj.leg.d, obj.leg.jumping.h)
    // left foot
    fill(obj.foot.c)
    rect(gameChar_x - obj.foot.w / 2, gameChar_y - obj.height + obj.head.h + obj.neck.h + obj.body.h + obj.leg.jumping.h, obj.foot.w, obj.foot.h, 2)
}

function drawClouds() {
    for (var i = 0; i < clouds.length; i++) {
        var cloud = clouds[i];
        push();
        fill(255);
        ellipse(cloud.x, cloud.y, 80, 70);
        ellipse(cloud.x + 100, cloud.y, 70, 80);
        ellipse(cloud.x + 50, cloud.y, 90, 100);
        pop();
    }

}

function drawMountains() {
    for (var i = 0; i < mountains.length; i++) {
        var mountain = mountains[i];
        buildTriangle(mountain)
    }
}

function drawTrees() {
    for (var i = 0; i < trees_x.length; i++) {
        var treePos_x = trees_x[i];
        var tree_height = trees_height[i];
        var colorObj = trees_color[i];
        push();
        fill(colorObj.trunk);
        rect(treePos_x, ground_y - tree_height, 30, tree_height)

        fill(colorObj.head)
        ellipse(treePos_x + 15, ground_y - tree_height - 50, 210, 150)

        stroke(colorObj.fruit);
        strokeWeight(15)
        point(treePos_x + 15, ground_y - tree_height - 50)
        point(treePos_x, ground_y - tree_height - 15)
        point(treePos_x - 40, ground_y - tree_height - 60)
        point(treePos_x + 70, ground_y - tree_height - 60)
        pop()
    }
}

function drawCollectable(t_collectable) {
    push();
    fill(`rgb(${round(random(0, 255))}, ${round(random(0, 100))}, ${round(random(0, 200))})`);
    stroke("black")
    strokeWeight(2)
    rect(t_collectable.x_pos - (t_collectable.size / 2), (ground_y - t_collectable.y_pos) - (t_collectable.size / 2), t_collectable.size)
    pop();
}

function checkCollectable(t_collectable) {
    if (abs(ground_y - gameChar_y) > t_collectable.y_pos) {
        return
    }

    if (abs(t_collectable.y_pos - abs(ground_y - gameChar_y)) <= obj.height) {
        var total_x_dist = obj.body.w
        if (isLeft || isRight) {
            total_x_dist = obj.body.d
        }
        if (abs(gameChar_x - t_collectable.x_pos) <= total_x_dist) {
            t_collectable.found = true;
            score++;
            Sound.collect()
        }
    }
}

function drawCanyon(t_canyon) {
    push();
    fill(sky)
    rect(t_canyon.x_pos, ground_y, t_canyon.width, ground_height)
    pop()
}


function checkCanyon(t_canyon) {
    var completed = isPlummeting;
    if ((gameChar_y >= ground_y) && ((t_canyon.x_pos < gameChar_x) && (gameChar_x < (t_canyon.x_pos + t_canyon.width)))) {
        isPlummeting = true;
    }
    if (!completed && isPlummeting) {
        Sound.falling()
    }
}

function drawFlagPole() {
    push();
    stroke("black")
    strokeWeight(3)
    line(flagpole.x_pos, ground_y, flagpole.x_pos, ground_y - flagpole.height)
    pop()

    push();
    fill('red')
    if (flagpole.isReached) {
        rect(flagpole.x_pos, ground_y - flagpole.height, 70, 50)
    } else {
        rect(flagpole.x_pos, ground_y - 50, 70, 50)
    }
    pop()
}

function checkReachedFlagpole() {
    var completed = gameCompleted
    var d = abs(gameChar_x - flagpole.x_pos)
    if (d < 15) {
        flagpole.isReached = true;
        gameCompleted = true;
    }
    if (!completed && gameCompleted) {
        Sound.gameComplete()
    }
}

function drawScore() {
    push()
    textSize(16);
    fill("black")
    text(`Score: ${score}`, 20, 30);
    pop()
}

function drawLives() {
    push()
    let x = 30   // x position
    let y = 60;  // y position
    let r = 20;  // radius
    for (let i = 0; i < lives; i++) {
        fill("red")
        ellipse(x, y, r, r)
        x += 40
    }

    for (let i = 0; i < (defaultLives - lives); i++) {
        fill(sky)
        stroke("black")
        ellipse(x, y, r, r)
        x += 40
    }

    pop()
}

function checkPlayerDie() {
    push()
    var ended = gameOver
    if (isPlummeting && (gameChar_y > height + obj.height)) {
        if (lives > 0) {
            lives--;
        }

        if (lives > 0) {
            startGame();
        }

        if (lives == 0) {
            gameOver = true
            if (!ended && gameOver) Sound.gameOver()
        }
    }
    pop()
}

function gameEnd() {
    push()
    stroke(255, 255, 255);
    strokeWeight(5)
    textFont('Poppins');
    textSize(70)
    fill("red")
    text("Game over.\nPress space to continue.", width / 2 - 400, height / 4)
    pop()
}

function gameComplete() {
    push()
    stroke(7, 5, 105);
    strokeWeight(5)
    textFont('Poppins');
    textSize(70)
    fill(158, 52, 235)
    text("Level complete.\nPress space to\ncontinue.", width / 4 - 400, height / 5)
    pop()
}