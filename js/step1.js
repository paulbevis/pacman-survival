// Create a Paper.js Path to draw a line into it:
var line, myPoint;
line = new Path(view.center)
line.strokeColor = 'lightGray';
line.strokeWidth = 7;
line.strokeCap = 'round'

function onMouseMove(event) {
  myPoint = event.point;
}

function onFrame(event) {
  line.removeSegment(1);
  if (myPoint) {
    var vector = view.center - myPoint
    vector.length = 250;
    line.lineTo(view.center - vector);
  }
}