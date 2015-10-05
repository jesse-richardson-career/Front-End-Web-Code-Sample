// ENUM for the button states
var optionStates = {
    TRIANGLE: 0,
    CIRCLE: 1,
    PAN: 2
};


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

   // keep track of the state ofwhat button is selected. Should maybe be broken out into a viewModel?
   var selectedOption = optionStates.TRIANGLE;

   function setOption(option) {
       selectedOption = option;
   }

    // Triangle object
    function Triangle() {
        this.x = 0;
        this.y = 0;
        this.fill = "#EE0000";
        this.drawShape = function(){
            ctx.fillStyle = this.fill;

            var path=new Path2D();
            path.moveTo(this.x,    this.y-25);
            path.lineTo(this.x+25, this.y+25);
            path.lineTo(this.x-25, this.y+25);
            ctx.fill(path);
        }
    }

    //Initialize a new Triangle, add it, and invalidate the canvas
    function addTriangle(x, y, fill) {
      var tri = new Triangle;
      tri.x = x;
      tri.y = y;
      tri.fill = fill;

      shapes.push(tri);
      invalidate();
    }

    // Triangle object
    function Circle() {
        this.x = 0;
        this.y = 0;
        this.fill = "#EE0000";
        this.drawShape = function(){
            ctx.fillStyle = this.fill;

            var path=new Path2D();
            path.arc(this.x, this.y, 25, 0, Math.PI*2, true); // Outer circle
            ctx.fill(path);
        }
    }

    //Initialize a new Circle, add it, and invalidate the canvas
    function addCircle(x, y, fill) {
      var cir = new Circle;
      cir.x = x;
      cir.y = y;
      cir.fill = fill;

      shapes.push(cir);
      invalidate();
    }

    // draw only ever does something if the canvas gets invalidated by our code
    function draw() {
        if (canvasValid == false) {
            clear(ctx);

            // draw all shapes
            var l = shapes.length;
            for (var i = 0; i < l; i++) {
                shapes[i].drawShape();
            }

            canvasValid = true;
        }
    }

    //wipes the canvas context
    function clear(c) {
        c.clearRect(0, 0, WIDTH, HEIGHT);
    }

    // adds a new node
    function myClick(e) {
        getMouse(e);

        if(selectedOption == optionStates.TRIANGLE) {
            addTriangle(mx, my, randHexColor());
        }
        else if (selectedOption == optionStates.CIRCLE) {
            addCircle(mx, my, randHexColor());
        }
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
        setOption: setOption
    };

})();

$(function() {
    canvasShapes.init();

    //events handlers
    $("#triangleButton").click(function(){canvasShapes.setOption(optionStates.TRIANGLE)});
    $("#circleButton").click(function(){canvasShapes.setOption(optionStates.CIRCLE)});
    $("#panButton").click(function(){canvasShapes.setOption(optionStates.PAN)});

});
