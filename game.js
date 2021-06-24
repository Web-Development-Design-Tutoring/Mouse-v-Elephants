//ORIGINAL TUTORIAL FOLLOWED: https://levelup.gitconnected.com/creating-a-simple-2d-game-with-html5-javascript-889aa06035ef
const context = document.querySelector("canvas").getContext("2d"); context.canvas.width = 1280; context.canvas.height = 960;
const player = { /*SIZE OF MOUSE*/ height: 52, width: 76, /*STARTING POSITION*/ x: 616, y: 454, /*STARTING SPEED*/ xVelocity: 0, yVelocity: 0 };
const projectile = { /*SIZE OF CHEESE*/ height: 52, width: 48, /*STARTING POSITION*/ x: -100, y: -100, /*STARTING SPEED*/ xVelocity: 0, yVelocity: 0 };

const smallEle = new Array();
    smallEle[0] = { /*SIZE OF ELEPHANT*/ height: 86, width: 120, /*STARTING POSITION*/ x: 3000, y: 3000, /*STARTING SPEED*/ xVelocity: 0, yVelocity: 0, spawned: false };
    smallEle[1] = { /*SIZE OF ELEPHANT*/ height: 86, width: 120, /*STARTING POSITION*/ x: 3000, y: 3000, /*STARTING SPEED*/ xVelocity: 0, yVelocity: 0, spawned: false };
    smallEle[2] = { /*SIZE OF ELEPHANT*/ height: 86, width: 120, /*STARTING POSITION*/ x: 3000, y: 3000, /*STARTING SPEED*/ xVelocity: 0, yVelocity: 0, spawned: false };
    smallEle[3] = { /*SIZE OF ELEPHANT*/ height: 86, width: 120, /*STARTING POSITION*/ x: 3000, y: 3000, /*STARTING SPEED*/ xVelocity: 0, yVelocity: 0, spawned: false };
    smallEle[4] = { /*SIZE OF ELEPHANT*/ height: 86, width: 120, /*STARTING POSITION*/ x: 3000, y: 3000, /*STARTING SPEED*/ xVelocity: 0, yVelocity: 0, spawned: false };

const bigElephant = { /*SIZE OF ELEPHANT*/ height: 150, width: 270, /*STARTING POSITION*/ x: 3000, y: 3000, /*STARTING SPEED*/ xVelocity: 0, yVelocity: 0, spawned: false };

const background = new Image(); background.src = 'images/Background22.png'; //BACKGROUND PICTURE

var frameCount = 1; const nextFrame = () => { frameCount++; } //increases the frame count (will probably use for levels/difficulty increase)
var frameIndex = 0;
var realIndex = 0;
var eleDefeated = 0;
var bigDefeated = 0;

//Whole bunch of sprites (Image constructors) in ARRAYS (one for each cardinal direction walk cycle)
var upWalkCycle = new Array();
    upWalkCycle[0] = new Image(); upWalkCycle[0].src = 'images/upWalkCycle0.png';
    upWalkCycle[1] = new Image(); upWalkCycle[1].src = 'images/upWalkCycle1.png';
    upWalkCycle[2] = new Image(); upWalkCycle[2].src = 'images/upWalkCycle2.png';
    upWalkCycle[3] = new Image(); upWalkCycle[3].src = 'images/upWalkCycle3.png';

var downWalkCycle = new Array();
    downWalkCycle[0] = new Image(); downWalkCycle[0].src = 'images/downWalkCycle0.png';
    downWalkCycle[1] = new Image(); downWalkCycle[1].src = 'images/downWalkCycle1.png';
    downWalkCycle[2] = new Image(); downWalkCycle[2].src = 'images/downWalkCycle2.png';
    downWalkCycle[3] = new Image(); downWalkCycle[3].src = 'images/downWalkCycle3.png';

var leftWalkCycle = new Array();
    leftWalkCycle[0] = new Image(); leftWalkCycle[0].src = 'images/leftWalkCycle0.png';
    leftWalkCycle[1] = new Image(); leftWalkCycle[1].src = 'images/leftWalkCycle1.png';
    leftWalkCycle[2] = new Image(); leftWalkCycle[2].src = 'images/leftWalkCycle2.png';
    leftWalkCycle[3] = new Image(); leftWalkCycle[3].src = 'images/leftWalkCycle3.png';

var rightWalkCycle = new Array();
    rightWalkCycle[0] = new Image(); rightWalkCycle[0].src = 'images/rightWalkCycle0.png';
    rightWalkCycle[1] = new Image(); rightWalkCycle[1].src = 'images/rightWalkCycle1.png';
    rightWalkCycle[2] = new Image(); rightWalkCycle[2].src = 'images/rightWalkCycle2.png';
    rightWalkCycle[3] = new Image(); rightWalkCycle[3].src = 'images/rightWalkCycle3.png';

//Non Mouse Sprites
var cheese = new Image(); cheese.src = 'images/cheese.png';

var eleSmall = new Image(); eleSmall.src = "images/elephant1.png";
var redSmall = new Image(); redSmall.src = "images/elephant1.png";
var blueSmall = new Image(); blueSmall.src = "images/elephant1.png";
var greenSmall = new Image(); greenSmall.src = "images/elephant1.png";
var goldSmall = new Image(); goldSmall.src = "images/elephant1.png";

var bigEle = new Image(); bigEle.src = "images/bebe.png";

var eleCount = 0;
var whichEle = 0;

const controller = {
    left: false, right: false, up: false, down: false, isFiring: false, 
    keyListener: function (event) { //This is the link for keycodes to change controls http://gcctech.org/csc/javascript/javascript_keycodes.htm
        var key_state = (event.type == "keydown") ? true : false;
        switch (event.keyCode) {
            case 65: controller.left  = key_state; break; //A
            case 87: controller.up    = key_state; break; //W
            case 68: controller.right = key_state; break; //D
            case 83: controller.down  = key_state; break; //S

            case 37: controller.left  = key_state; break; //Left Arrow
            case 38: controller.up    = key_state; break; //Up Arrow
            case 39: controller.right = key_state; break; //Right Arrow
            case 40: controller.down  = key_state; break; //Down Arrow

            case 32: controller.isFiring = key_state; break; //Spacebar
        }
    }
};

var x = [-1280, 640, 2560];
var y = [-720, 1440];

const loop = function () {//GAMEPLAY LOGIC LOOP; Happens once per frame (60ish times a second)
    var mouseNow = new Image(); mouseNow.src = 'images/downWalkCycle0.png'; //Represents current mouse sprite
    var direction = 2; //Value coresponds to direction on a number pad

    //Walking in all eight directions
    if (controller.up && controller.right) { player.xVelocity += 0.75; player.yVelocity -= 0.75; direction = 9; } 
        else if (controller.up && controller.left) { player.yVelocity -= 0.75; player.xVelocity -= 0.75; direction = 7; } 
        else if (controller.up && !controller.right && !controller.left) { player.yVelocity -= 1.1; direction = 8; }
    
    if (controller.down && controller.right) { player.yVelocity += 0.75; player.xVelocity += 0.75; direction = 3; } 
        else if (controller.down && controller.left) { player.yVelocity += 0.75; player.xVelocity -= 0.75; direction = 1; } 
        else if (controller.down && !controller.right && !controller.left) { player.yVelocity += 1.1; direction = 2; }
    
    if (controller.left && !controller.up && !controller.down) { player.xVelocity -= 1.1; direction = 4; }
    if (controller.right && !controller.up && !controller.down) { player.xVelocity += 1.1; direction = 6; }

    //Firing in all eight directions
    if (controller.isFiring && direction == 1) { projectile.x = player.x; projectile.y = player.y; projectile.yVelocity = 50; projectile.xVelocity = -50; } 
        else if (controller.isFiring && direction == 2) { projectile.x = player.x; projectile.y = player.y; projectile.yVelocity = 100; projectile.xVelocity = 0; } 
        else if (controller.isFiring && direction == 3) { projectile.x = player.x; projectile.y = player.y; projectile.yVelocity = 50;  projectile.xVelocity = 50; } 
        else if (controller.isFiring && direction == 4) { projectile.x = player.x; projectile.y = player.y; projectile.yVelocity = 0;   projectile.xVelocity = -100; } 
        else if (controller.isFiring && direction == 6) { projectile.x = player.x; projectile.y = player.y; projectile.yVelocity = 0;   projectile.xVelocity = 100; } 
        else if (controller.isFiring && direction == 7) { projectile.x = player.x; projectile.y = player.y; projectile.yVelocity = -50; projectile.xVelocity = -50; } 
        else if (controller.isFiring && direction == 8) { projectile.x = player.x; projectile.y = player.y; projectile.xVelocity = 0;   projectile.yVelocity = -100; } 
        else if (controller.isFiring && direction == 9) { projectile.x = player.x; projectile.y = player.y; projectile.xVelocity = 50;  projectile.yVelocity = -50; } 
    
    //Animation
    if (frameIndex <= 3.9) { frameIndex += 0.1; realIndex = (Math.floor(frameIndex)); } 
        else { frameIndex = 0; realIndex = 0; }
    
    if (direction == 1 || direction == 2 || direction == 3) { mouseNow.src = downWalkCycle[realIndex].src; } 
        else if (direction == 4) { mouseNow.src = leftWalkCycle[realIndex].src; } 
        else if (direction == 6) { mouseNow.src = rightWalkCycle[realIndex].src; } 
        else if (direction == 7 || direction == 8 || direction == 9) { mouseNow.src = upWalkCycle[realIndex].src; }
    
    //Elephant Spawning 
    eleCount += 1;
    if (eleCount == 120) {
        if (smallEle[whichEle].spawned == false) {
            smallEle[whichEle].x = x[Math.floor(Math.random() * x.length)];
            if (smallEle[whichEle].x == -1280 || smallEle[whichEle].x == 2560) { smallEle[whichEle].y = 360; }
            if (smallEle[whichEle].x == 640) { smallEle[whichEle].y = y[Math.floor(Math.random() * y.length)]; }
            smallEle[whichEle].spawned = true;
            whichEle += 1;
            if (whichEle == 4) { whichEle = 0; }
        }
        eleCount = 0;
    }

    //Elephants moving
        if (smallEle[0].x < player.x) { smallEle[0].xVelocity += 1; }
        if (smallEle[0].x > player.x) { smallEle[0].xVelocity -= 1; }
        if (smallEle[0].x == player.x) { smallEle[0].xVelocity = 0; }

        if (smallEle[0].y < player.y) { smallEle[0].yVelocity += 1; }
        if (smallEle[0].y > player.y) { smallEle[0].yVelocity -= 1; }
        if (smallEle[0].y == player.y) { smallEle[0].yVelocity = 0; }

        if (smallEle[1].x < player.x) { smallEle[1].xVelocity += 1; }
        if (smallEle[1].x > player.x) { smallEle[1].xVelocity -= 1; }
        if (smallEle[1].x == player.x) { smallEle[1].xVelocity = 0; }

        if (smallEle[1].y < player.y) { smallEle[1].yVelocity += 1; }
        if (smallEle[1].y > player.y) { smallEle[1].yVelocity -= 1; }
        if (smallEle[1].y == player.y) { smallEle[1].yVelocity = 0; }
        
        if (smallEle[2].x < player.x) { smallEle[2].xVelocity += 1; }
        if (smallEle[2].x > player.x) { smallEle[2].xVelocity -= 1; }
        if (smallEle[2].x == player.x) { smallEle[2].xVelocity = 0; }

        if (smallEle[2].y < player.y) { smallEle[2].yVelocity += 1; }
        if (smallEle[2].y > player.y) { smallEle[2].yVelocity -= 1; }
        if (smallEle[2].y == player.y) { smallEle[2].yVelocity = 0; }

        if (smallEle[3].x < player.x) { smallEle[3].xVelocity += 1; }
        if (smallEle[3].x > player.x) { smallEle[3].xVelocity -= 1; }
        if (smallEle[3].x == player.x) { smallEle[3].xVelocity = 0; }

        if (smallEle[3].y < player.y) { smallEle[3].yVelocity += 1; }
        if (smallEle[3].y > player.y) { smallEle[3].yVelocity -= 1; }
        if (smallEle[3].y == player.y) { smallEle[3].yVelocity = 0; }

        if (smallEle[4].x < player.x) { smallEle[4].xVelocity += 1; }
        if (smallEle[4].x > player.x) { smallEle[4].xVelocity -= 1; }
        if (smallEle[4].x == player.x) { smallEle[4].xVelocity = 0; }

        if (smallEle[4].y < player.y) { smallEle[4].yVelocity += 1; }
        if (smallEle[4].y > player.y) { smallEle[4].yVelocity -= 1; }
        if (smallEle[4].y == player.y) { smallEle[4].yVelocity = 0; }

        //Elephant Collision
        if (smallEle[0].x <= (projectile.x + 100) && smallEle[0].x >= (projectile.x - 50) && smallEle[0].y <= (projectile.y + 100) && smallEle[0].y >= (projectile.y - 50)) {
            smallEle[0].x = 3000; smallEle[0].y = 3000;
            smallEle[0].spawned = false;
            eleDefeated += 1;
        }
        if (smallEle[1].x <= (projectile.x + 100) && smallEle[1].x >= (projectile.x - 50) && smallEle[1].y <= (projectile.y + 100) && smallEle[1].y >= (projectile.y - 50)) {
            smallEle[1].x = 3000; smallEle[0].y = 3000;
            smallEle[1].spawned = false;
            eleDefeated += 1;
        }
        if (smallEle[2].x <= (projectile.x + 100) && smallEle[2].x >= (projectile.x - 50) && smallEle[2].y <= (projectile.y + 100) && smallEle[2].y >= (projectile.y - 50)) {
            smallEle[2].x = 3000; smallEle[2].y = 3000;
            smallEle[2].spawned = false;
            eleDefeated += 1;
        }
        if (smallEle[3].x <= (projectile.x + 100) && smallEle[3].x >= (projectile.x - 50) && smallEle[3].y <= (projectile.y + 100) && smallEle[3].y >= (projectile.y - 50)) {
            smallEle[3].x = 3000; smallEle[0].y = 3000;
            smallEle[3].spawned = false;
            eleDefeated += 1;
        }
        if (smallEle[4].x <= (projectile.x + 100) && smallEle[4].x >= (projectile.x - 50) && smallEle[4].y <= (projectile.y + 100) && smallEle[4].y >= (projectile.y - 50)) {
            smallEle[4].x = 3000; smallEle[0].y = 3000;
            smallEle[4].spawned = false;
            eleDefeated += 1;
        }

        if ((eleDefeated == 3 || eleDefeated == 6 || eleDefeated == 9) && bigElephant.spawned == false) {
            bigElephant.x = 640;
            bigElephant.y = -720;
            bigElephant.spawned = true;
        }

        if (bigElephant.x <= (projectile.x + 100) && bigElephant.x >= (projectile.x - 50) && bigElephant.y <= (projectile.y + 100) && bigElephant.y >= (projectile.y - 50)) {
            bigElephant.x = 3000; bigElephant.y = 3000;
            bigElephant.spawned = false;
            bigDefeated += 1;
        }

        
        if (bigElephant.x < player.x) { bigElephant.xVelocity += 1; }
        if (bigElephant.x > player.x) { bigElephant.xVelocity -= 1; }
        if (bigElephant.x == player.x) { bigElephant.xVelocity = 0; }

        if (bigElephant.y < player.y) { bigElephant.yVelocity += 1; }
        if (bigElephant.y > player.y) { bigElephant.yVelocity -= 1; }
        if (bigElephant.y == player.y) { bigElephant.yVelocity = 0; }

    if (bigDefeated >= 3) {
        window.location.replace("win.html");
    }

    //Mouse Collision
    if (player.x >= bigElephant.x && player.x <= (bigElephant.x + 270) && player.y >= bigElephant.y && player.y <= (bigElephant.y + 150)) {
        window.location.replace("lose.html");
    }
    if (player.x >= smallEle[0].x && player.x <= (smallEle[0].x + 120) && player.y >= smallEle[0].y && player.y <= (smallEle[0].y + 86)) {
        window.location.replace("lose.html");
    }
    if (player.x >= smallEle[1].x && player.x <= (smallEle[1].x + 120) && player.y >= smallEle[1].y && smallEle[1].y <= (smallEle[1].y + 86)) {
        window.location.replace("lose.html");
    }
    if (player.x >= smallEle[2].x && player.x <= (smallEle[2].x + 120) && player.y >= smallEle[2].y && player.y <= (smallEle[2].y + 86)) {
        window.location.replace("lose.html");
    }
    if (player.x >= smallEle[3].x && player.x <= (smallEle[3].x + 120) && player.y >= smallEle[3].y && player.y <= (smallEle[3].y + 86)) {
        window.location.replace("lose.html");
    }
    if (player.x >= smallEle[4].x && player.x <= (smallEle[4].x + 120) && player.y >= smallEle[4].y && player.y <= (smallEle[4].y + 86)) {
        window.location.replace("lose.html");
    }

    //Updates positions based on velocity gained or lost. Velocity is pixels per frame
    player.x += player.xVelocity; player.xVelocity *= 0.9;
    player.y += player.yVelocity; player.yVelocity *= 0.9;
    if (bigElephant.spawned) {
        bigElephant.x += bigElephant.xVelocity; bigElephant.xVelocity *= 0.9;
        bigElephant.y += bigElephant.yVelocity; bigElephant.yVelocity *= 0.9;
    } else {
        bigElephant.xVelocity = 0;
        bigElephant.yVelocity = 0;
    }

    if (smallEle[0].spawned) {
        smallEle[0].x += smallEle[0].xVelocity; smallEle[0].xVelocity *= 0.8;//TODO: Make a game speed variable that correlates to the enemy speed
        smallEle[0].y += smallEle[0].yVelocity; smallEle[0].yVelocity *= 0.8; 
    } else {
        smallEle[0].xVelocity = 0;
        smallEle[0].yVelocity = 0;
    }
    
    if (smallEle[1].spawned) {
        smallEle[1].x += smallEle[1].xVelocity; smallEle[1].xVelocity *= 0.8;//TODO: Make a game speed variable that correlates to the enemy speed
        smallEle[1].y += smallEle[1].yVelocity; smallEle[1].yVelocity *= 0.8; 
    } else {
        smallEle[1].xVelocity = 0;
        smallEle[1].yVelocity = 0;
    }

    if (smallEle[2].spawned) {
        smallEle[2].x += smallEle[2].xVelocity; smallEle[2].xVelocity *= 0.8;//TODO: Make a game speed variable that correlates to the enemy speed
        smallEle[2].y += smallEle[2].yVelocity; smallEle[2].yVelocity *= 0.8; 
    } else {
        smallEle[2].xVelocity = 0;
        smallEle[2].yVelocity = 0;
    }

    if (smallEle[3].spawned) {
        smallEle[3].x += smallEle[3].xVelocity; smallEle[3].xVelocity *= 0.8;//TODO: Make a game speed variable that correlates to the enemy speed
        smallEle[3].y += smallEle[3].yVelocity; smallEle[3].yVelocity *= 0.8; 
    } else {
        smallEle[3].xVelocity = 0;
        smallEle[3].yVelocity = 0;
    }

    if (smallEle[4].spawned) {
        smallEle[4].x += smallEle[4].xVelocity; smallEle[4].xVelocity *= 0.8;//TODO: Make a game speed variable that correlates to the enemy speed
        smallEle[4].y += smallEle[4].yVelocity; smallEle[4].yVelocity *= 0.8; 
    } else {
        smallEle[4].xVelocity = 0;
        smallEle[4].yVelocity = 0;
    }

    projectile.x += projectile.xVelocity;
    projectile.y += projectile.yVelocity;
    
    //Border walls (Adjust later)
    if (player.x <= -1) { player.x = 0; player.xVelocity = 0; }
    if (player.x >= 1233) { player.x = 1232; player.xVelocity = 0; }
    if (player.y <= -1) { player.y = 0; player.yVelocity = 0; }
    if (player.y >= 909) { player.y = 908; player.yVelocity = 0; }

    context.fillStyle = context.createPattern(background, "no-repeat"); context.fillRect(0, 0, 1280, 960); // x POSITION, y POSITION, width, height
    
    context.beginPath();
    context.drawImage(cheese, projectile.x, projectile.y, projectile.width, projectile.height);
    context.drawImage(mouseNow, player.x, player.y, player.width, player.height); 

    context.drawImage(eleSmall, smallEle[0].x, smallEle[0].y, smallEle[0].width, smallEle[0].height);
    context.drawImage(redSmall, smallEle[1].x, smallEle[1].y, smallEle[1].width, smallEle[1].height);
    context.drawImage(blueSmall, smallEle[2].x, smallEle[2].y, smallEle[2].width, smallEle[2].height);
    context.drawImage(greenSmall, smallEle[3].x, smallEle[3].y, smallEle[3].width, smallEle[3].height);
    context.drawImage(goldSmall, smallEle[4].x, smallEle[4].y, smallEle[4].width, smallEle[4].height);

    context.drawImage(bigEle, bigElephant.x, bigElephant.y, bigElephant.width, bigElephant.height);

    context.fill();
    
    window.requestAnimationFrame(loop);
};

window.addEventListener("keydown", controller.keyListener); 
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);