function controlSecurity() {

  if (me.role_keeper.role === 'player1') {

    for (let i = 0; i < security.length; i++) {

      // check if the guard should start waiting to change direction
      if ((guardShared[i].x >= guardShared[i].finalX && guardShared[i].direction == 1) || (guardShared[i].x <= guardShared[i].initialX && guardShared[i].direction == -1)) {

        if (!guardShared[i].waitingSince) {  // set a timer waitingSince 
          guardShared[i].waitingSince = shared.startTime;
        }

        // wait for one second
        if (shared.startTime - guardShared[i].waitingSince >= 1000) {
          guardShared[i].direction *= -1; // change direction
          guardShared[i].waitingSince = 0; // reset waitingSince
        }

      }

      // check if guard detected player and start a timer

      if (guardOverlap(i)) {
        guardShared[i].detected = true;
        if (!guardShared[i].waitingSince) {  // set a timer for guard to wait
          guardShared[i].waitingSince = shared.startTime;
        }
      }

      // continue walking if not overlapping for over 2 seconds
      if (shared.startTime - guardShared[i].waitingSince >= 4000 && guardShared[i].detected && !guardOverlap(i)) {
        guardShared[i].waitingSince = 0; // reset waitingSince
        guardShared[i].detected = false; // reset detected to false
      }

      //  call caught function if overlapping for over 3 seconds
      if ((shared.startTime - guardShared[i].waitingSince >= 3000) && guardShared[i].detected && guardOverlap(i)) {

        caught();
        // guardShared[i].detected = false; // reset detected to false
      }

      // move only if guard is not waiting or if the guard has not detected anything
      else if (guardShared[i].waitingSince == 0 && !guardShared[i].detected) {
        guardShared[i].x += guardSpeed * guardShared[i].direction;
      }
    }
  }

  // draw detection colliders

  for (let i = 0; i < security.length; i++) {

    // remove existing colliders before adding new ones
    security[i].removeColliders();

    // add colliders based on the guard's direction
    if (guardShared[i].direction == 1) {
      security[i].draw = function () {
        image(images.flash, 119, -8);
        if (frameNo == 0) {
          image(images.dogWalk1, 0, 0, PLAYER_SIZE + 10, PLAYER_SIZE + 10);
        } else {
          image(images.dogWalk2, 0, 0, PLAYER_SIZE + 10, PLAYER_SIZE + 10);
        }
      }
      security[i].addCollider(0, 0, 48, 48);
      security[i].addCollider(150, 0, 200); // torch to the right of the guard
      security[i].addSensor(150, 0, 200); // sensor to the right of the guard
    } if (guardShared[i].direction == -1) {
      security[i].draw = function () {
        image(images.flashBack, -119, -8);
        if (frameNo == 0) {
          image(images.dogWalkBack1, 0, 0, PLAYER_SIZE + 10, PLAYER_SIZE + 10);
        } else {
          image(images.dogWalkBack2, 0, 0, PLAYER_SIZE + 10, PLAYER_SIZE + 10);
        }
      }
      security[i].addCollider(0, 0, 48, 48);
      security[i].addCollider(-150, 0, 200); // torch to the left of the guard
      security[i].addSensor(-150, 0, 200); // sensor to the left of the guard
    }

    if (guardShared[i].waitingSince > 0) {
      security[i].draw = function () {
        if (guardShared[i].direction == 1) {
          image(images.flash, 119, -8);
          image(images.dogWalk2, 0, 0, PLAYER_SIZE + 10, PLAYER_SIZE + 10);
        } else if (guardShared[i].direction == -1) {
          image(images.flashBack, -119, -8);
          image(images.dogWalkBack2, 0, 0, PLAYER_SIZE + 10, PLAYER_SIZE + 10);
        }
      }
    }

    // show reaction
    if (guardShared[i].detected) {
      security[i].draw = function () {
        // draw an exclamation mark
        push()
        fill('red');
        rect(0, -50, 5, 10)
        rect(0, -36, 5, 5)
        pop()
        security[i].addCollider(0, -70, 30)
        if (guardShared[i].direction == 1) {
          image(images.flash, 119, -8);
          image(images.dogWalk2, 0, 0, PLAYER_SIZE + 10, PLAYER_SIZE + 10);
        } else if (guardShared[i].direction == -1) {
          image(images.flashBack, -119, -8);
          image(images.dogWalkBack2, 0, 0, PLAYER_SIZE + 10, PLAYER_SIZE + 10);
        }
      }
    }

    security[i].position.x = guardShared[i].x;
    security[i].position.y = guardShared[i].y;

  }

}

function caught() {
  shared.gameState = "end";
}

function guardOverlap(i) {
  return security[i].overlaps(p1Sprite) || security[i].overlaps(p2Sprite);
}