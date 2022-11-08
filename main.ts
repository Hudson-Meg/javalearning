input.onButtonPressed(Button.A, function () {
    //basic.showString("Grandma Tami is nice");
});

input.onButtonPressed(Button.B, function () {
    //basic.showString("Karens are mean");
});

let x = 0;

basic.forever(function () {
    x = x + 1;
    basic.showString("x = " + x);
});
