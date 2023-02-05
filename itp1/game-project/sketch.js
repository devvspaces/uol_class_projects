/*

Game project 5: Multiple Interactables

*/

var canvasWidth;
var canvasHeight;
var gameChar_x;
var gameChar_y;
var ground_y;
var ground_height;
var treePos_x;
var treePos_y;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var obj = {
    head: {
        c: "#020e21", // color
        w: 20, // width
        h: 18, // height
        d: 10, // depth
    },
    neck: {
        c: "#333",
        w: 10,
        h: 2,
        d: 5,
    },
    body: {
        c: "#05aa53",
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
        c: "red",
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
    height: 0
};

var canyons = [
    {
        x_pos: 0,
        width: 0,
    }
]

var collectables = [{
    x_pos: 0,
    y_pos: 0,
    size: 0,
    found: false
}]

var clouds;
var mountains;
var trees_x;
var tree_height;
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

function startGame() {
    ground_y = canvasHeight * 3 / 4;
    ground_height = canvasHeight - ground_y

    gameChar_x = 0;
    gameChar_y = ground_y;

    trees_x = [-250, -600, -950, -1350, -1700, 250, 600, 950, 1350, 1700];
    tree_height = 100;

    canyons = [
        {
            x_pos: -400,
            width: 100,
        },
        {
            x_pos: 1200,
            width: 100,
        },
        {
            x_pos: 1600,
            width: 70,
        }
    ]

    collectables = [
        {
            x_pos: 450,
            y_pos: 50,
            size: 20,
            found: false
        },
        {
            x_pos: 350,
            y_pos: 20,
            size: 10,
            found: false
        },
        {
            x_pos: 550,
            y_pos: 70,
            size: 20,
            found: false
        },
        {
            x_pos: 50,
            y_pos: 20,
            size: 20,
            found: false
        },
        {
            x_pos: 850,
            y_pos: 90,
            size: 15,
            found: false
        }
    ]

    clouds = [
        {
            x: -400,
            y: 100,
        },
        {
            x: -800,
            y: 150,
        },
        {
            x: -1200,
            y: 100,
        },
        {
            x: -1600,
            y: 170,
        },
        {
            x: -2000,
            y: 100,
        },
        {
            x: 400,
            y: 100,
        },
        {
            x: 800,
            y: 150,
        },
        {
            x: 1200,
            y: 100,
        },
        {
            x: 1600,
            y: 170,
        },
        {
            x: 2000,
            y: 100,
        },
    ]

    mountains = [
        {
            start: -1000,
            width: 300,
            height: 300,
        },
        {
            start: -1400,
            width: 200,
            height: 200,
        },
        {
            start: -1800,
            width: 250,
            height: 350,
            color: "#072B55"
        },
        {
            start: -500,
            width: 300,
            height: 300,
            color: "#2A0452"
        },
        {
            start: 300,  // x position for the bottom left corner of the mountain
            width: 150,  // length of the base of the mountain
            height: 150,  // height of the mountain
            color: "#072B55"  // color of the mountain
        },
        {
            start: 1000,
            width: 300,
            height: 300,
        },
        {
            start: 1400,
            width: 200,
            height: 200,
        },
        {
            start: 1800,
            width: 250,
            height: 350,
            color: "#072B55"
        },
    ]

    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;

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

    if (lives < 1) {
        push()
        strokeWeight(10)
        textSize(50)
        fill("red")
        text("Game over. Press space to continue.", width / 2 - 150, height / 2)
        gameOver = true
        pop()
        return
    }

    if (flagpole.isReached){
        gameComplete()
        return
    }

    // Calculate the camera position based on the game character x position
    // and the half of the canvas width.
    cameraPosX = gameChar_x - canvasWidth / 2;

    // fill the sky blue
    background(sky);
    noStroke();


    //draw some green ground
    push();
    fill(0, 155, 0);
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
        if (!collectible.found) {
            drawCollectable(collectible)
            checkCollectable(collectible)
        }
    })

    if (gameChar_y < ground_y) {
        isFalling = true;
        gameChar_y += 3;
    } else {
        isFalling = false;
    }

    // Draw flagpole
    drawFlagPole()
    checkReachedFlagpole()

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
        gameChar_y += 2;

        // stop current movements
        isLeft = false;
        isRight = false;
    }

    // Draw the game character
    character_draw_function(gameChar_x, gameChar_y);

    // Pop the camera translation
    pop();
    
    // Check if player die
    checkPlayerDie()

    // Draw the score
    drawScore()

    // Draws the lives
    drawLives()
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
            gameChar_y -= 100;
        }
    }

    if (gameOver) {
        if (keyCode == 32) {
            initGame()
        }
    }
}

function keyReleased() {
    if (keyCode == LEFT) {
        isLeft = false;
    } else if (keyCode == RIGHT) {
        isRight = false;
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
        push();
        fill("#454")
        rect(treePos_x, ground_y - tree_height, 30, tree_height)

        fill("green")
        ellipse(treePos_x + 15, ground_y - tree_height - 50, 210, 150)

        stroke("red");
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
    fill("brown");
    stroke("black")
    strokeWeight(3)
    rect(t_collectable.x_pos - (t_collectable.size / 2), (ground_y - t_collectable.y_pos) - (t_collectable.size / 2), t_collectable.size)
    pop();
}

function checkCollectable(t_collectable){
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
        }
    }
}

function drawCanyon(t_canyon){
    push();
    fill(sky)
    rect(t_canyon.x_pos, ground_y, t_canyon.width, ground_height)
    pop()
}

function checkCanyon(t_canyon){
    if ((gameChar_y >= ground_y) && ((t_canyon.x_pos < gameChar_x) && (gameChar_x < (t_canyon.x_pos + t_canyon.width)))) {
        isPlummeting = true;
    }
}

function drawFlagPole(){
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

function checkReachedFlagpole(){
    var d = abs(gameChar_x - flagpole.x_pos)
    if (d < 15) {
        flagpole.isReached = true;
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
    if (isPlummeting && (gameChar_y > height + obj.height)) {
        if (lives > 0) {
            lives--;
        }

        if (lives > 0) {
            startGame();
        }
    }
    pop()
}

function gameComplete(){
    push()
    strokeWeight(10)
    textSize(50)
    fill("green")
    text("Level complete. Press space to continue.", width / 2 - 150, height / 2)
    pop()
}