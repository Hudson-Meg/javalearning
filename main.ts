let iPaddleX = 1;
let iPaddleY = 4;
let iPaddleWidth = 2;
let iBallX = 2;
let iBallY = 0;
let iBallDirectionX = -1;
let iBallDirectionY = 1;

drawPaddle();
drawBall();

// Move paddle to the left when button A is clicked:
input.onButtonPressed(Button.A, function () {
    if (iPaddleX > 0) {
        iPaddleX += -1;
    } else {
        // Don't fall off the left edge of the world!
        iPaddleX = 0;
    }
    drawPaddle();
})

// Move paddle to the right when button B is clicked:
input.onButtonPressed(Button.B, function () {
    if (iPaddleX < 3) {
        iPaddleX += 1;
    } else {
        // Don't fall off the right edge of the world!
        iPaddleX = 3;
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
    led.unplot(iBallX, iBallY);

    // Move ball in the X and Y directions:

    if ((iBallX >= 4 && iBallDirectionX > 0) ||
        (iBallX <= 0 && iBallDirectionX < 0)) {
        playWallBounceSound();
        iBallDirectionX *= -1; // Bounce back opposite!
    }

    if ((iBallY >= 4 && iBallDirectionY > 0) ||
        (iBallY <= 0 && iBallDirectionY < 0)) {
        playWallBounceSound();
        iBallDirectionY *= -1; // Bounce back opposite!
    }

    iBallX = iBallX + iBallDirectionX;
    iBallY = iBallY + iBallDirectionY;
  
    drawBall();
})

function playWallBounceSound() {
    music.playTone(600, 30);
    basic.pause(150);
    music.playTone(450, 70);
}