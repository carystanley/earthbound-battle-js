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

var A = 30;
var F = 0.03;
var S = 0.04;


function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    var width = canvas.width;
    var height = canvas.height;
    var patternHeight = pattern.height;
    for (var y = 0; y < height; y++) {
        var offset = A * Math.sin(F * y + S * t);
        // offset = (y % 2) ? offset : -offset;
        context.drawImage(pattern, Math.floor((offset + width) % width), y % patternHeight, width, 1, 0, y, width, 1);
    }
    context.drawImage(enemy, 0, 0, width, height, 0, 0, width, height);
}

function update() {
    t = t + 1;
}

var t = 0;
var canvas = document.getElementById('mainCanvas');
var context = canvas.getContext('2d');
var pattern = loadImage('./pattern.png');
var enemy = loadImage('./enemy.png');
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