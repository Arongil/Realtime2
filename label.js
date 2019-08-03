class Label {

    constructor(position = [0, 0], text = "", color = "#000000", latex = true) {
        this.id = ID++;
        this.position = position;
        this.text = text;
        this.color = color;
        this.latex = latex;
        this.dragSpeed = 0.001;
    }

    update() {
        this.textElement = document.getElementById("text" + this.id);
        this.colorElement = document.getElementById("color" + this.id);
        this.latexElement = document.getElementById("mathy" + this.id);
        this.text = this.textElement.value;
        this.color = colors[this.colorElement.value];
        this.latex = (this.latexElement.value === "yes" ? true : false);
    }

    plot() {
        style({
            fill: this.color
        });
        textSize(20);
        text(this.text, realtime.transformX(this.position[0]), realtime.transformY(-this.position[1]));
    }

    drag() {
        this.position[0] += Mouse.dx * this.dragSpeed * realtime.xRange;
        this.position[1] -= Mouse.dy * this.dragSpeed * realtime.yRange;
    }

    reposition() {
        var canvas = document.getElementById("canvas");
        var havePointerLock = "pointerLockElement" in document || "mozPointerLockElement" in document || "webkitPointerLockElement" in document;
        if (havePointerLock) {
            canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
            canvas.exitPointerLock = canvas.exitPointerLock || canvas.mozExitPointerLock || canvas.webkitExitPointerLock;
            var drag = this.drag.bind(this);
            if (!(canvas === document.pointerLockElement || canvas === document.mozPointerLockElement || canvas === document.webkitPointerLockElement)) {
                canvas.requestPointerLock();
                document.addEventListener("mousemove", mousemove, false);
                document.addEventListener("mousemove", drag, false);
                realtime.init();
                realtime.takeInput = false;
            } else {
                // document.exitPointerLock();
            }
            document.addEventListener("pointerlockchange", function() {
                if (!(canvas === document.pointerLockElement || canvas === document.mozPointerLockElement || canvas === document.webkitPointerLockElement)) {
                    document.removeEventListener("mousemove", mousemove, false);
                    document.removeEventListener("mousemove", drag, false);
                    realtime.active = false;
                }
            }.bind(this), false);
        }
    }

    generateCode() {
        return `label([` + this.position[0] + `, ` + this.position[1] + `], "` + this.text + `", "center", ` + (this.latex ? "true" : "false") + `, {
    color: "` + this.color + `"
});`;
    }

}
