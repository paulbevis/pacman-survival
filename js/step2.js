var vector1 = view.center - new Point(view.center.x+50, view.center.y)
var northEast = new Point(view.center.x + 43.3, view.center.y - 25);
var through = new Point(view.center.x - 43.3, view.center.y + 25);
var southEast = new Point(view.center.x + 43.3, view.center.y + 25);

var arc = Path.Arc(northEast, through, southEast)
arc.strokeColor = 'black'
arc.fillColor = 'yellow'
arc.strokeWidth = 2;
arc.lineTo(view.center);
arc.lineTo(northEast);

var eye = new Path.Circle(new Point(view.center.x+15, view.center.y-28), 7)
eye.fillColor = 'black'

var pacman = new Group([arc, eye])

console.log('pacman ',pacman)