//original tutorial followed: https://levelup.gitconnected.com/creating-a-simple-2d-game-with-html5-javascript-889aa06035ef

//TODO: Make the cheese fire-able only once until it hits the wall 
var frameCount = 1;
const context = document.querySelector("canvas").getContext("2d");
context.canvas.height = 960;
context.canvas.width = 1280;
var direction = 5; //NEW VARIABLE; value coresponds to direction on a number pad

//Whole bunch of sprites (Image constructors)
    //Down walk cycle    
    var mouse1and3 = new Image(); mouse1and3.src = 'mouse_1and3.png';
    var mouse2 = new Image(); mouse2.src = 'mouse_2.png'
    var mouse4 = new Image(); mouse4.src = 'mouse_4.png'

    //Left walk cycle
    var mouse5and7 = new Image(); mouse5and7.src = 'mouse_5and7.png'
    var mouse6and8 = new Image(); mouse6and8.src = 'mouse_6and8.png'

    //Right walk cycle
    var mouse9and11 = new Image(); mouse9and11.src = 'mouse_9and11.png'
    var mouse10and12 = new Image(); mouse10and12.src = 'mouse_10and12.png'

    //Up walk cycle
    var mouse13and15 = new Image(); mouse13and15.src = 'mouse_13and15.png'
    var mouse14 = new Image(); mouse14.src = 'mouse_14.png'
    var mouse16 = new Image(); mouse16.src = 'mouse_16.png'

    //Other
    var cheese = new Image(); cheese.src = 'cheese.png'
    var smallEle = new Image(); smallEle.src = "elephant1.png"
    var bigEle = new Image(); bigEle.src = "bebe.png"

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
   
    if (controller.up && controller.right) { //Walking in all eight directions
        player.yVelocity -= 0.75;
        player.xVelocity += 0.75;
        mouseNow.src = mouse14.src;
        direction = 9;
    } else if (controller.up && controller.left) {
        player.yVelocity -= 0.75;
        player.xVelocity -= 0.75;
        mouseNow.src = mouse14.src;
        direction = 7;
    } else if (controller.down && controller.right) {
        player.yVelocity += 0.75;
        player.xVelocity += 0.75;
        mouseNow.src = mouse1and3.src;
        direction = 3;
    } else if (controller.down && controller.left) {
        player.yVelocity += 0.75;
        player.xVelocity -= 0.75;
        mouseNow.src = mouse1and3.src;
        direction = 1;
    } else if (controller.up) {
        player.yVelocity -= 1.1;
        mouseNow.src = mouse14.src;
        direction = 8;
    } else if (controller.down) {
        player.yVelocity += 1.1;
        mouseNow.src = mouse1and3.src;
        direction = 2;
    } else if (controller.left) {
        player.xVelocity -= 1.1;
        mouseNow.src = mouse5and7.src;
        direction = 4;
    } else if (controller.right) {
        player.xVelocity += 1.1;
        mouseNow.src = mouse9and11.src;
        direction = 6;
    } else {
        mouseNow.src = mouse1and3.src;
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
        background.src = 'Background22.png'; //BACKGROUND PICTURE
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