
    /* WHAT IS VIEWPORT ?
    ==> In simple words, the viewport is the visible area of a web page or app that you can see on your screen at any given time.

Key Points:
Visible Area: The viewport shows only a portion of the content. If the content is larger than the viewport, you'll need to scroll to see the rest.
Browser Window: On a website, the viewport is usually the area within the browser window where you can view the web page. It changes size based on the size of the browser window or the device you're using.
Device Screen: On a mobile device or tablet, the viewport is the screen area of the device where content is displayed.
Example:
If you have a webpage with a lot of text and images, you see only a part of it at a time through the viewport. You scroll up, down, left, or right to see different parts of the page.*/
    


    document.addEventListener('DOMContentLoaded', (event) => {
        let restartButton = document.getElementById('restartButton');
        let can = document.getElementById("table"); // Get the canvas element
        let draw_ = can.getContext('2d'); // Get the 2D drawing context,.....The getContext('2d') method on a canvas element returns a drawing context on the canvas. This context is an object that provides methods and properties for drawing and manipulating graphics on the canvas.
        let winnerMessage = document.getElementById("winner-message"); // Get the winner message element
    
        // Set canvas dimensions
        can.width = 600; // Set canvas width
        can.height = 400; // Set canvas height
    
        // Define objects
        const ball = {
            x: can.width / 2, // Ball's initial x position (center of canvas)
            y: can.height / 2, // Ball's initial y position (center of canvas)
            radius: 10, // Ball's radius
            vel_in_x_dir: 5, // Ball's velocity in the x direction
            vel_in_y_dir: 5, // Ball's velocity in the y direction
            speed: 7, // Ball's speed
            color: "green" // Ball's color
        };
        const sep = {
            x: (can.width - 2) / 2, /*The calculation (can.width - 2) / 2 is used to determine the x-coordinate of the separator line so that it is centered horizontally on the canvas. Let's break this down:

            can.width:
            
            This represents the total width of the canvas.
            2:
            
            This represents the width of the separator line. In this case, the separator line is 2 pixels wide.
            can.width - 2:
            
            This calculates the width of the canvas minus the width of the separator line. It ensures that when we position the separator, we account for its width and keep it centered.
            (can.width - 2) / 2:
            
            This calculation finds the horizontal center point for the separator. Dividing by 2 places the left edge of the separator line such that the line is centered. */
            y: 0, // Separator's y position (top of canvas)
            height: 10, // Separator's height(10px tall (each rectangle height))
            width: 2, // Separator's width
            color: "white" // Separator's color
        };
        const userbar = {
            x: 0, // User paddle's x position (left side)
            y: (can.height - 100) / 2, // User paddle's y position (center vertically)
            width: 10, // User paddle's width
            height: 100, // User paddle's height
            score: 0, // User's initial score
            color: "red" // User paddle's color
        };
        const CPU_bar = {
            x: can.width - 10, // CPU paddle's x position (right side)
            y: (can.height - 100) / 2, // CPU paddle's y position (center vertically)
            width: 10, // CPU paddle's width
            height: 100, // CPU paddle's height
            score: 0, // CPU's initial score
            color: "red" // CPU paddle's color
        };
    
        // Drawing functions
        function drawRectangle(x, y, w, h, color) {
            draw_.fillStyle = color; // Set fill color
            draw_.fillRect(x, y, w, h); // Draw rectangle
        }
        function drawCircle(x, y, r, color) {
            draw_.fillStyle = color; // Set fill color
            draw_.beginPath(); // Begin a new path
            draw_.arc(x, y, r, 0, Math.PI * 2, true); // Draw a circle
            draw_.closePath(); // Close the path
            draw_.fill(); // Fill the circle
        }
        function drawScore(text, x, y) {
            draw_.fillStyle = "white"; // Set text color
            draw_.font = "60px Arial"; // Set font
            draw_.fillText(text, x, y); // Draw text
        }
        function drawSeperator() {
            for (let i = 0; i <= can.height; i += 20) {
                drawRectangle(sep.x, sep.y + i, sep.width, sep.height, sep.color); // Draw separator line
            }
        }
    
        // Function to render the canvas
        function render() {
            draw_.fillStyle = "black"; // Set background color
            draw_.fillRect(0, 0, can.width, can.height); // Clear the canvas
    
            drawSeperator(); // Draw the separator line
    
            drawRectangle(userbar.x, userbar.y, userbar.width, userbar.height, userbar.color); // Draw user paddle
            drawRectangle(CPU_bar.x, CPU_bar.y, CPU_bar.width, CPU_bar.height, CPU_bar.color); // Draw CPU paddle
            drawCircle(ball.x, ball.y, ball.radius, ball.color); // Draw the ball
            drawScore(userbar.score, can.width / 4, can.height / 5); /*For a canvas width of 600, can.width / 4 equals 150, so the score will be drawn 150 pixels from the left edge of the canvas. also For a canvas height of 400, can.height / 5 equals 80, so the score will be drawn 80 pixels from the top edge of the canvas.*/
            drawScore(CPU_bar.score, 3 * can.width / 4, can.height / 5); /*For a canvas width of 600, 3 * can.width / 4 equals 450, so the score will be drawn 450 pixels from the left edge of the canvas. */
        }
    
        render(); // Call render function to draw everything initially
    
        function callback() {
            updates(); // Update game state
            render(); // Render the updated state
        }
    
        let fps = 50; // Frames per second
        let looper = setInterval(callback, 1000 / fps); // Set game loop
        /*
        setInterval is a JavaScript function that repeatedly calls a function (or executes code) 
        at specified time intervals.callback: This is the function to be called repeatedly. 
        In this case, it refers to the callback function that you defined to handle 
        updates and rendering for each frame of the game.
        1000 / fps: This calculates the interval in milliseconds at which callback should be executed.
        1000: Represents the number of milliseconds in one second.
        fps: The frame rate you want (50 FPS in this case).
        1000 / 50: Calculates to 20 milliseconds. This means the callback function will 
        be called every 20 milliseconds, which aligns with the 50 FPS frame rate.*/
        
        function restart() {
            ball.x = can.width / 2; // Reset ball's x position
            ball.y = can.height / 2; // Reset ball's y position
            ball.vel_in_x_dir = -ball.vel_in_x_dir; // Reverse ball's x direction >....When a point is scored, this line ensures that the ball will move in the opposite direction after the restart, so the ball continues the game from the other side of the court.
            ball.speed = 5; // Reset ball's speed
        }
    
        can.addEventListener("mousemove", getMousePos); // Add mouse move event listener
    
        function getMousePos(evt) {
            let rect = can.getBoundingClientRect(); // Get canvas position relative to viewport
            userbar.y = evt.clientY - rect.top - userbar.height / 2; // Update user paddle position
        }
    /*Mouse Position Relative to the Browser Window:
evt.clientY
This gives the vertical position (Y-coordinate) of the mouse cursor relative to the top of the browser window. For example, if the mouse is 150 pixels down from the top of the window, evt.clientY would be 150.
Canvas Position Relative to the Browser Window:

rect.top
rect.top gives the vertical position (Y-coordinate) of the top edge of the canvas relative to the top of the browser window. For example, if the top edge of the canvas is 100 pixels down from the top of the window, rect.top would be 100.
Mouse Position Relative to the Canvas:

evt.clientY - rect.top
This calculates the vertical position of the mouse cursor relative to the top of the canvas. It's done by subtracting the canvas's top position (rect.top) from the mouse's position (evt.clientY). For instance, if evt.clientY is 150 and rect.top is 100, then evt.clientY - rect.top would be 50. This means the mouse is 50 pixels down from the top of the canvas.
Centering the Paddle on the Mouse Cursor:

- userbar.height / 2
The paddle's height is divided by 2 to get half of its height. Subtracting this half-height centers the paddle vertically on the mouse cursor. For example, if the paddle's height is 20 pixels, userbar.height / 2 would be 10. Subtracting 10 from the mouse's position relative to the canvas ensures the center of the paddle aligns with the mouse cursor.
Updating the Paddle Position:

userbar.y = evt.clientY - rect.top - userbar.height / 2;
This line updates the vertical position (y) of the paddle (userbar). It sets userbar.y to the calculated position, which is the mouse's position relative to the canvas (evt.clientY - rect.top) minus half the paddle's height (userbar.height / 2). This effectively moves the paddle so that its center follows the mouse cursor. */

        function detectcollision(ball, player) {
            player.top = player.y; // Player's top boundary
            player.bottom = player.y + player.height; // Player's bottom boundary
            player.left = player.x; // Player's left boundary
            player.right = player.x + player.width; // Player's right boundary
    
            ball.top = ball.y - ball.radius; // Ball's top boundary
            ball.bottom = ball.y + ball.radius; // Ball's bottom boundary
            ball.left = ball.x - ball.radius; // Ball's left boundary
            ball.right = ball.x + ball.radius; // Ball's right boundary
    
            // Check if ball and player collide
            return player.left < ball.right && player.top < ball.bottom && player.right > ball.left && player.bottom > ball.top;
        }
    /*Function Definition:


function detectcollision(ball, player) {
This line defines a function named detectcollision that takes two arguments: ball and player.
Setting Player Boundaries:


player.top = player.y; // Player's top boundary
player.bottom = player.y + player.height; // Player's bottom boundary
player.left = player.x; // Player's left boundary
player.right = player.x + player.width; // Player's right boundary
These lines calculate the boundaries of the player:
player.top is the top edge of the player.
player.bottom is the bottom edge of the player.
player.left is the left edge of the player.
player.right is the right edge of the player.
For example, if the player's position is at (50, 100) with a width of 20 and height of 60, then:
player.top = 100
player.bottom = 100 + 60 = 160
player.left = 50
player.right = 50 + 20 = 70

Setting Ball Boundaries:


ball.top = ball.y - ball.radius; // Ball's top boundary
ball.bottom = ball.y + ball.radius; // Ball's bottom boundary
ball.left = ball.x - ball.radius; // Ball's left boundary
ball.right = ball.x + ball.radius; // Ball's right boundary
These lines calculate the boundaries of the ball:
ball.top is the top edge of the ball.
ball.bottom is the bottom edge of the ball.
ball.left is the left edge of the ball.
ball.right is the right edge of the ball.
For example, if the ball's position is at (200, 150) with a radius of 10, then:
ball.top = 150 - 10 = 140
ball.bottom = 150 + 10 = 160
ball.left = 200 - 10 = 190
ball.right = 200 + 10 = 210
Checking for Collision:


return player.left < ball.right && player.top < ball.bottom && player.right > ball.left && player.bottom > ball.top;
This line checks if the ball and player collide by comparing their boundaries. A collision occurs if all the following conditions are true:
The left edge of the player is to the left of the right edge of the ball (player.left < ball.right).
The top edge of the player is above the bottom edge of the ball (player.top < ball.bottom).
The right edge of the player is to the right of the left edge of the ball (player.right > ball.left).
The bottom edge of the player is below the top edge of the ball (player.bottom > ball.top).
If all these conditions are true, the function returns true indicating a collision; otherwise, it returns false.
Example
Let's consider an example with specific values:

Player:

Position: (50, 100)
Width: 20
Height: 60
Ball:

Position: (65, 130)
Radius: 10
Player Boundaries:

player.top = 100
player.bottom = 100 + 60 = 160
player.left = 50
player.right = 50 + 20 = 70
Ball Boundaries:

ball.top = 130 - 10 = 120
ball.bottom = 130 + 10 = 140
ball.left = 65 - 10 = 55
ball.right = 65 + 10 = 75
Collision Check:

player.left < ball.right → 50 < 75 → true
player.top < ball.bottom → 100 < 140 → true
player.right > ball.left → 70 > 55 → true
player.bottom > ball.top → 160 > 120 → true
Since all these conditions are true, the function returns true, indicating that the ball and player are colliding. */
        function cpu_movement() {
            let centerY = CPU_bar.y + CPU_bar.height / 2; // CPU paddle's center y position
    
            let delay = Math.random() * 75; // Add randomness to CPU movement
    
            if (centerY < ball.y - delay) {
                CPU_bar.y += 2; // Move CPU paddle down
            } else if (centerY > ball.y + delay) {
                CPU_bar.y -= 2; // Move CPU paddle up
            }
    
            // Prevent CPU paddle from going out of bounds
            if (CPU_bar.y < 0) {
                CPU_bar.y = 0;
            } else if (CPU_bar.y + CPU_bar.height > can.height) {
                CPU_bar.y = can.height - CPU_bar.height;
            }
        }
        /*Calculate the Center of the CPU Paddle:


let centerY = CPU_bar.y + CPU_bar.height / 2; // CPU paddle's center y position
This line calculates the vertical center position of the CPU paddle (CPU_bar). It adds half of the paddle's height to its current y-coordinate (CPU_bar.y).
Add Randomness to CPU Movement:


let delay = Math.random() * 75; // Add randomness to CPU movement
This line generates a random number between 0 and 75 and assigns it to delay. This adds some unpredictability to the CPU paddle's movement, making the game less predictable and more challenging.
Move CPU Paddle Down or Up:


if (centerY < ball.y - delay) {
    CPU_bar.y += 2; // Move CPU paddle down
} else if (centerY > ball.y + delay) {
    CPU_bar.y -= 2; // Move CPU paddle up
}
These lines check if the center of the CPU paddle is below or above the ball's y-coordinate (adjusted by the random delay):
If the center of the CPU paddle is below the ball (centerY < ball.y - delay), the paddle moves down by 2 pixels (CPU_bar.y += 2).
If the center of the CPU paddle is above the ball (centerY > ball.y + delay), the paddle moves up by 2 pixels (CPU_bar.y -= 2).
Prevent CPU Paddle from Going Out of Bounds:


if (CPU_bar.y < 0) {
    CPU_bar.y = 0;
} else if (CPU_bar.y + CPU_bar.height > can.height) {
    CPU_bar.y = can.height - CPU_bar.height;
}
These lines ensure that the CPU paddle stays within the boundaries of the canvas:
If the paddle moves above the top of the canvas (CPU_bar.y < 0), it is set to 0 (CPU_bar.y = 0), preventing it from going off-screen.
If the paddle moves below the bottom of the canvas (CPU_bar.y + CPU_bar.height > can.height), it is set to the maximum allowed position (CPU_bar.y = can.height - CPU_bar.height), preventing it from going off-screen.
Summary
The function cpu_movement controls the vertical movement of the CPU paddle.
It calculates the center of the CPU paddle.
It adds some randomness to the movement to make the game more interesting.
It moves the paddle up or down to follow the ball's position, considering the random delay.
It ensures the paddle doesn't go out of the canvas boundaries. */
    
        function updates() {
            // Check if someone has won
            if (userbar.score === 5) {
                winnerMessage.innerText = "You are the winner!"; // Display winner message
                clearInterval(looper); // Stop the game loop
                return;
            } else if (CPU_bar.score === 5) {
                winnerMessage.innerText = "The opponent is the winner!"; // Display winner message
                clearInterval(looper); // Stop the game loop
                return;
            }
    
            /* Check if ball hits the left or right edge /*Purpose: Check if the ball has gone past the left or right edge of the canvas.
Action: If it goes past the left edge, the CPU scores a point; if it goes past the right edge, the user scores a point. Then, the ball is restarted in the center. */
            if (ball.x - ball.radius < 0) {
                CPU_bar.score++; // Increase CPU's score
                restart(); // Restart the ball
            } else if (ball.x + ball.radius > can.width) {
                userbar.score++; // Increase user's score
                restart(); // Restart the ball
            }
    
            ball.x += ball.vel_in_x_dir; // Update ball's x position
            ball.y += ball.vel_in_y_dir; // Update ball's y position
    /*Ball moves from (x, y) to (x + vel_in_x_dir, y + vel_in_y_dir) */
            cpu_movement(); // Move CPU paddle
    /*Purpose: Update the CPU paddle's position based on the ball's position.
    Action: Call the cpu_movement function to adjust the CPU paddle. */
            // Check if ball hits the top or bottom edge
            if (ball.y - ball.radius < 0 || ball.y + ball.radius > can.height) {
                ball.vel_in_y_dir = -ball.vel_in_y_dir; // Reverse ball's y direction
            }
    
            let player = (ball.x + ball.radius < can.width / 2) ? userbar : CPU_bar; // Determine which paddle to check collision with
    
            if (detectcollision(ball, player)) {
                let collidepoint = (ball.y - (player.y + player.height / 2)); // Calculate collision point
                collidepoint = collidepoint / (player.height / 2); // Normalize collision point
                let anglerad = (Math.PI / 4) * collidepoint; // Calculate angle in radians
                let direction = (ball.x + ball.radius < can.width / 2) ? 1 : -1; // Determine ball's new direction
    
                ball.vel_in_x_dir = direction * ball.speed * Math.cos(anglerad); // Update ball's x velocity
                ball.vel_in_y_dir = ball.speed * Math.sin(anglerad); // Update ball's y velocity
            }
        }
        function restartGame() {
            // Reset scores
            userbar.score = 0;
            CPU_bar.score = 0;
            // Reset game state
            restart();
            winnerMessage.innerText = ""; // Clear the winner message
            // Restart the game loop
            clearInterval(looper);
            looper = setInterval(callback, 1000 / fps);
        }
        restartButton.addEventListener('click', restartGame); // Add event listener to restart button

      
    });
    