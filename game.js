//original tutorial followed: https://levelup.gitconnected.com/creating-a-simple-2d-game-with-html5-javascript-889aa06035ef
const context = document.querySelector("canvas").getContext("2d");
context.canvas.height = 960;
context.canvas.width = 1280;

//Whole bunch of sprites
    //TODO: WE SHOULD EDIT THE MOUSE SPRITES SO THAT THEY SHARE THE SAME DIMENSIONS
    var mouse1and3 = new Image();
    mouse1and3.src = 'mouse_1and3.png';
            
    var mouse2 = new Image();
    mouse2.src = 'mouse_2.png'

    var mouse4 = new Image();
    mouse4.src = 'mouse_4.png'

    var mouse5and7 = new Image();
    mouse5and7.src = 'mouse_5and7.png'

    var mouse6 = new Image();
    mouse6.src = 'mouse_6.png'

    var mouse8 = new Image();
    mouse8.src = 'mouse_8.png'

    var mouse9and11 = new Image();
    mouse9and11.src = 'mouse_9and11.png'

    var mouse10 = new Image();
    mouse10.src = 'mouse_10.png'

    var mouse12 = new Image();
    mouse12.src = 'mouse_12.png'

    var mouse13and15 = new Image();
    mouse13and15.src = 'mouse_13and15.png'

    var mouse14 = new Image();
    mouse14.src = 'mouse_14.png'

    var mouse16 = new Image();
    mouse16.src = 'mouse_16.png'

    var cheese = new Image();
    cheese.src = 'cheese.png'

    var smallEle = new Image();
    smallEle.src = "elephant1.png"

    var bigEle = new Image();
    bigEle.src = "bebe.png"

//Start the frame count at 1
let frameCount = 1;

/*---------------------------------------------------------------------------------------------------------------------------*/


const player = {
    /*SIZE OF MOUSE*/ height: 52, width: 48, /*STARTING POSITION*/ x: 616, y: 454, /*STARTING SPEED*/ xVelocity: 0, yVelocity: 0 
};

const projectile = { //TODO: Make the cheese work
    /*SIZE OF CHEESE*/ height: 52, width: 48, /*STARTING POSITION*/ x: player.x, y: player.y, /*STARTING SPEED*/ xVelocity: 0, yVelocity: 0 
};
        
const nextFrame = () => { //increases the frame count (will probably use for levels/difficulty increase)
    frameCount++;
}
        
const controller = {
    left: false, right: false, up: false, down: false,

    isFiringUp: false, isFiringDown: false, isFiringLeft: false, isFiringRight: false,

    keyListener: function (event) { //TODO: Mouse should use vertical walk cycles for diagonals
        var key_state = (event.type == "keydown") ? true : false;
        switch (event.keyCode) {
            //This is the link for keycodes to change controls http://gcctech.org/csc/javascript/javascript_keycodes.htm
            
            case 65: //a
                controller.left = key_state;
                break;
            case 87: //w 
                controller.up = key_state;
                break;
            case 68: //d
                controller.right = key_state;
                break;
            case 83: //s
                controller.down = key_state;
                break;


            case 37: //Left
                controller.isFiringLeft = key_state;
                break;
            case 38: //Up
                controller.isFiringUp = key_state;
                break;
            case 39: //Right
                controller.isFiringRight = key_state;
                break;
            case 40: //Down
                controller.isFiringDown = key_state;
                break;
        }
    }

};

const loop = function () { //Animation tutorial https://dev.to/martyhimmel/animating-sprite-sheets-with-javascript-ag3
    
    var mouseNow = new Image();
    mouseNow.src = 'mouse_1and3.png';
    
    if (controller.up) {
        player.yVelocity -= 1;
        player.height = 52;
        player.width = 48;
        mouseNow.src = mouse14.src;
    }
    if (controller.down) {
        player.yVelocity += 1;
        player.height = 52;
        player.width = 48;
        mouseNow.src = mouse1and3.src;
    }
    if (controller.left) {
        player.xVelocity -= 1;
        player.height = 48;
        player.width = 76;
        mouseNow.src = mouse5and7.src;
        
    }
    if (controller.right) {
        player.xVelocity += 1;
        player.height = 48;
        player.width = 76;
        mouseNow.src = mouse9and11.src;
    }
    
    

    if (controller.isFiringDown) {
        projectile.x = player.x;
        projectile.y = player.y;
        projectile.yVelocity += 1;
    }
    if (controller.isFiringUp) {
        
    }
    if (controller.isFiringLeft) {
        
    }
    if (controller.isFiringRight) {
        
    }

    

    player.x += player.xVelocity;
    player.y += player.yVelocity;

    //Friction modifiers
    player.xVelocity *= 0.9;
    player.yVelocity *= 0.9;

    //Border walls (can be adjusted later)
    if (player.x <= -1) {
        player.x = 0;
        player.xVelocity = 0;
    }
    if (player.x >= 1233) {
        player.x = 1232;
        player.xVelocity = 0;
    }
    if (player.y <= -1) {
        player.y = 0;
        player.yVelocity = 0;
    }
    if (player.y >= 909) {
        player.y = 908;
        player.yVelocity = 0;
    }

    //Creates the backdrop for each frame
    var background = new Image();
    background.src = 'Background22.png'; //BACKGROUND PICTURE
    context.fillStyle = context.createPattern(background, "no-repeat");
    context.fillRect(0, 0, 1280, 960); // x POSITION, y POSITION, width, height

    //Draws each frame
    context.beginPath();

    //TODO: We should change the starting position of the drawImage function to make the player position be the center of the sprite
    context.drawImage(mouseNow, player.x, player.y, player.width, player.height); 
    context.drawImage(cheese, projectile.x, projectile.y, projectile.width, projectile.height);

    context.fill();
    window.requestAnimationFrame(loop);
};

//Listens for keyboard controls
window.addEventListener("keydown", controller.keyListener); 
window.addEventListener("keyup", controller.keyListener);

//Listens for computer mouse events    
window.addEventListener("mousedown", controller.mouseAiming);
window.addEventListener("mousemove", controller.mouseAiming);
window.addEventListener("mouseup", controller.mouseAiming);

window.requestAnimationFrame(loop);