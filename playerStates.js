function playerStates() {

    drawLabels();

    // if i am player 1

    if (me.role_keeper.role === 'player1') {

        // if its player 1's turn

        if (turnKeeper.getCurrentTurn() === 'player1') {

            p1Sprite.rotateTowards(p2Sprite, 0.1, 0);
            p2Sprite.rotation = 0;

            p1Sprite.collider = 'd';
            p2Sprite.collider = 'k';

            p1sharedX.x = round(p1Sprite.position.x, 2);
            p1sharedY.y = round(p1Sprite.position.y, 2);

            p1Sprite.draw = function () {

                image(images.raccoonHang, 0, 0, PLAYER_SIZE, PLAYER_SIZE);
            }

            p2Sprite.draw = function () {

                image(images.foxHold, 0, 0, PLAYER_SIZE + 8, PLAYER_SIZE + 8);

            }

        }

        // if its player 2's turn

        else if (turnKeeper.getCurrentTurn() === 'player2') {

            p2Sprite.rotateTowards(p1Sprite, 0.1, 0);
            p1Sprite.rotation = 0;

            p1Sprite.collider = 'k';
            p2Sprite.collider = 'k';

            p1Sprite.position.x = freezeStates.p1.x;
            p1Sprite.position.y = freezeStates.p1.y;

            p2Sprite.position.x = p2sharedX.x;
            p2Sprite.position.y = p2sharedY.y;

            p1Sprite.draw = function () {
                image(images.raccoonHold, 0, 0, PLAYER_SIZE + 8, PLAYER_SIZE + 8);
            }

            p2Sprite.draw = function () {
                image(images.foxHang, 0, 0, PLAYER_SIZE, PLAYER_SIZE);
            }

        }
    }

    // if i am player 2

    if (me.role_keeper.role === 'player2') {

        // if its player 2's turn

        if (turnKeeper.getCurrentTurn() === 'player2') {

            p2Sprite.rotateTowards(p1Sprite, 0.1, 0);
            p1Sprite.rotation = 0;

            p1Sprite.collider = 'k';
            p2Sprite.collider = 'd';

            p2sharedX.x = round(p2Sprite.position.x, 2);
            p2sharedY.y = round(p2Sprite.position.y, 2);

            p1Sprite.draw = function () {
                image(images.raccoonHold, 0, 0, PLAYER_SIZE + 8, PLAYER_SIZE + 8);
            }

            p2Sprite.draw = function () {
                image(images.foxHang, 0, 0, PLAYER_SIZE, PLAYER_SIZE);
            }

        }

        // if its player 1's turn

        else if (turnKeeper.getCurrentTurn() === 'player1') {

            p1Sprite.rotateTowards(p2Sprite, 0.1, 0);
            p2Sprite.rotation = 0;

            p1Sprite.collider = 'k';
            p2Sprite.collider = 'k';

            p2Sprite.position.x = freezeStates.p2.x;
            p2Sprite.position.y = freezeStates.p2.y;

            p1Sprite.position.x = p1sharedX.x;
            p1Sprite.position.y = p1sharedY.y;

            p1Sprite.draw = function () {
                image(images.raccoonHang, 0, 0, PLAYER_SIZE, PLAYER_SIZE);
            }

            p2Sprite.draw = function () {
                image(images.foxHold, 0, 0, PLAYER_SIZE + 8, PLAYER_SIZE + 8);
            }

        }
    }
}

function swapTurns() {

    if (me.role_keeper.role === 'player1' && turnKeeper.getCurrentTurn() === me.role_keeper.role && building.overlapping(p1Sprite) > 0) {

        p1Sprite.velocity.x = 0;
        p1Sprite.velocity.y = 0;

        freezeStates.p1.x = p1Sprite.position.x;
        freezeStates.p1.y = p1Sprite.position.y;

        shared.startTime = Date.now();

        turnKeeper.nextTurn();

        // return

    };

    if (me.role_keeper.role === 'player2' && turnKeeper.getCurrentTurn() === me.role_keeper.role && building.overlapping(p2Sprite) > 0) {

        p2Sprite.velocity.x = 0;
        p2Sprite.velocity.y = 0;

        freezeStates.p2.x = p2Sprite.position.x;
        freezeStates.p2.y = p2Sprite.position.y;

        shared.startTime = Date.now();

        turnKeeper.nextTurn();

        // return

    };
}

function drawLabels() {

    if (me.role_keeper.role === 'player1') {

        push();
        rectMode(CENTER);
        fill(0);
        rect(p1Sprite.position.x, p1Sprite.position.y - 52, 32, 16);
        rect(p2Sprite.position.x, p2Sprite.position.y - 52, 64, 16);
        pop()

        text('YOU', p1Sprite.position.x, p1Sprite.position.y - 48);
        text('PLAYER 2', p2Sprite.position.x, p2Sprite.position.y - 48);
    }

    if (me.role_keeper.role === 'player2') {

        push();
        rectMode(CENTER);
        fill(0);
        rect(p1Sprite.position.x, p1Sprite.position.y - 52, 64, 16);
        rect(p2Sprite.position.x, p2Sprite.position.y - 52, 32, 16);
        pop()

        text('PLAYER 1', p1Sprite.position.x, p1Sprite.position.y - 48);
        text('YOU', p2Sprite.position.x, p2Sprite.position.y - 48);
    }

};