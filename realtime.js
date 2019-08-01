class Realtime {

    constructor() {
        this.range = [[-1, 1], [-1, 1]];
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

    update() {
        if (this.active) {
            this.graph();
        }
    }

}
