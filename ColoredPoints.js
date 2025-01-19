// ColoredPoints.js
// Vertex shader program
var VSHADER_SOURCE = `

    attribute vec4 a_Position;
    uniform float u_size;
    void main() {
        gl_Position = a_Position;
        gl_PointSize = u_size;
       //gl_PointSize = 20.0;
    }`

// Fragment shader program
var FSHADER_SOURCE = `
    
    precision mediump float;
    uniform vec4 u_FragColor;
    void main(){
        gl_FragColor = u_FragColor;
    }`

//Global Variables for webgl, glsl,rendering shapes

let canvas;
let gl;
let a_Position;
let u_FragColor;
let u_size;

function setupWebGL(){

    // Retrieve <canvas> element
    canvas = document.getElementById('webgl'); //Start of webgl
  
    // Get the rendering context for WebGL
    // gl = getWebGLContext(canvas);

    gl = canvas.getContext("webgl", { preserveDrawingBuffer: "true"});

    if (!gl) {
      console.log('Failed to get the rendering context for WebGL');
      return;
    } //End of webgl


}

function connectVariablesToGLSL(){
    // Initialize shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to intialize shaders.');
        return;
      }
    
      // // Get the storage location of a_Position
      a_Position = gl.getAttribLocation(gl.program, 'a_Position');
      if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return;
      }
    
      // Get the storage location of u_FragColor
      u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
      if (!u_FragColor) {
        console.log('Failed to get the storage location of u_FragColor');
        return;
      }

      u_size = gl.getUniformLocation(gl.program, 'u_size');
      if (!u_size) {
        console.log('Failed to get the storage location of u_size');
        return;
      }
}


const POINT = 0;

const TRIANGLE = 1;

const CIRCLE = 2;

//Global variables for UI elements

let g_selectedColor = [1.0, 1.0, 1.0, 1.0];

let g_selected_size = 5;

let g_selectedType=POINT;

let circleSegments = 3;

function addActionsForHtmlUI(){

    document.getElementById("red").onclick = function() { g_selectedColor = [1.0, 0.0, 0.0, 1.0]; };
    document.getElementById("green").onclick = function() { g_selectedColor = [0.0, 1.0, 0.0, 1.0]; };
    document.getElementById("clear").onclick = function() { g_shapesList = []; renderAllShapes();};

    document.getElementById("pointbutton").onclick = function() {g_selectedType = POINT};
    document.getElementById("trianglebutton").onclick = function() {g_selectedType = TRIANGLE};
    document.getElementById("circlebutton").onclick = function() {g_selectedType = CIRCLE};


    document.getElementById("redSlider").addEventListener("mouseup", function(){g_selectedColor[0] = this.value/100; });
    document.getElementById("greenSlider").addEventListener("mouseup", function(){g_selectedColor[1] = this.value/100; });
    document.getElementById("blueSlider").addEventListener("mouseup", function(){g_selectedColor[2] = this.value/100; });

    document.getElementById("sizeSlider").addEventListener("mouseup", function(){g_selected_size = this.value; });

    document.getElementById("segSlider").addEventListener("mouseup", function(){circleSegments = parseInt(this.value)});


}


function drawCatWithTriangles() {
    let vertices = [
    // Left Ear
        -0.7, 0.583,   //Top
        -0.6, 0.2, //Right side
        -0.1, 0.2, //Left side


    // Right Ear
        0.7, 0.583,   //Top
        0.6, 0.2, //Right side
        0.1, 0.2, //Left side


    //Face

    // Upper Face (perhaps between the ears)
        -0.4, 0.3,  // Top left
        0.4, 0.3,   // Top right
        0.0, 0.0,   // Bottom center (adjusted for centering the face)

    // Lower Face (below the upper face, forming the main part of the face)
        -0.6, 0.2,  // Bottom left
        0.6, 0.2,   // Bottom right
        0.0, -0.3,  // Chin (center bottom)

    // Left whisker
        -0.7, -0.2,
        -0.3,0.2,
        0.0,-0.3,

    //Right Whisker
        0.7, -0.2,
        0.3,0.2,
        0.0,-0.3,

    
    //Bottome right side again
        
        0, -0.6,
        0.7, -0.2,
        0, -0.3,

    //Bottom left side again

        0, -0.6,
        -0.7, -0.2,
        0, -0.3,

    //Connecting left bottom

        -0.6, -0.2,
        0, -0.6,
        0, -0.3,

    //Connnecting right bottom
        
        0.6, -0.2,
        0, -0.6,
        0, -0.3,

    //Whiskers

        0.3, -0.1,
        0.7, -0.1,
        0.7, 0
    

    ];
    
    let orange = [1.0, 0.5, 0.0, 1.0]

    drawTriangle2(vertices, orange);  // Assume drawTriangle can handle these points
}

function drawWhiskers(){

    let vertices = [

        //Right whiskers

        0.3, -0.1,
        0.7, -0.1,
        0.7, 0.0,

        0.7, -0.4,
        0.3, -0.1,
        0.76, -0.3,

        0.3,-0.1,
        0.6,-0.5,
        0.5,-0.6,

        //Left whiskers

        -0.3, -0.1,
        -0.7, -0.1,
        -0.7, 0.0,

        -0.7, -0.4,
        -0.3, -0.1,
        -0.76, -0.3,

        -0.3,-0.1,
        -0.6,-0.5,
        -0.5,-0.6,

            
    ];

    let black = [0.0,0.0,0.0,0.0];

    drawTriangle2(vertices, black);



}

document.getElementById('image').addEventListener('click', function() {
    drawCatWithTriangles();
});

document.getElementById('image').addEventListener('click', function() {
    drawWhiskers();
});

document.getElementById('close').onclick = function() { g_shapesList = []; renderAllShapes();};

function drawEyes(){

    let vertices = [

    //Right eye

    0.1, 0.1,
    0.2, 0.1,
    0.1, 0.0,

    0.1,0.0,
    0.2,0.0,
    0.2,0.1,

    //Left eye

    -0.1, 0.1,
    -0.2, 0.1,
    -0.1, 0.0,

    -0.1,0.0,
    -0.2,0.0,
    -0.2,0.1,

    //Nose

    0.0,-0.1,
    -0.1,-0.2,
    0.1,-0.2,

    0.0,-0.3,
    -0.1,-0.2,
    0.1,-0.2,



    ]

    let black = [0.0,0.0,0.0,1.0];

    drawTriangle2(vertices, black);


};

document.getElementById('image').addEventListener('click', function() {
    drawEyes();
});



function main() {

    setupWebGL(); //Setting up Canvas and GL elements

    connectVariablesToGLSL(); //Setting up GLSL shaders and connect to GLSL variables

    addActionsForHtmlUI(); //Actions for HTML UI
  
    // Register function (event handler) to be called on a mouse press
    canvas.onmousedown = click;

    canvas.onmousemove = function(ev) {if(ev.buttons == 1){click(ev) } };
  
    // Specify the color for clearing <canvas>
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
  
    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

}

var g_shapesList = [];

function click(ev) {

    let [x,y] = convertCoordinatesEventToGl(ev);
    
    let point;

    if (g_selectedType == POINT){
        point = new Point();
    } else if (g_selectedType == TRIANGLE){

        point = new Triangle();
    } else {

        point = new Circle(circleSegments);
        console.log("Here is segments for circle:" ,circleSegments);
    }

    point.position=[x,y];

    point.color=g_selectedColor.slice();
    point.size=g_selected_size;
    g_shapesList.push(point);

    renderAllShapes();

}


function convertCoordinatesEventToGl(ev){


    var x = ev.clientX; // x coordinate of a mouse pointer

    var y = ev.clientY; // y coordinate of a mouse pointer

    var rect = ev.target.getBoundingClientRect();
  
    x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
    
    y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

    return ([x,y]);
}
  

function renderAllShapes(){

    //Time at start of function

    var startTime = performance.now();

    //Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    var len = g_shapesList.length;

    for(var i = 0; i < len; i++){

        g_shapesList[i].render();


    }

    var duration = performance.now() - startTime;

    sendingToHTML("numdot: " + len + " ms: " + Math.floor(duration) + " fps: " + Math.floor(10000/duration)/10, "numdot");


}

function sendingToHTML(text, HTMLID){

    var HTMLEL = document.getElementById(HTMLID);

    if(!HTMLEL) {

        console.log("Failed to get " + HTMLID + " from HTML");
        return;
    } 

    // HTMLEL.innerHTML= text;


}


  