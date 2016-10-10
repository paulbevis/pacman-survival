var topGhost = createGhost(90, 'red');
var rightGhost = createGhost(210, 'blue');
var leftGhost = createGhost(330, 'blue');

// Create a Paper.js Path to draw a line into it:
var line, myPoint;
line = new Path(view.center)
line.strokeColor = 'lightGray';
line.strokeWidth = 7;
line.strokeCap = 'round';
// line.dashArray = [10, 20];

var vector1 = view.center - new Point(view.center.x + 50, view.center.y)
var northEast = new Point(view.center.x + 43.3, view.center.y - 25);
var through = new Point(view.center.x - 43.3, view.center.y + 25);
var southEast = new Point(view.center.x + 43.3, view.center.y + 25);

var arc = Path.Arc(northEast, through, southEast)
arc.strokeColor = 'black'
arc.fillColor = 'yellow'
arc.strokeWidth = 2;
arc.lineTo(view.center);
arc.lineTo(northEast);

var eye = new Path.Circle(new Point(view.center.x + 15, view.center.y - 28), 7)
eye.fillColor = 'black'

var pacman = new Group([arc, eye])

pacman.scale(0.5)


var degreesDisplay = new PointText({
  point: new Point(50, 50),
  justification: 'center',
  fontSize: 20
});

var distanceCompleted = new PointText({
  point: new Point(100, 50),
  justification: 'left',
  fontSize: 15
});

var finalVector;
var pacmanVector;


function createGhost(angle, colour) {
  var ghostBody = Path.Arc(new Point(200, 200), new Point(225, 180), new Point(250, 200));
  ghostBody.strokeColor = 'black';
  ghostBody.fillColor = colour;
  ghostBody.strokeWidth = 2;


  ghostBody.lineTo(new Point(250, 230));


  ghostBody.curveTo(new Point(245, 235), new Point(240, 230));
  ghostBody.curveTo(new Point(235, 225), new Point(230, 230));
  ghostBody.curveTo(new Point(225, 235), new Point(220, 230));
  ghostBody.curveTo(new Point(215, 225), new Point(210, 230));
  ghostBody.curveTo(new Point(205, 235), new Point(200, 230));
  ghostBody.lineTo(new Point(200, 200));

  var leftEye = new Path.Circle(new Point(215, 200), 5);
  leftEye.fillColor = 'blue';
  leftEye.strokeColor = 'white';
  leftEye.strokeWidth = 4;

  var rightEye = new Path.Circle(new Point(235, 200), 5);
  rightEye.fillColor = 'blue';
  rightEye.strokeColor = 'white';
  rightEye.strokeWidth = 4;

  var mouth = new Path();
  mouth.moveTo(new Point(215, 215))
  mouth.curveTo(new Point(225, 218), new Point(235, 215));
  mouth.strokeColor = colour;
  mouth.strokeWidth = 3;

  var ghost = new Group([ghostBody, leftEye, rightEye, mouth]);
  var vector = view.center - ghost.position
  vector.angle = angle;
  vector.length = 250;
  ghost.position = view.center - vector;
  return ghost
}

var pacmanCaught = false;
var pacmanSafe = false;
var dissolve = 1.0
var rotation = 360;
var startMovementTime;

function getGhostSpeed(startTime, elapsedSeconds, ghostHobbled) {
  var seconds = Math.floor(elapsedSeconds - startTime);

  switch (seconds) {
    case 0:
      return 4 / 6;
    case 1:
      return 4 / 6;
    case 2:
      return 8 / 6;
    case 3:
      return ghostHobbled ? 10 / 6 : 12 / 6;
    case 4:
      return ghostHobbled ? 10 / 6 : 16 / 6;
    case 5:
      return ghostHobbled ? 10 / 6 : 20 / 6;
    case 6:
      return ghostHobbled ? 10 / 6 : 24 / 6;
    default:
      return 1;
  }

}

function updateGhostMovement(startMovementTime, event, ghost, hobbled) {
  var ghostVector = (pacman.position - ghost.position ) / (pacman.position - ghost.position ).length
  ghostVector.length = pacmanVector.length * getGhostSpeed(startMovementTime, event.time, true);
  ghost.position += ghostVector;
}

function onMouseMove(event) {
  if (!finalVector) {
    myPoint = event.point;
    var degrees = Math.round((view.center - myPoint).angle);
    if (degrees < 0) {
      degrees = 180 + (180 + degrees);
    }
    degreesDisplay.content = degrees + "\u00B0";
  }
}

function onMouseDown(event) {
  finalVector = view.center - event.downPoint
  finalVector.length = 250;
  pacmanVector = finalVector / 182;
}

function isPacmanCaught() {
  return (pacman.intersects(topGhost) || pacman.intersects(rightGhost) || pacman.intersects(leftGhost));
}

function onFrame(event) {

  if (!finalVector) {
    startMovementTime = event.time;
    line.removeSegment(1);
    if (myPoint) {
      var vector = view.center - myPoint
      vector.length = 250;
      line.lineTo(view.center - vector);
    }
  } else {
    if (!pacmanCaught) {
      var pacmanMoveVector = view.center - pacman.position;
      distanceCompleted.content = 'Distance completed: '+Math.round(pacmanMoveVector.length);
      if (pacmanMoveVector.length < 250 && (event.count % 1 ) === 0) {
        pacman.position -= pacmanVector;
        // var vector = myPoint - pacman.position
        // vector.length -= pacman;
        line.removeSegments(0, 1)
        line.moveTo(pacman.position);
        var vector = view.center - myPoint
        vector.length = 250;
        line.lineTo(view.center - vector);

      } else {
        pacmanSafe = true
      }
      if (!pacmanSafe) {
        updateGhostMovement(startMovementTime, event, topGhost, true);
        updateGhostMovement(startMovementTime, event, rightGhost, false);
        updateGhostMovement(startMovementTime, event, leftGhost, false);

        if (isPacmanCaught()) {
          pacmanCaught = true;
        }
      } else {
        //dissolve ghosts
        if (dissolve !== 0.0 && (event.count % 7 ) === 0) {
          playerDies(topGhost, dissolve, rotation)
          playerDies(rightGhost, dissolve, rotation)
          playerDies(leftGhost, dissolve, rotation)
          dissolve -= 0.01;
          rotation += 8;
        }

      }
    } else {
      if (dissolve !== 0.0 && (event.count % 8 ) === 0) {
        playerDies(pacman, dissolve, rotation);
        dissolve -= 0.01;
        rotation += 8;
      }
      topGhost.children[0].fillColor.hue += 4;
      rightGhost.children[0].fillColor.hue += 4;
      leftGhost.children[0].fillColor.hue += 4;
    }
  }
}

function playerDies(ghost, dissolve, rotation) {
  ghost.scale(dissolve);
  ghost.rotate(rotation);
}
