class Realtime {

    constructor() {
        this.range = [[-1, 1], [-1, 1]];
        this.scrollSpeed = 0.01;
        this.active = false;
    }

    init() {
        for (var i = 0; i < workspace.objs.length; i++) {
            workspace.objs[i].update();
        }
        this.active = true;
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
    }

    input() {
        this.range[0][0] += Mouse.dx * this.scrollSpeed;
        this.range[0][1] += Mouse.dx * this.scrollSpeed;
        this.range[1][0] -= Mouse.dy * this.scrollSpeed;
        this.range[1][1] -= Mouse.dy * this.scrollSpeed;
        Mouse.dx = 0;
        Mouse.dy = 0;

        if (Keys.space) {
            this.range = [[-1, 1], [-1, 1]];
        }
    }

    update() {
        if (!this.active) {
            return;
        }
        this.input();
        this.graph();
    }

}
