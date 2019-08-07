class Equation {

    constructor(f = (x) => 0, color = "#11ACCD") {
        this.id = ID++;
        this.f = f;
        this.color = color;
        this.steps = 400;
        this.invalid = false;
    }

    init() {
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
            // If the formula's invalid, wait until it's corrected.
            return;
        }
        var x, prevF = this.f(realtime.range[0][0]);
        var x1, y1, x2, y2;
        var points = [];
        for (var i = 0, x; i <= this.steps; i++) {
            x = i / this.steps * realtime.xRange + realtime.range[0][0]
            points.push([
                i/this.steps * WIDTH - HALFWIDTH,
                realtime.transformY(this.f(x))
            ]);
        }
        path(points, {
            stroke: this.color,
            strokeWidth: 3
        }, false);
    }

    generateCode() {
        if (this.invalid) {
            return "/* Invalid Function */";
        }
        return `style({
    stroke: "` + this.color + `",
    fill: "none",
    strokeWidth: 3
});
plot(function(x) {
    return ` + this.fElement.value + `;
}, X_RANGE);`;
    }

}
