function handleGameState() {
    if (shared.gameState === "intro") {
        drawIntroScreen();
    }
    if (shared.gameState === "playing") {
        drawPlayScreen();
    }
    if (shared.gameState === "end") {
        drawEndScreen();
    }
}

function drawIntroScreen() {
    p1Sprite.draw = function () { }
    p2Sprite.draw = function () { }
    for (let i = 0; i < security.length; i++) {
        security[i].draw = function () { };
    }
    image(images.backdrop, -25, 0, 1050, 1050);

    push()
    textSize(48);
    let oscillation = Math.sin(frameCount / 10) * 5;
    text("Press Space to Start", width / 2, (height / 2 + 40) + oscillation);
    pop();

    if (kb.presses('space')) shared.gameState = "playing";
}

function drawPlayScreen() {
    drawConnector();

    playerStates();

    controlSwing();

    if (kb.presses('space')) {
        swapTurns();
    };

    controlSecurity();

    push()
    textSize(24);
    fill('#668A9D')
    text("PRESS SPACE TO SWAP", camera.x - width / 2 + 150, camera.y + 40 - height / 2);
    text("USE ARROWS TO SWING", camera.x + width / 2 - 150, camera.y + 40 - height / 2);
    pop();
}

function drawEndScreen() {
    drawConnector();
    playerStates();
    controlSecurity();

    console.log('caught');
    camera.zoomTo(1.5)

    push();
    rectMode(CENTER);
    fill(0);
    rect(camera.x, camera.y + 24 + 200, width - 524, 60);
    pop()

    push()
    textSize(48);
    text("YOU'VE BEEN CAUGHT!", camera.x, camera.y + 40 + 200);
    pop();

    setTimeout(function () {
        noLoop();
    }, 1000);
}