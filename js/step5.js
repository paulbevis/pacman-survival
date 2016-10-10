// Create a Paper.js Path to draw a line into it:
var line, myPoint;
line = new Path(view.center)
line.strokeColor = 'lightGray';
line.strokeWidth = 7;
line.strokeCap = 'round'

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

var finalVector;
var count = 0;


var topGhost = createGhost(90, 'red');
var rightGhost = createGhost(210, 'blue');
var leftGhost = createGhost(330, 'blue');



function onMouseMove(event) {
  myPoint = event.point;
}

function onMouseDown(event) {
  finalVector = view.center - event.downPoint
}




function createGhost(angle, colour){
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

  var ghost =   new Group([ghostBody, leftEye, rightEye]);
  var vector = view.center -ghost.position
  vector.angle =angle;
  vector.length=250;
  ghost.position=view.center - vector;
  return ghost
}













function onFrame(event) {

  if (!finalVector) {
    line.removeSegment(1);
    if (myPoint) {
      var vector = view.center - myPoint
      vector.length = 250;
      line.lineTo(view.center - vector);
    }
  } else {
    count++;
    var moveVector = view.center -pacman.position
    console.log(moveVector.length)
    if (moveVector.length < 250 && (event.count % 3 ) === 0) {
      pacman.position -= finalVector / 250;
    }
  }
}