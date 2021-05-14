//original tutorial followed: https://levelup.gitconnected.com/creating-a-simple-2d-game-with-html5-javascript-889aa06035ef

//TODO: Make the cheese fire-able only once until it hits the wall 
var frameCount = 1;
const context = document.querySelector("canvas").getContext("2d");
context.canvas.height = 960;
context.canvas.width = 1280;
var direction = 5; //NEW VARIABLE: value coresponds to direction on a number pad

//Whole bunch of sprites (Image constructors)
var downWalkCycle = new Array();
downWalkCycle[0] = new Image(); downWalkCycle[0].src = 'images/downWalkCycle0.png';
downWalkCycle[1] = new Image(); downWalkCycle[1].src = 'images/downWalkCycle1.png'
downWalkCycle[2] = new Image(); downWalkCycle[2].src = 'images/downWalkCycle2.png'
downWalkCycle[3] = new Image(); downWalkCycle[3].src = 'images/downWalkCycle3.png'

var leftWalkCycle = new Array();
leftWalkCycle[0] = new Image(); leftWalkCycle[0].src = 'images/leftWalkCycle0.png'
leftWalkCycle[1] = new Image(); leftWalkCycle[1].src = 'images/leftWalkCycle1.png'

var rightWalkCycle = new Array();
rightWalkCycle[0] = new Image(); rightWalkCycle[0].src = 'images/rightWalkCycle0.png' 
rightWalkCycle[1] = new Image(); rightWalkCycle[1].src = 'images/rightWalkCycle0.png'

var upWalkCycle = new Array();
upWalkCycle[0] = new Image(); upWalkCycle[0].src = 'images/upWalkCycle0.png';
upWalkCycle[1] = new Image(); upWalkCycle[1].src = 'images/upWalkCycle1.png'
upWalkCycle[2] = new Image(); upWalkCycle[2].src = 'images/upWalkCycle2.png'
upWalkCycle[3] = new Image(); upWalkCycle[3].src = 'images/upWalkCycle3.png'

var cheese = new Image(); cheese.src = 'images/cheese.png'
var smallEle = new Image(); smallEle.src = "images/elephant1.png"
var bigEle = new Image(); bigEle.src = "images/bebe.png"

const player = { /*SIZE OF MOUSE*/ height: 52, width: 76, /*STARTING POSITION*/ x: 616, y: 454, /*STARTING SPEED*/ xVelocity: 0, yVelocity: 0 };
const projectile = { /*SIZE OF CHEESE*/ height: 52, width: 48, /*STARTING POSITION*/ x: 3000, y: 3000, /*STARTING SPEED*/ xVelocity: 0, yVelocity: 0 };
       
const nextFrame = () => { frameCount++; } //increases the frame count (will probably use for levels/difficulty increase) 
        
const controller = {
    left: false, right: false, up: false, down: false, //Mouse walking controls
    isFiring: false, //Cheese firing controls

    keyListener: function (event) { //This is the link for keycodes to change controls http://gcctech.org/csc/javascript/javascript_keycodes.htm
        var key_state = (event.type == "keydown") ? true : false;
        switch (event.keyCode) {
            case 65: controller.left = key_state; break; //a
            case 87: controller.up = key_state; break; //w 
            case 68: controller.right = key_state; break; //d
            case 83: controller.down = key_state; break; //s
            case 32: controller.isFiring = key_state; break; //Space
        }
    }
};

const loop = function () {
    var mouseNow = new Image(); //Current mouse sprite
    mouseNow.src = 'images/downWalkCycle0.png';
   
    //Walking in all eight directions
     if (controller.up && controller.right) { 
        player.yVelocity -= 0.75;
        player.xVelocity += 0.75;
        direction = 9;
    } else if (controller.up && controller.left) {
        player.yVelocity -= 0.75;
        player.xVelocity -= 0.75;
        direction = 7;
    } else if (controller.up && !controller.right && !controller.left) {
        player.yVelocity -= 1.1;
        direction = 8;
    }  

    if (controller.down && controller.right) {
        player.yVelocity += 0.75;
        player.xVelocity += 0.75;
        direction = 3;
    } else if (controller.down && controller.left) {
        player.yVelocity += 0.75;
        player.xVelocity -= 0.75;
        direction = 1;
    } else if (controller.down && !controller.right && !controller.left) {
        player.yVelocity += 1.1;
        direction = 2;
    }  

    if (controller.left && !controller.up && !controller.down) {
        player.xVelocity -= 1.1;
        direction = 4;
    } if (controller.right && !controller.up && !controller.down) {
        player.xVelocity += 1.1;
        direction = 6;
    } 

    if (controller.isFiring && direction == 1) {//Firing in all eight directions 
        projectile.x = player.x;
        projectile.y = player.y;
        projectile.yVelocity = 50;
        projectile.xVelocity = -50;
    } else if (controller.isFiring && direction == 2) {
        projectile.x = player.x;
        projectile.y = player.y;
        projectile.yVelocity = 100;
        projectile.xVelocity = 0;
    } else if (controller.isFiring && direction == 3) {
        projectile.x = player.x;
        projectile.y = player.y;
        projectile.yVelocity = 50;
        projectile.xVelocity = 50;
    } else if (controller.isFiring && direction == 4) {
        projectile.x = player.x;
        projectile.y = player.y;
        projectile.yVelocity = 0;
        projectile.xVelocity = -100;
    } else if (controller.isFiring && direction == 6) {
        projectile.x = player.x;
        projectile.y = player.y;
        projectile.yVelocity = 0;
        projectile.xVelocity = 100;
    } else if (controller.isFiring && direction == 7) {
        projectile.x = player.x;
        projectile.y = player.y;
        projectile.yVelocity = -50;
        projectile.xVelocity = -50;
    } else if (controller.isFiring && direction == 8) {
        projectile.x = player.x;
        projectile.y = player.y;
        projectile.xVelocity = 0;
        projectile.yVelocity = -100;
    } else if (controller.isFiring && direction == 9) {
        projectile.x = player.x;
        projectile.y = player.y;
        projectile.xVelocity = 50;
        projectile.yVelocity = -50;
    } 

    //Refreshes mouse position based on velocity
        player.x += player.xVelocity;
        player.y += player.yVelocity;
    //Refreshes cheese position based on velocity
        projectile.x += projectile.xVelocity;
        projectile.y += projectile.yVelocity;
    //Friction modifiers
        player.xVelocity *= 0.9;
        player.yVelocity *= 0.9;

    //Border walls (can be adjusted later)
        if (player.x <= -1) { player.x = 0; player.xVelocity = 0; }
        if (player.x >= 1233) { player.x = 1232; player.xVelocity = 0; }
        if (player.y <= -1) { player.y = 0; player.yVelocity = 0; }
        if (player.y >= 909) { player.y = 908; player.yVelocity = 0; }

    //Creates the backdrop for each frame
        var background = new Image();
        background.src = 'images/Background22.png'; //BACKGROUND PICTURE
        context.fillStyle = context.createPattern(background, "no-repeat");
        context.fillRect(0, 0, 1280, 960); // x POSITION, y POSITION, width, height

    //Draws each frame
        context.beginPath();
        context.drawImage(cheese, projectile.x, projectile.y, projectile.width, projectile.height);
        context.drawImage(mouseNow, player.x, player.y, player.width, player.height); 
        context.fill();

    window.requestAnimationFrame(loop);
};

//Listens for keyboard controls
window.addEventListener("keydown", controller.keyListener); 
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);