import {vertexShaderText} from "./shaders"
import {fragmentShaderText} from "./shaders"

import {GSquare} from "./GSquare";

var gl:any; // gl context
var canvas:any; // DOM object
export var screen = {
   x:300,
   y:200,
   ratio: 1/1
}; // screen properties (TODO: create class)
export var tile = {
   numX: 20,
   numY: 20,
   width: 0,
   height: 0
};

//Shaders
var vertexShader:any;
var fragmentShader:any;

//GL program
var program:any;

//Data sent to GPU
export var VertexData:number[] = [];
export var IndexData:number[] = [];
export var numRects:number = 0;

var main = function()
{
   screen.ratio = screen.x / screen.y;
   canvas = document.getElementById('glcanvas');
   gl = canvas.getContext('webgl');
   resizeCanvas();

   gl.viewport(0,0,screen.x, screen.y);

   if(!gl)
   {
      console.log('WebGL not supported, using experimental-webgl');
      gl - canvas.getContext('experimental-webgl');
   }
   if(!gl)
   {
      alert('Your browser does not support WebGL');
      return;
   }
   console.log('Initilized WebGL');

   gl.clearColor(0.75, 0.85, 0.8, 1.0);
   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

   initShaders();
   initProgram();

   let VertBufferObject = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, VertBufferObject);
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(VertexData), gl.DYNAMIC_DRAW);

   let indexBufferObject = gl.createBuffer();
   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferObject);
   gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(IndexData), gl.STATIC_DRAW);

   //Get Attributes from Shader
   var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
   var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');

   //Set Properties to position
   gl.vertexAttribPointer(
      positionAttribLocation,             //Attribute Location
      2,                                  // num of elements per Attribute
      gl.FLOAT,                           //Type of elements
      gl.FALSE,
      5 * Float32Array.BYTES_PER_ELEMENT, //Size of vertexAttribPointer
      0                                   //Offset from the beginning of a single vertex to this attribute
   );

   //Set Properties to color
   gl.vertexAttribPointer(
      colorAttribLocation,                //Attribute Location
      3,                                  // num of elements per Attribute
      gl.FLOAT,                           //Type of elements
      gl.FALSE,
      5 * Float32Array.BYTES_PER_ELEMENT, //Size of vertexAttribPointer
      2 * Float32Array.BYTES_PER_ELEMENT  //Offset from the beginning of a single vertex to this attribute
   );

   //enable attribs
   gl.enableVertexAttribArray(positionAttribLocation);
   gl.enableVertexAttribArray(colorAttribLocation);

   //Main render Loop
   gl.useProgram(program);

   setInterval(function()
   {
      // Game loop

      //clear screen
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      //update vertex arrays
      gl.bindBuffer(gl.ARRAY_BUFFER, VertBufferObject);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(VertexData));

      //drawArrays
      gl.drawElements(gl.TRIANGLES, IndexData.length, gl.UNSIGNED_SHORT, 0);
   }, 16);
}

var resizeCanvas = function()
{
   canvas.width = document.body.clientHeight;
   canvas.height = document.body.clientHeight;
   screen.x = canvas.width;
   screen.y = canvas.height;
   tile.width = screen.x/tile.numX;
   tile.height = screen.y/tile.numY;
}

var initShaders = function()
{
   //Init Shaders
   vertexShader = gl.createShader(gl.VERTEX_SHADER);
   fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

   //Get Shader Source
   gl.shaderSource(vertexShader, vertexShaderText);
   gl.shaderSource(fragmentShader, fragmentShaderText);

   //Compile Shaders
   gl.compileShader(vertexShader);
   gl.compileShader(fragmentShader);

   //Compilation Error Checking
   if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS))
   {
      console.error('Error: could not compile vertex shader\n', gl.getShaderInfoLog(vertexShader));
      return;
   }
   if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS))
   {
      console.error('Error: could not compile fragment shader\n', gl.getShaderInfoLog(fragmentShader));
      return;
   }
   console.log('Compiled Shaders');
};

var initProgram = function()
{
   //attach shaders to program
   program = gl.createProgram();
   gl.attachShader(program, vertexShader);
   gl.attachShader(program, fragmentShader);

   //link shaders
   gl.linkProgram(program);
   if(!gl.getProgramParameter(program, gl.LINK_STATUS))
   {
      console.error('Program Linker Error:', gl.getProgramInfoLog(program));
      return;
   }
   console.log('Linked Program');

   //debugging
   gl.validateProgram(program);
   if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS))
   {
      console.error('Error validating program, ', gl.getProgramInfoLog(program));
      return;
   }
   console.log('Validated Program');
};
main();
