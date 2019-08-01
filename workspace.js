class Workspace {

    constructor() {
        this.objs = [new Equation()];
        this.objsElement = document.getElementById("objs");
    }

    add(obj) {
        obj.className += " obj";
        this.objsElement.appendChild(obj);
    }

    remove(id) {
        for (var i = 0; i < this.objs.length; i++) {
            if (this.objs[i].id === id) {
                this.objsElement.removeChild(this.objsElement.children[i]);
                return;
            }
        }
    }

}
