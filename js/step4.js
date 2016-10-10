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

var animationCount;
var finalVector;
var count = 0;
function onMouseMove(event) {
  myPoint = event.point;
}

function onMouseDown(event) {
  finalVector = view.center - event.downPoint
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