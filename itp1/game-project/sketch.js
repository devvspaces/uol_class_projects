/*

Game project Final

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

// Character object
// Character features can be easily customized from here e.g
// Height, size, color, jump length (how high it can jump)
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

var canyons;


// Idea is there can be any type of collectable, circle, triangle or more
var collectibleTypes = {
    "circle": {
        draw: function (collectible) {
            push();
            fill(`rgb(${Math.round(random(0, 255))}, ${Math.round(random(0, 100))}, ${Math.round(random(0, 200))})`);
            stroke("black")
            strokeWeight(2)
            ellipse(collectible.x_pos, ground_y - collectible.y_pos, collectible.size)
            pop();
        }
    },
    "rectangle": {
        draw: function (collectible) {
            push();
            fill(`rgb(${Math.round(random(0, 255))}, ${Math.round(random(0, 100))}, ${Math.round(random(0, 200))})`);
            stroke("black")
            strokeWeight(2)
            rect(collectible.x_pos - (collectible.size / 2), (ground_y - collectible.y_pos) - (collectible.size / 2), collectible.size)
            pop();
        }
    }
}

function Collectable(x, y, size, found, collectibleType) {
    this.x_pos = x;
    this.y_pos = y;
    this.size = size;
    this.found = found;

    // Get selected collectible type
    this.collectibleType = collectibleTypes[collectibleType]

    // Use the collectible type selected to draw this collectible
    // this is passed because it's the current object
    this.draw = function () {
        this.collectibleType.draw(this)
    }

    // If a collectible is in range with character, updates scores
    this.checkCollectable = function () {
        if (this.inRange()) {
            this.found = true;
            score++;
            Sound.collect()
        }
    }

    // Checks if a collectible is in range with a character
    this.inRange = function () {

        // These are all points to check for an object
        // As collectibles can be placed in different positions, it's important to check
        // with high accuracy if any point of the character has touched the collectible
        // NOTE: the more the points the more accurate
        var points_to_check = [
            [gameChar_x, gameChar_y],
            [gameChar_x - obj.foot.w, gameChar_y],  // left foot
            [gameChar_x + obj.foot.w, gameChar_y],  // right foot
            [gameChar_x - obj.body.w / 2, gameChar_y - obj.foot.h - obj.leg.h],  // lower-left body
            [gameChar_x + obj.body.w / 2, gameChar_y - obj.foot.h - obj.leg.h],  // lower-right body
            [gameChar_x - obj.body.w / 2, gameChar_y - obj.foot.h - obj.leg.h - obj.body.h],  // upper-left body
            [gameChar_x + obj.body.w / 2, gameChar_y - obj.foot.h - obj.leg.h - obj.body.h],  // upper-right body
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

        for (let i = 0; i < points_to_check.length; i++) {
            var points = points_to_check[i];
            var x = points[0];
            var y = points[1];
            if (dist(x, y, this.x_pos, ground_y - this.y_pos) <= this.size / 2) {
                return true;
            }
        }
    }

    // Draws the collectibles
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


var platforms = []
var jumpedFromY;
var clouds;
var mountains;
var trees_x;
var trees_height;
var trees_color;
var cameraPosX;
var sky;
var enemies;

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

// Lives of character
var lives;
const defaultLives = 3;  // Defautls to 3

var gameOver;
var gameCompleted;

const STARTING_POINT = 0;
const ENDING_POINT = 3000;


const TREE_HEIGHT_MIN = 100;
const TREE_HEIGHT_MAX = 200;

const MOUNTAIN_COLORS = [
    "#852604",
    "#05574f",
    "#053a57",
    "#822e04",
]

// Sound builder for playing sounds
class SoundBuilder {
    jumpSound;
    collectSound;
    completeSound;
    endSound;
    deathSound;

    constructor() {
        this.jumpSound = null;
    }

    // Loads all required game sounds
    init() {
        soundFormats('mp3', 'wav');
        this.jumpSound = loadSound("assets/sounds/jump.wav");
        this.collectSound = loadSound("assets/sounds/mixkit-player-jumping-in-a-video-game-2043.wav");
        this.completeSound = loadSound("assets/sounds/mixkit-completion-of-a-level-2063.wav");
        this.endSound = loadSound("assets/sounds/mixkit-arcade-space-shooter-dead-notification-272.wav");
        this.deathSound = loadSound("assets/sounds/mixkit-creature-cry-of-hurt-2208.wav");
    };

    // When player jumps
    jump() {
        this.jumpSound.play();
        this.jumpSound.setVolume(0.1);
    };

    // When collectible is collected
    collect() {
        this.collectSound.play();
        this.collectSound.setVolume(0.1);
    };

    // When game is completed
    gameComplete() {
        this.completeSound.play();
        this.completeSound.setVolume(0.1);
    };

    // When game is over
    gameOver() {
        this.endSound.play();
        this.endSound.setVolume(0.1);
    };

    // When player plummets
    falling() {
        this.deathSound.play();
        this.deathSound.setVolume(0.1);
    }
}

let Sound;

function startGame() {
    // Init ground x an y
    ground_y = canvasHeight * 3 / 4;
    ground_height = canvasHeight - ground_y

    gameChar_x = 0;
    gameChar_y = ground_y;
    jumpedFromY = ground_y;

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

    // Randomly create collectables, makes sure they are well separated
    for (let i = STARTING_POINT; i < ENDING_POINT; i += 200) {
        var data = {
            x_pos: random(i - 100, i + 100),
            y_pos: random(30, 120),
            size: random(10, 30),
            found: false
        }

        // Generate collectibles of random types
        // Can add more types to collectibleTypes with their draw function
        const collectibleType = random(Object.keys(collectibleTypes));
        var collectable = new Collectable(data.x_pos, data.y_pos, data.size, data.found, collectibleType);

        // Continue if collectable is too close to gameChar_x
        if (collectable.inRange()) {
            continue;
        }
        collectables.push(collectable);
    }

    // Create random clouds
    clouds = []

    // Randomly create clouds, makes sure they are well separated
    for (let i = STARTING_POINT; i < ENDING_POINT; i += 400) {
        clouds.push({
            x: random(i - 100, i + 100),
            y: random(70, 250),
        });
    }

    // Create random mountains
    mountains = []

    // Randomly create mountains, makes sure they are well separated
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

    // Randomly create canyons
    // Makes sure they are spread apart
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

    // Create platforms
    platforms = [];

    // Create random platforms
    // Possible y values are 100 and 200 from the ground
    // x values range from the start to the end of the game
    // Makes sure they are spread apart
    for (let i = STARTING_POINT; i < ENDING_POINT; i += 400) {
        var platform_x = random(i, i + 250)
        var platform_y = random([100, 200])
        var length = random(70, 200)

        platforms.push(createPlatform(platform_x, ground_y - platform_y, length))
    }

    // Enemies
    enemies = []

    // Randomly create enemies
    for (let i = STARTING_POINT; i < ENDING_POINT; i += 700) {
        var platform_x = random(i, i + 250)
        var length = random(70, 120)

        enemies.push(new Enemy(platform_x, ground_y - 10, length))
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
        x_pos: 3000,
        height: 500,
    }
}

function initGame() {
    lives = defaultLives;

    // Start new game
    startGame();

    // Init game status
    gameOver = false;
    gameCompleted = false;
}

function preload() {
    // Load sounds
    Sound = new SoundBuilder();

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
    if (isJumping && ((jumpedFromY - gameChar_y) < obj.jumpLength)) {
        gameChar_y -= 4
    }

    // Check if character should be falling
    if ((jumpedFromY - gameChar_y) >= obj.jumpLength) {
        isFalling = true;
        isJumping = false;
    }

    // Check if character has gotten to the ground
    if (gameChar_y >= ground_y && !isPlummeting) {
        isFalling = false;
        gameChar_y = ground_y;
        jumpedFromY = ground_y;
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


    // Check if character is falling, then move down
    if (isFalling) {
        // Check if landed on platform
        let landed = false;

        platforms.forEach(platform => {
            if (platform.checkContact(gameChar_x, gameChar_y)) {
                landed = true;
                character_draw_function = faceFront;
                jumpedFromY = platform.y;
                isFalling = false;
                return;
            }
        })

        if (!landed) {
            gameChar_y += 4;
        }
    }


    if (isPlummeting) {
        gameChar_y += 5;

        // stop current movements
        isLeft = false;
        isRight = false;
    }

    // Draw the platform
    platforms.forEach(platform => {
        platform.draw()
    })

    // Draw the game character
    character_draw_function(gameChar_x, gameChar_y);

    // Draw flagpole
    checkReachedFlagpole()
    drawFlagPole()

    for (var enemyIndex = 0; enemyIndex < enemies.length; enemyIndex++) {
        var enemy = enemies[enemyIndex];
        enemy.draw()
        if (enemy.checkContact(gameChar_x, gameChar_y)) {
            killLive(gameOver)
        }

    }

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

/**
 * Created a simple function to draw a triangle (mountains), with default values
 * This can help us to draw multiple mountains with different sizes and positions
 */
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
        if (!isJumping && !isFalling) {
            Sound.jump();
            isJumping = true;
        }
    }
}

function keyReleased() {
    if (keyCode == LEFT) {
        isLeft = false;
        isJumping = false;
        isFalling = true;
    } else if (keyCode == RIGHT) {
        isRight = false;
        isJumping = false;
        isFalling = true;
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

function drawCanyon(t_canyon) {
    push();
    fill(sky)
    rect(t_canyon.x_pos, ground_y, t_canyon.width, ground_height)
    pop()
}

// Check if a user has fallen into a canyon
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

// Check if a user has reached the flagpole
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


// Draws the lives at the top
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


// Kills a character by reducing
// life and restarting game
function killLive(ended) {
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

function checkPlayerDie() {
    push()
    if (isPlummeting && (gameChar_y > height + obj.height)) {
        killLive(gameOver)
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

function createPlatform(x, y, length) {
    var p = {
        x: x,
        y: y,
        length: length,
        draw: function () {
            push();
            stroke('black')
            fill("#002E16");
            rect(this.x, this.y, this.length, 20);
            pop();
        },
        checkContact: function (gc_x, gc_y) {
            if (gc_x > this.x && gc_x < this.x + this.length) {
                var d = abs(this.y - gc_y);
                if (d >= 0 && d < 4) {
                    return true;
                }
                return false;
            }
        }
    }
    return p;
}

function Enemy(x, y, range) {
    this.x = x;
    this.y = y;
    this.range = range;

    this.currentX = x;
    this.inc = 1;

    this.update = function () {
        this.currentX += this.inc
        if (this.currentX >= this.x + this.range) {
            this.inc = -1
        } else if (this.currentX <= this.x) {
            this.inc = 1
        }
    }

    this.draw = function () {
        this.update()
        fill(255, 0, 0)
        ellipse(this.currentX, this.y, 20)
    }

    this.checkContact = function (gc_x, gc_y) {
        var distance = dist(gc_x, gc_y, this.currentX, this.y)
        if (distance < 11) {
            return true
        }
        return false;
    }
}