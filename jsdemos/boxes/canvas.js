// bind the canvas element to a JS variable
var mainCanvas = document.getElementById("myCanvas");
var context = mainCanvas.getContext("2d");

// Mouse pos globals
var mX = 0;
var mY = 0;

// Object definitions
function Card(x,y,width,height,headerText){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.headerText = headerText;
    this.opacity = 0;
    this.held = false;

    this.draw = function(){

        if (this.opacity < 1){
            this.opacity += 0.1;
        }

        context.beginPath();

        // Heading
        context.font = "20px Arial";
        context.fillStyle = 'rgba(0, 0, 0, ' + this.opacity + ')';
        context.fillText(this.headerText, this.x + 40, this.y + 35);

        // Corner 1 (Top left)
        context.arc(this.x + 10, this.y + 10, 10, 1*Math.PI, 1.5 * Math.PI);

        // Top line
        context.moveTo(this.x + 10, this.y);
        context.lineTo(this.x + this.width - 10, this.y);

        // Corner 2 (Top right)
        context.arc(this.x + this.width - 10, this.y + 10, 10, 1.5 * Math.PI, 0);

        // Right line
        context.moveTo(this.x + this.width, this.y + 10);
        context.lineTo(this.x + this.width, this.y + this.height - 10);

        // Corner 3 (Bottom right)
        context.arc(this.x + this.width - 10, this.y + this.height - 10, 10, 0, 0.5 * Math.PI);

        // Bottom line
        context.moveTo(this.x + this.width - 10, this.y + this.height);
        context.lineTo(this.x + 10, this.y + this.height);

        // Corner 4 (Bottom left)
        context.arc(this.x + 10, this.y + this.height - 10, 10, 0.5 * Math.PI, 1 * Math.PI);

        // Left line
        context.moveTo(this.x, this.y + this.height - 10);
        context.lineTo(this.x, this.y + 10);

        context.strokeStyle = 'rgba(0, 0, 0, ' + this.opacity + ')';
        context.stroke();

        context.closePath();
    }

    this.moveBox = function(x,y){
        this.x = x;
        this.y = y;
    }

    this.resizeX = function(x){
        this.width = x;
    }

    this.resizeY = function(y){
        this.height = y;
    }

}

// Object construction
var boxes = [
    new Card(25,25,200,300,"Title"),
    new Card(400,400,400,100,"Another One"),
    new Card(200,200,400,200,"Lame")
]

// Listener events
function returnDraw(value){
    value.draw();
    if (value.held == true){
        value.moveBox(mX,mY);
    }
}

function checkClick(value){
    if (mX > value.x && mX < value.x + value.width && mY > value.y && mY < value.y + value.height){
        value.held = true;
    }
}

function clickTest(){
    boxes.forEach(checkClick);
}

function setHold(value){
    value.held = false;
}

function resetHold(){
    boxes.forEach(setHold);
}

function setMXY(){
    mX = event.pageX;
    mY = event.pageY;
}

// Listener declarations
document.getElementById("myCanvas").addEventListener("mousedown", clickTest);
document.getElementById("myCanvas").addEventListener("mouseup", resetHold);
document.getElementById("myCanvas").addEventListener("mousemove", setMXY);

// Draw function
function draw(){

    // Set the canvas size to the new window size

    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;

    // Clear the canvas ready for drawing a new frame

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    // FRAME COMPOSITION GOES BELOW:

    boxes.forEach(returnDraw);

    requestAnimationFrame(draw);

}

// Start animating elements
draw();