"use strict";
var shaders_1 = require("./shaders");
var shaders_2 = require("./shaders");
var gl;
var canvas;
var screen = {
    x: 300,
    y: 200,
    ratio: 1 / 1
};
var tile = {
    numX: 20,
    numY: 20,
    width: 0,
    height: 0
};
var vertexShader;
var fragmentShader;
var program;
var VertexData = [];
var IndexData = [];
var numRects = 0;
var main = function () {
    screen.ratio = screen.x / screen.y;
    canvas = document.getElementById('glcanvas');
    gl = canvas.getContext('webgl');
    resizeCanvas();
    gl.viewport(0, 0, screen.x, screen.y);
    if (!gl) {
        console.log('WebGL not supported, using experimental-webgl');
        gl - canvas.getContext('experimental-webgl');
    }
    if (!gl) {
        alert('Your browser does not support WebGL');
        return;
    }
    console.log('Initilized WebGL');
    gl.clearColor(0.75, 0.85, 0.8, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    initShaders();
    initProgram();
    GRect(100, 100, 100, 100, 1, 1, 1);
    var VertBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, VertBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(VertexData), gl.DYNAMIC_DRAW);
    var indexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferObject);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(IndexData), gl.STATIC_DRAW);
    var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
    var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
    gl.vertexAttribPointer(positionAttribLocation, 2, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.vertexAttribPointer(colorAttribLocation, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);
    gl.useProgram(program);
    setInterval(function () {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.bindBuffer(gl.ARRAY_BUFFER, VertBufferObject);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(VertexData));
        gl.drawElements(gl.TRIANGLES, IndexData.length, gl.UNSIGNED_SHORT, 0);
    }, 16);
};
var resizeCanvas = function () {
    canvas.width = document.body.clientHeight;
    canvas.height = document.body.clientHeight;
    screen.x = canvas.width;
    screen.y = canvas.height;
    tile.width = screen.x / tile.numX;
    tile.height = screen.y / tile.numY;
};
var initShaders = function () {
    vertexShader = gl.createShader(gl.VERTEX_SHADER);
    fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vertexShader, shaders_1.vertexShaderText);
    gl.shaderSource(fragmentShader, shaders_2.fragmentShaderText);
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error('Error: could not compile vertex shader\n', gl.getShaderInfoLog(vertexShader));
        return;
    }
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error('Error: could not compile fragment shader\n', gl.getShaderInfoLog(fragmentShader));
        return;
    }
    console.log('Compiled Shaders');
};
var initProgram = function () {
    program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program Linker Error:', gl.getProgramInfoLog(program));
        return;
    }
    console.log('Linked Program');
    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        console.error('Error validating program, ', gl.getProgramInfoLog(program));
        return;
    }
    console.log('Validated Program');
};
function GRect(x, y, w, h, r, g, b) {
    var rectPoints = [];
    rectPoints.push([(x / screen.x), (y) / screen.y]);
    rectPoints.push([(x + w) / screen.x, (y) / screen.y]);
    rectPoints.push([(x + w) / screen.x, (y - h) / screen.y]);
    rectPoints.push([(x) / screen.x, (y - h) / screen.y]);
    for (var i_1 = 0; i_1 < rectPoints.length; i_1++) {
        for (var j = 0; j < rectPoints[i_1].length; j++) {
            rectPoints[i_1][j] += -1;
        }
        rectPoints[i_1].push(r);
        rectPoints[i_1].push(g);
        rectPoints[i_1].push(b);
    }
    for (var i_2 = 0; i_2 < rectPoints.length; i_2++)
        for (var j = 0; j < rectPoints[i_2].length; j++)
            VertexData.push(rectPoints[i_2][j]);
    var i = 4 * numRects;
    IndexData.push(i);
    IndexData.push(i + 1);
    IndexData.push(i + 2);
    IndexData.push(i);
    IndexData.push(i + 2);
    IndexData.push(i + 3);
    numRects++;
}
main();
