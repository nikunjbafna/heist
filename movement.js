function controlSwing() {
  if (me.role_keeper.role === 'player2' && turnKeeper.getCurrentTurn() === me.role_keeper.role) {
    if (kb.presses('left')) p2Sprite.velocity.x = -spd;
    else if (kb.presses('right')) p2Sprite.velocity.x = spd;

  }

  if (me.role_keeper.role === 'player1' && turnKeeper.getCurrentTurn() === me.role_keeper.role) {
    if (kb.presses('left')) p1Sprite.velocity.x = -spd;
    else if (kb.presses('right')) p1Sprite.velocity.x = spd;

  }
}