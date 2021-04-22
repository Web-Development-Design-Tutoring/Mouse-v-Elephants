//original tutorial followed: https://levelup.gitconnected.com/creating-a-simple-2d-game-with-html5-javascript-889aa06035ef

const context = document.querySelector("canvas").getContext("2d");
context.canvas.height = 960;
context.canvas.width = 1280;

// Start the frame count at 1
let frameCount = 1;
const player = {
    height: 52, //SIZE OF MOUSE
    width: 48,
    x: 616, //STARTING X POSITION
    xVelocity: 0,
    y: 454, //STARTING Y POSITION
    yVelocity: 0
};
        
const nextFrame = () => {
    // increase the frame / "level" count
    frameCount++;
}
        
const controller = {
    left: false,
    right: false,
    up: false,
    down: false,
    keyListener: function (event) {
    
        var key_state = (event.type == "keydown") ? true : false;
    
        switch (event.keyCode) {
    
        //This is the link for keycodes to change controls http://gcctech.org/csc/javascript/javascript_keycodes.htm
        //Mouse should use vertical walk cycles for diagonals

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
        }
    }
};

const loop = function () {
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


    var swapPic= new Image();
    swapPic.src = 'kronk1.png';
    
    if (controller.up) {
        player.yVelocity -= 1;
    }
    if (controller.down) {
        player.yVelocity += 1;
    }
    if (controller.left) {
        player.xVelocity -= 1;
    }
    if (controller.right) {
        player.xVelocity += 1;
    }
    
    player.x += player.xVelocity;
    player.y += player.yVelocity;

    //Friction modifiers
        player.xVelocity *= 0.9;
        player.yVelocity *= 0.9;

       
    //if (player.x <= -1) {
        //player.x = 1280;
    //}
    //if (player.x >= 1281) {
        //player.x = 0;
    //}
    //if (player.y <= -1) {
        //player.y = 960;
    //}
    //if (player.y >= 961) {
        //player.y = 0;
   // }

    // Creates the backdrop for each frame
        var background = new Image();
        background.src = 'Background22.png'; //BACKGROUND PICTURE
        context.fillStyle = context.createPattern(background, "no-repeat");
        context.fillRect(0, 0, 1280, 960); // x POSITION, y POSITION, width, height

    // Draws each frame
        context.beginPath();
        context.drawImage(mouse1and3, player.x, player.y, player.width, player.height);
        context.fill();
        window.requestAnimationFrame(loop);
};

// Listens for keyboard controls
    window.addEventListener("keydown", controller.keyListener); 
    window.addEventListener("keyup", controller.keyListener);

window.requestAnimationFrame(loop);