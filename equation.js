class Equation extends Obj {

    constructor(f = (x) => 0, color = "#987654") {
        super();
        this.f = f;
        this.color = color;
        this.points = new Points();
        this.steps = 200;
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
        var x, prevX = realtime.range[0][0], prevF = this.f(realtime.range[0][0]),
            xRange = realtime.range[0][1] - realtime.range[0][0],
            yRange = realtime.range[1][1] - realtime.range[1][0],
            xScale = WIDTH / xRange, yScale = HEIGHT / yRange;
        for (var i = 1, x; i < this.steps; i++) {
            x = i / this.steps * xRange;
            path([[prevX*xScale - HALFWIDTH, prevF*yScale], [x*xScale - HALFWIDTH, this.f(x)*yScale]], {
                stroke: this.color,
                strokeWidth: 3
            });
            prevX = x;
            prevF = this.f(x);
        }
    }

}
