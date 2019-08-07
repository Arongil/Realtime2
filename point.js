class Point {

    constructor(f, x = 0, color = "#000000") {
        this.id = ID++;
        this.f = f;
        this.x = x;
        this.color = color;
        this.dragSpeed = 0.001;
        this.invalid = false;
    }

    update() {
        this.fElement = document.getElementById("function" + this.id);
        this.colorElement = document.getElementById("color" + this.id);
        try {
            eval("this.f = (x) => " + this.fElement.value + ";");
            this.invalid = false;
        } catch {
            this.invalid = true;
        }
        this.color = colors[this.colorElement.value];
    }

    plot() {
        if (this.invalid) {
            return;
        }
        var x = realtime.transformX(this.x),
            y = realtime.transformY(this.f(this.x)),
            radius = WIDTH/100;
        ellipse(x, y, radius, radius, { fill: this.color, stroke: this.color });
    }

    drag() {
        this.x += Mouse.dx * this.dragSpeed * realtime.xRange;
    }

    init() {
        this.repositionButton = document.getElementById("reposition" + this.id);
        var canvas = document.getElementById("canvas");
        var havePointerLock = "pointerLockElement" in document || "mozPointerLockElement" in document || "webkitPointerLockElement" in document;
        if (havePointerLock) {
            canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
            canvas.exitPointerLock = canvas.exitPointerLock || canvas.mozExitPointerLock || canvas.webkitExitPointerLock;
            var drag = this.drag.bind(this);
            this.repositionButton.addEventListener("click", function() {
                if (!(canvas === document.pointerLockElement || canvas === document.mozPointerLockElement || canvas === document.webkitPointerLockElement)) {
                    canvas.requestPointerLock();
                    document.addEventListener("mousemove", mousemove, false);
                    document.addEventListener("mousemove", drag, false);
                    realtime.init();
                    realtime.takeInput = false;
                } else {
                    // document.exitPointerLock();
                }
            }, false);
            document.addEventListener("pointerlockchange", function() {
                if (!(canvas === document.pointerLockElement || canvas === document.mozPointerLockElement || canvas === document.webkitPointerLockElement)) {
                    document.removeEventListener("mousemove", mousemove, false);
                    document.removeEventListener("mousemove", drag, false);
                    realtime.active = false;
                    realtime.takeInput = false;
                }
            }.bind(this), false);
        }
    }

    generateCode() {
        if (this.invalid) {
            return "/* Invalid Point */";
        }
        return `drawPoint({
    point: [` + this.x + `, ` + this.f(this.x) + `],
    color: "` + this.color + `"
});`;
    }

}
