let stretchColor, stretchWidth;

function drawConnector() {
    stretchColor = map(dist(p2Sprite.position.x, p2Sprite.position.y, p1Sprite.position.x, p1Sprite.position.y), 0, 300, 0, 255);
    stretchWidth = map(dist(p2Sprite.position.x, p2Sprite.position.y, p1Sprite.position.x, p1Sprite.position.y), 0, 300, 6, 0.5);
  
    joint.draw = function () {
      push()
      stroke(stretchColor, 0, 0);
      strokeWeight(stretchWidth);
      line(p2Sprite.position.x, p2Sprite.position.y, p1Sprite.position.x, p1Sprite.position.y);
      pop()
    }
}