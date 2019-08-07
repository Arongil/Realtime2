var canvas, ctx;
var WIDTH, HEIGHT, HALFWIDTH, HALFHEIGHT;

var realtime, workspace;

var start;

/******************************/

function resize() {
    ctx.translate(-HALFWIDTH, -HALFHEIGHT);

    var container = document.getElementById("output");
    canvas.width = container.offsetWidth;
    canvas.height = canvas.width;
    if (canvas.height > container.offsetHeight) {
        // If the height is greater than the height of the screen, set it accordingly.
        canvas.height = container.offsetHeight;
        canvas.width = canvas.height;
    }
    canvas.style.marginLeft = Math.floor((container.offsetWidth - canvas.width)/2) + "px";
    canvas.style.marginRight = Math.floor((container.offsetWidth  - canvas.width)/2) + "px";

    WIDTH = canvas.width;
    HEIGHT = canvas.height;
    HALFWIDTH = WIDTH / 2;
    HALFHEIGHT = HEIGHT / 2;

    ctx.translate(HALFWIDTH, HALFHEIGHT);
}

function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    var body = document.getElementsByTagName("body")[0];
    body.onresize = resize;
    resize();

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    ctx.translate(HALFWIDTH, HALFHEIGHT);

    start = Date.now();

    realtime = new Realtime();
    workspace = new Workspace();
    workspace.init();
    realtime.init();

    window.requestAnimationFrame(loop);
}

function loop() {
    ctx.save();

    realtime.update();

    ctx.restore();

    window.requestAnimationFrame(loop);
}

init();
