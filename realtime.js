class Realtime {

    constructor() {
        this.range = [[-1, 1], [-1, 1]];
        this.center = [0, 0];
        this.xRange = 1;
        this.yRange = 1;
        this.scrollSpeed = 0.002;
        this.zoomSpeed = 0.01;
        this.active = false;
        this.takeInput = false;
    }

    transformX(x) {
        return WIDTH*(x - this.center[0])/this.xRange;
    }
    transformY(y) {
        // Returning the negative accounts for how HTML5 canvas handles y-coordinates.
        return -HEIGHT*(y - this.center[1])/this.yRange;
    }
    transform(point) {
        var x = point[0], y = point[1];
        return [this.transformX(x), this.transformY(y)];
    }

    init() {
        for (var i = 0; i < workspace.objs.length; i++) {
            workspace.objs[i].update();
        }
        this.active = true;
        this.takeInput = true;
    }

    graph() {
        this.drawBackground();
        for (var i = 0; i < workspace.objs.length; i++) {
            workspace.objs[i].plot();
        }
    }

    drawBackground() {
        fill(255, 255, 255);
        rect(-WIDTH, -HEIGHT, 4*WIDTH, 4*HEIGHT);
        // x-axis
        path([[-WIDTH, this.transformY(0)], [WIDTH, this.transformY(0)]], {
            stroke: "#000000",
            strokeWidth: 2
        });
        // y-axis
        path([[this.transformX(0), -HEIGHT], [this.transformX(0), HEIGHT]], {
            stroke: "#000000",
            strokeWidth: 2
        });
    }

    input() {
        // Scroll / pan
        this.range[0][0] += Mouse.dx * this.scrollSpeed * this.xRange;
        this.range[0][1] += Mouse.dx * this.scrollSpeed * this.xRange;
        this.range[1][0] -= Mouse.dy * this.scrollSpeed * this.yRange;
        this.range[1][1] -= Mouse.dy * this.scrollSpeed * this.yRange;
        Mouse.dx = 0;
        Mouse.dy = 0;
        // Zoom
        if (Mouse.zoom != 0) {
            var z = (1 + Mouse.zoom) * this.zoomSpeed + 1,
            xRange = (this.range[0][1] - this.range[0][0])/2,
            yRange = (this.range[1][1] - this.range[1][0])/2,
            xCenter = (this.range[0][1] + this.range[0][0])/2,
            yCenter = (this.range[1][1] + this.range[1][0])/2;
            this.range[0][0] = xCenter - xRange * z;
            this.range[0][1] = xCenter + xRange * z;
            this.range[1][0] = yCenter - yRange * z;
            this.range[1][1] = yCenter + yRange * z;
            Mouse.zoom = 0;
        }

        if (Keys.space) {
            this.range = [[-1, 1], [-1, 1]];
        }

        this.center = [(this.range[0][0] + this.range[0][1])/2, (this.range[1][0] + this.range[1][1])/2];
        this.xRange = this.range[0][1] - this.range[0][0];
        this.yRange = this.range[1][1] - this.range[1][0];
    }

    update() {
        this.center = [(this.range[0][0] + this.range[0][1])/2, (this.range[1][0] + this.range[1][1])/2];
        this.xRange = this.range[0][1] - this.range[0][0];
        this.yRange = this.range[1][1] - this.range[1][0];

        if (!this.active) {
            return;
        }
        if (this.takeInput) {
            this.input();
        }
        this.graph();
    }

}
