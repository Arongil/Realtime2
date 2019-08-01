class Label extends Obj {

    constructor(position = [0, 0], text = "", latex = true) {
        super();
        this.position = position;
        this.text = text;
        this.latex = latex;
    }

}
