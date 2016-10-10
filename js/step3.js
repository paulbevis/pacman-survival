var ghostBody = Path.Arc(new Point(200, 200), new Point(225, 180), new Point(250, 200));
ghostBody.strokeColor = 'black';
ghostBody.fillColor = 'red';
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

var ghost1 = new Group([ghostBody, leftEye, rightEye]);