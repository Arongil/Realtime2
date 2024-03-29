var Mouse = {
    "zoom": 0,
    "dx": 0,
    "dy": 0,
    "x": 0,
    "y": 0,
    "click": false,
};
var Keys = {
    // 65 is the a key. 68 is the d key. 83 is the s key. 87 is the w key. 81 is the q key. 69 is the e key.
    "81": false,
    "69": false,
    "65": false,
    "68": false,
    "83": false,
    "87": false,
    "16": false,
    "32": false,
    get w() { return Keys["87"]; },
    get a() { return Keys["65"]; },
    get s() { return Keys["83"]; },
    get d() { return Keys["68"]; },
    get q() { return Keys["81"]; },
    get e() { return Keys["69"]; },
    get shift() { return Keys["16"]; },
    get space() { return Keys["32"]; },
};

window.onkeydown = function(e) {
    if (Keys[e.keyCode] !== undefined) {
        Keys[e.keyCode] = true;
    }
};
window.onkeyup = function(e) {
    if (Keys[e.keyCode] !== undefined) {
        Keys[e.keyCode] = false;
    }
};
document.onmouseup = function(e) {
    Mouse["click"] = true;
};
function mousemove(e) {
    Mouse.dx = e.movementX;
    Mouse.dy = e.movementY;
    Mouse.x += e.movementX;
    Mouse.y += e.movementY;
}

// Detect pinch to zoom gestures on the trackpad.
function onwheel(e) {
    e.preventDefault();

    if (e.ctrlKey) {
        Mouse.zoom = e.deltaY;
    }
};

// Lock the user's mouse so that it doesn't hit the edge of the screen.
var canvas = document.getElementById("canvas");
var havePointerLock = "pointerLockElement" in document || "mozPointerLockElement" in document || "webkitPointerLockElement" in document;
if (havePointerLock) {
    canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
    canvas.exitPointerLock = canvas.exitPointerLock || canvas.mozExitPointerLock || canvas.webkitExitPointerLock;
    canvas.addEventListener("click", function() {
        if (!(canvas === document.pointerLockElement || canvas === document.mozPointerLockElement || canvas === document.webkitPointerLockElement)) {
            canvas.requestPointerLock();
            document.addEventListener("mousemove", mousemove, false);
            document.addEventListener("wheel", onwheel, {passive: false});
            realtime.init();
        } else {
            // document.exitPointerLock();
        }
    }, false);
    document.addEventListener("pointerlockchange", function() {
        if (!(canvas === document.pointerLockElement || canvas === document.mozPointerLockElement || canvas === document.webkitPointerLockElement)) {
            document.removeEventListener("mousemove", mousemove, false);
            document.removeEventListener("wheel", onwheel, {passive: false});
            realtime.active = false;
            realtime.takeInput = false;
        }
    }, false);
}
