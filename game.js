const context = document.querySelector("canvas").getContext("2d");
    
        context.canvas.height = 960;
        context.canvas.width = 1280;
        
        // Start the frame count at 1
        let frameCount = 1;
    
        const square = {
    
            height: 52, //SIZE OF MOUSE
            width: 48,
            x: 0,
            xVelocity: 0,
            y: 0,
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
            var mousePic = new Image();//I PUT IN "KRONKPIC" AS FILL OF SQUARE USING DRAW IMAGE
            mousePic.src = 'mouse_1and3.png';
            

            var swapPic= new Image();
            swapPic.src = 'kronk1.png';
    
            if (controller.up) {
                square.yVelocity -= 1;
            }
            if (controller.down) {
                square.yVelocity += 1;
            }
            if (controller.left) {
                square.xVelocity -= 1;
            }
            if (controller.right) {
                square.xVelocity += 1;
            }
    
            square.x += square.xVelocity;
            square.y += square.yVelocity;
            square.xVelocity *= 0.9;// friction
            square.yVelocity *= 0.9;// friction

            if (square.x <= -1) {
                square.x = 1280;
            }
            if (square.x >= 1281) {
                square.x = 0;
            }
            if (square.y <= -1) {
                square.y = 960;
            }
            if (square.y >= 961) {
                square.y = 0;
            }

    
        // Creates the backdrop for each frame
            context.fillStyle = "#2F4F4F";
            context.fillRect(0, 0, 1280, 960); // x, y, width, height
    
           
            context.beginPath();
            context.drawImage(mousePic, square.x, square.y, square.width, square.height);
            context.fill();
    
            window.requestAnimationFrame(loop);
        };
    
        window.addEventListener("keydown", controller.keyListener); //Works with the controls
        window.addEventListener("keyup", controller.keyListener);

        window.requestAnimationFrame(loop);