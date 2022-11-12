let iPaddleX = 1;
let iPaddleY = 4;
let iPaddleWidth = 2;
let iBallX = 2;
let iBallY = 0;
let iBallDirectionX = -1;
let iBallDirectionY = 1;
let iFieldSize = 5;

drawPaddle();
drawBall();

// Move paddle to the left when button A is clicked:
input.onButtonPressed(Button.A, function () {
    if (iPaddleX > 0) {
        iPaddleX -= 1;
    } else {
        // Don't fall off the left edge of the world!
        iPaddleX = 0;
    }
    drawPaddle();
})

// Move paddle to the right when button B is clicked:
input.onButtonPressed(Button.B, function () {
    if (iPaddleX < (iFieldSize - iPaddleWidth)) {
        iPaddleX += 1;
    } else {
        // Don't fall off the right edge of the world!
        iPaddleX = iFieldSize - iPaddleWidth;
    }
    drawPaddle();
})

function drawPaddle() {
    // Unplot bottom row before drawing paddle so that no trail is left behind:
    for (let x = 0; x <= 4; x++) {
        led.unplot(x, 4);
    }
    for (let i = 0; i < iPaddleWidth; i++) {
        led.plot(iPaddleX + i, iPaddleY);
    }
}

function drawBall() {
    led.plot(iBallX, iBallY);
}

basic.forever(function() {
    
    basic.pause(100);

    // To move the ball, start by turning off its last LED (unplotting):
    // (Except when that LED is already used to draw the paddle!)
    if (iBallY == (iFieldSize - 1) && (iBallX >= iPaddleX && iBallX <= (iPaddleX + iPaddleWidth - 1))) {
        // We just hit the paddle: don't unplot!
    } else {
        led.unplot(iBallX, iBallY);
    }
    
    // Handle bouncing off of left and right walls:
    if ((iBallX >= (iFieldSize - 1) && iBallDirectionX > 0) ||
        (iBallX <= 0 && iBallDirectionX < 0)) {
        playWallBounceSound();
        iBallDirectionX *= -1; // Bounce back opposite!
    }
    
    // Handle bouncing off top wall:
    if (iBallY <= 0 && iBallDirectionY < 0) {
        playWallBounceSound();
        iBallDirectionY *= -1; // Bounce back opposite!
    }

    // Handle ball hitting bottom wall:
    if (iBallY >= (iFieldSize - 1) && iBallDirectionY > 0) {
        // Did we hit the paddle?
        if (iBallX >= iPaddleX && iBallX <= (iPaddleX + iPaddleWidth - 1)) {
            playPaddleBounceSound();
            iBallDirectionY *= -1; // Bounce back opposite!
        } else {
            // We hit the bottom wall without the paddle: game over!
            pongGameOver();
            game.gameOver();
        }
    }

    // Handle ball movement:
    iBallX = iBallX + iBallDirectionX;
    iBallY = iBallY + iBallDirectionY;
  
    drawBall();
})

function playWallBounceSound() {
    music.playTone(600, 60);
    basic.pause(150);
    music.playTone(450, 70);
}

function playPaddleBounceSound() {
    music.playTone(450, 30);
    basic.pause(80);
    music.playTone(750, 45);
}

function pongGameOver() {
    music.playTone(600, 60);
    music.playTone(700, 40);
    basic.pause(250);
    music.playTone(500, 220);
    basic.pause(350);
    music.playTone(300, 870);
}