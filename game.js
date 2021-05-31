//ORIGINAL TUTORIAL FOLLOWED: https://levelup.gitconnected.com/creating-a-simple-2d-game-with-html5-javascript-889aa06035ef
const context = document.querySelector("canvas").getContext("2d"); context.canvas.width = 1280; context.canvas.height = 960;
const player = { /*SIZE OF MOUSE*/ height: 52, width: 76, /*STARTING POSITION*/ x: 616, y: 454, /*STARTING SPEED*/ xVelocity: 0, yVelocity: 0 };
const projectile = { /*SIZE OF CHEESE*/ height: 52, width: 48, /*STARTING POSITION*/ x: -100, y: -100, /*STARTING SPEED*/ xVelocity: 0, yVelocity: 0 };

const enemy0  = { /*SIZE OF ELEPHANT*/ height: 97, width: 135, /*STARTING POSITION*/ x: 616, y: 454, /*STARTING SPEED*/ xVelocity: 0, yVelocity: 0 };
const enemy1  = { /*SIZE OF ELEPHANT*/ height: 97, width: 135, /*STARTING POSITION*/ x: 616, y: 454, /*STARTING SPEED*/ xVelocity: 0, yVelocity: 0 };
const enemy2  = { /*SIZE OF ELEPHANT*/ height: 97, width: 135, /*STARTING POSITION*/ x: 616, y: 454, /*STARTING SPEED*/ xVelocity: 0, yVelocity: 0 };
const enemy3  = { /*SIZE OF ELEPHANT*/ height: 97, width: 135, /*STARTING POSITION*/ x: 616, y: 454, /*STARTING SPEED*/ xVelocity: 0, yVelocity: 0 };
const enemy4  = { /*SIZE OF ELEPHANT*/ height: 97, width: 135, /*STARTING POSITION*/ x: 616, y: 454, /*STARTING SPEED*/ xVelocity: 0, yVelocity: 0 };

const background = new Image(); background.src = 'images/Background22.png'; //BACKGROUND PICTURE

var frameCount = 1; const nextFrame = () => { frameCount++; } //increases the frame count (will probably use for levels/difficulty increase)
var frameIndex = 0;
var realIndex = 0;

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

var smallEle0 = new Image(); smallEle0.src = "images/elephant1.png";
var smallEle1 = new Image(); smallEle1.src = "images/elephant1.png";
var smallEle2 = new Image(); smallEle2.src = "images/elephant1.png";
var smallEle3 = new Image(); smallEle3.src = "images/elephant1.png";
var smallEle4 = new Image(); smallEle4.src = "images/elephant1.png";

var bigEle = new Image(); bigEle.src = "images/bebe.png";

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
    
    //Updates positions based on velocity gained or lost. Velocity is pixels per frame
    player.x += player.xVelocity; player.xVelocity *= 0.9;
    player.y += player.yVelocity; player.yVelocity *= 0.9;
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
    context.drawImage(smallEle0, enemy0.x, enemy0.y, enemy0.width, enemy0.height); 
    context.drawImage(smallEle1, enemy1.x, enemy1.y, enemy1.width, enemy1.height);
    context.drawImage(smallEle2, enemy2.x, enemy2.y, enemy2.width, enemy2.height);
    context.drawImage(smallEle3, enemy3.x, enemy3.y, enemy3.width, enemy3.height);
    context.drawImage(smallEle4, enemy4.x, enemy4.y, enemy4.width, enemy4.height);

    context.fill();
    
    window.requestAnimationFrame(loop);
};

window.addEventListener("keydown", controller.keyListener); 
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);