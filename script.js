// Some function for drawing on the pattern canvas
function drawSomePattern() {
    var canvas = document.getElementById('patternCanvas');
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = '#fff';
    ctx.fillRect(0,0, 400,400);

    ctx.fillStyle = '#000';
    ctx.fillRect(0,0, 200,50);
    ctx.fillRect(150,50, 50,150);
    ctx.fillRect(150,175, 200,25);
    ctx.fillRect(0,175, 200,25);
}


function isArraysEquals(arr1, arr2) {
    var len = arr1.length > arr2.length ? arr1.length : arr2.length;
    var isEquals = true;
    for (var i = 0; i < len; i++) {
        if (arr1[i] !== arr2[i])
            isEquals = false;
    }

    return isEquals;
}

// Init function of module
function draw(x, y) {
    // Just for testing
    var patternCanvas = document.getElementById('patternCanvas');
    var patternCtx = patternCanvas.getContext('2d');
    var patternColor = patternCtx.getImageData(x,y, 1,1).data;

    var drawingCanvas = document.getElementById('drawingCanvas');
    var drawingCtx = drawingCanvas.getContext('2d');
    drawingCtx.fillStyle = '#000';

    var passed = new Array(400);
    for (var i = 0; i < 400; i++) {
        passed[i] = new Array(400);
        for (var j = 0; j < 400; j++)
            passed[i][j] = 0;
    }

    var queue = [[x, y]];
    var current = [], currentData;
    var delay = 0;
    while (queue.length > 0) {
        current = queue.shift();

        currentData = patternCtx.getImageData(current[0] + 1, current[1], 1,1).data;
        /*currentData[0] = 255 - currentData[0];
        currentData[1] = 255 - currentData[1];
        currentData[2] = 255 - currentData[2];*/
        if (isArraysEquals(currentData, patternColor) && passed[current[0] + 1][current[1]] === 0) {
            passed[current[0] + 1][current[1]] = 1;
            queue.push([current[0] + 1, current[1]]);
            (function(x, y) {
                setTimeout(function() {
                    drawingCtx.fillRect(x,y, 1,1);
                }, delay);
            })(current[0] + 1, current[1]);
        }

        currentData = patternCtx.getImageData(current[0], current[1] - 1, 1,1).data;
        if (isArraysEquals(currentData, patternColor)  && passed[current[0]][current[1] - 1] === 0) {
            passed[current[0]][current[1] - 1] = 1;
            queue.push([current[0], current[1] - 1]);
            (function(x, y) {
                setTimeout(function() {
                    drawingCtx.fillRect(x,y, 1,1);
                }, delay);
            })(current[0], current[1] - 1);
        }

        currentData = patternCtx.getImageData(current[0] - 1, current[1], 1,1).data;
        if (isArraysEquals(currentData, patternColor) && passed[current[0] - 1][current[1]] === 0) {
            passed[current[0] - 1][current[1]] = 1;
            queue.push([current[0] - 1, current[1]]);
            (function(x, y) {
                setTimeout(function() {
                    drawingCtx.fillRect(x,y, 1,1);
                }, delay);
            })(current[0] - 1, current[1]);
        }

        currentData = patternCtx.getImageData(current[0], current[1] + 1, 1,1).data;
        if (isArraysEquals(currentData, patternColor)  && passed[current[0]][current[1] + 1] === 0) {
            passed[current[0]][current[1] + 1] = 1;
            queue.push([current[0], current[1] + 1]);
            (function(x, y) {
                setTimeout(function() {
                    drawingCtx.fillRect(x,y, 1,1);
                }, delay);
            })(current[0], current[1] + 1);
        }

        delay += 0.1;
    }
}



drawSomePattern();

draw(150, 150);
