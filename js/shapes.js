var canvasShapes = (function(){

    var canvas;
    var ctx;
    var WIDTH;
    var HEIGHT;
    var INTERVAL = 20;  // how often, in milliseconds, we check to see if a redraw is needed
    var shapes = [];    // holds all of our shapes

    var mx, my; // mouse coordinates

    // when set to true, the canvas will redraw everything
    // invalidate() just sets this to false right now
    // we want to call invalidate() whenever we make a change
   var canvasValid = false;


    // Triangle object
    function Triangle() {
        this.x = 0;
        this.y = 0;
        // default size
        this.w = 1;
        this.h = 1;
        this.fill = "#EE0000";
    }

    //Initialize a new Triangle, add it, and invalidate the canvas
    function addTriangle(x, y, w, h, fill) {
      var tri = new Triangle;
      tri.x = x;
      tri.y = y;
      tri.w = w
      tri.h = h;
      tri.fill = fill;

      shapes.push(tri);
      invalidate();
    }

    // draw only ever does something if the canvas gets invalidated by our code
    function draw() {
        if (canvasValid == false) {
            clear(ctx);

            // draw all shapes
            var l = shapes.length;
            for (var i = 0; i < l; i++) {
                drawshape(ctx, shapes[i], shapes[i].fill);
            }

            canvasValid = true;
        }
    }

    //wipes the canvas context
    function clear(c) {
        c.clearRect(0, 0, WIDTH, HEIGHT);
    }

    // Draws a single shape to a single context
    function drawshape(context, shape, fill) {
        context.fillStyle = fill;

        // We can skip the drawing of elements that have moved off the screen:
        if (shape.x > WIDTH || shape.y > HEIGHT) return;
        if (shape.x + shape.w < 0 || shape.y + shape.h < 0) return;

        context.fillRect(shape.x,shape.y,shape.w,shape.h);
    }

    // adds a new node
    function myClick(e) {
        getMouse(e);
        // for this method width and height determine the starting X and Y, too.
        // so I left them as vars in case someone wanted to make them args for something and copy this code
        var width = 20;
        var height = 20;
        addTriangle(mx - (width / 2), my - (height / 2), width, height, randHexColor());
    }

    function invalidate() {
        canvasValid = false;
    }

    // Sets mx,my to the mouse position relative to the canvas
    function getMouse(e) {
        var element = canvas, offsetX = 0, offsetY = 0;

        if (element.offsetParent) {
            do {
                offsetX += element.offsetLeft;
                offsetY += element.offsetTop;
            } while ((element = element.offsetParent));
        }

        mx = e.pageX - offsetX;
        my = e.pageY - offsetY
    }

    function randHexColor () {
        return '#'+Math.floor(Math.random()*16777215).toString(16);
    }

    // initialize our canvas, set draw loop, then add everything we want to intially exist on the canvas
    function init() {
      canvas = document.getElementById('canvas');
      HEIGHT = canvas.height;
      WIDTH = canvas.width;
      ctx = canvas.getContext('2d');

      //fixes a problem where double clicking causes text to get selected on the canvas
      canvas.onselectstart = function () { return false; }

      // make draw() fire every INTERVAL milliseconds.
      setInterval(draw, INTERVAL);

      // add our events
      //canvas.onmousedown = myDown;
      //canvas.onmouseup = myUp;
      canvas.onclick = myClick;

      // add a smaller blue circle
      //addCircle(25, 90, 25, 25, '#2BB8FF');
    }

    return {
        init: init,
        addTriangle: addTriangle
    };

})();


$(function() {
    canvasShapes.init();
});


//events handlers
//$("#triangleButton").click(graphicsShapes.drawTriangle());

//$("#circleButton").click(graphicsShapes.drawCircle());
