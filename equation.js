class Equation extends Obj {

    constructor(f = (x) => 0, color = "#987654") {
        super();
        this.f = f;
        this.color = color;
        this.points = new Points();
        this.steps = 400;
        this.invalid = false;

        this.fElement = document.getElementById("function" + this.id);
        this.colorElement = document.getElementById("color" + this.id);
    }

    update() {
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
            // If the formula's invalid, wait until it's corrected.
            return;
        }
        var x, prevF = this.f(realtime.range[0][0]);
        var x1, y1, x2, y2;
        for (var i = 1, x; i <= this.steps; i++) {
            x = i / this.steps * realtime.xRange + realtime.range[0][0];
            x1 = (i - 1)/this.steps * WIDTH - HALFWIDTH;
            x2 = i/this.steps * WIDTH - HALFWIDTH;
            y1 = realtime.transformY(prevF);
            y2 = realtime.transformY(this.f(x));
            path([[x1, y1], [x2, y2]], {
                stroke: this.color,
                strokeWidth: 3
            });
            prevF = this.f(x);
        }
    }

}
