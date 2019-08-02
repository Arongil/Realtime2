class Label {

    constructor(position = [0, 0], text = "", color = "#000000", latex = true) {
        this.id = ID++;
        this.position = position;
        this.text = text;
        this.color = color;
        this.latex = latex;
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
        text(this.text, realtime.transformX(this.position[0]), realtime.transformY(this.position[1]));
    }

}
