let iPaddleX = 1
let iPaddleY = 4
let iPaddleWidth = 2
let iBallX = 2
let iBallY = 0
let iBallDirectionX = 1;
let iBallDirectionY = 1;

drawPaddle()
drawBall()

// Move paddle to the left when button A is clicked:
input.onButtonPressed(Button.A, function () {
    if (iPaddleX > 0) {
        iPaddleX += -1
    } else {
        // Don't fall off the left edge of the world!
        iPaddleX = 0
    }
    drawPaddle()
})

// Move paddle to the right when button B is clicked:
input.onButtonPressed(Button.B, function () {
    if (iPaddleX < 3) {
        iPaddleX += 1
    } else {
        // Don't fall off the right edge of the world!
        iPaddleX = 3
    }
    drawPaddle()
})

function drawPaddle() {
    // Unplot bottom row before drawing paddle so that no trail is left behind:
    for (let x = 0; x <= 4; x++) {
        led.unplot(x, 4)
    }
    for (let i = 0; i < iPaddleWidth; i++) {
        led.plot(iPaddleX + i, iPaddleY)
    }
}

function drawBall() {
    led.plot(iBallX, iBallY)
}

basic.forever(function() {
    basic.pause(100)
    
    led.unplot(iBallX, iBallY)

    // Move ball in the X and Y directions
    iBallX = iBallX + iBallDirectionX
    iBallY = iBallY + iBallDirectionY

    // If we hit the right wall, bounce back!
    if (iBallX > 4) {
        playWallBounceSound();
        iBallX = 4;
        if (Math.randomRange(1, 5) > 1) {
            // Normal (4 in 5) case: bounce back opposite!
            iBallDirectionX *= -1;
        } else {
            // This is the rare (1 in 5) case: stick to the wall!
            iBallDirectionX = 0;
            iBallDirectionY *= -1;
        }
    }

    // If we hit the left wall, bounce back!
    if (iBallX < 0) {
        playWallBounceSound();
        iBallX = 0;
        if (Math.randomRange(1, 5) > 1) {
            // Normal (4 in 5) case: bounce back opposite!
            iBallDirectionX *= -1;
        } else {
            // This is the rare (1 in 5) case: stick to the wall!
            iBallDirectionX = 0;
            iBallDirectionY *= -1;
        }
    }

    // If we hit the bottom wall, bounce back!
    if (iBallY > 4) {
        playWallBounceSound();
        iBallY = 4;
        if (Math.randomRange(1, 5) > 1) {
            // Normal (4 in 5) case: bounce back opposite!
            iBallDirectionY *= -1;
        } else {
            // This is the rare (1 in 5) case: stick to the wall!
            iBallDirectionY = 0;
            iBallDirectionX *= -1;
        }
    }

    // If we hit the top wall, bounce back!
    if (iBallY < 0) {
        playWallBounceSound();
        iBallY = 0;
        if (Math.randomRange(1, 5) > 1) {
            // Normal (4 in 5) case: bounce back opposite!
            iBallDirectionY *= -1;
        } else {
            // This is the rare (1 in 5) case: stick to the wall!
            iBallDirectionY = 0;
            iBallDirectionX *= -1;
        }
    }
  
    drawBall()
})

function playWallBounceSound() {
    music.playTone(400, 30)
    basic.pause(10)
    music.playTone(300, 70)
}