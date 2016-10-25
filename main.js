window.onload = function() {

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame     ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();

function loadImage(url, options) {
    options = options || {};
    var image = new Image();
    if (options.onload)
        image.on('load', options.onload);
    image.src = url;
    return image;
}

function drawLayer(layer) {
    var width = canvas.width;
    var height = canvas.height;

    var A = layer.A;
    var F = layer.F;
    var S = layer.S;
    var pattern = layer.pattern;
    var patternHeight = pattern.height;

    for (var y = 0; y < height; y++) {
        var offset = A * Math.sin(F * y + S * t);
        // offset = (y % 2) ? offset : -offset;
        context.drawImage(pattern, Math.floor((offset + width) % width), y % patternHeight, width, 1, 0, y, width, 1);
    }
}

function render() {
    var width = canvas.width;
    var height = canvas.height;

    context.clearRect(0, 0, canvas.width, canvas.height);

    drawLayer({
        pattern: pattern,
        A: 30,
        F: 0.03,
        S: 0.04
    });

    context.globalAlpha=0.5;
    drawLayer({
        pattern: pattern,
        A: 20,
        F: 0.02,
        S: 0.07
    });
    context.globalAlpha=1.0;

    context.drawImage(enemy, 0, 0, width, height, 0, 0, width, height);
}

function update() {
    t = t + 1;
}

var t = 0;
var canvas = document.getElementById('mainCanvas');
var context = canvas.getContext('2d');
var enemy = loadImage('./enemy.gif');
var pattern = loadImage('./pattern.png');
var stats = new Stats();

stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.right = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);

function mainloop(){
    requestAnimFrame(mainloop);
    stats.begin();
    update();
    render();
    stats.end();
};

mainloop();

};