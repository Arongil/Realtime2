var ID = 0;

class Workspace {

    constructor() {
        this.objs = [new Equation(), new Label()];
        this.objsElement = document.getElementById("objs");
    }

    add() {
        var type = document.getElementById("type-select").value;
        var obj = getObj(type);
        this.objs.push(obj);
        var objDiv = document.createElement("div");
        objDiv.className += " obj";
        objDiv.innerHTML = createHTML(type, obj);
        this.objsElement.appendChild(objDiv);
    }

    remove(id) {
        for (var i = 0; i < this.objs.length; i++) {
            if (this.objs[i].id === id) {
                this.objsElement.removeChild(this.objsElement.children[i]);
                this.objs.splice(i, 1);
                return;
            }
        }
    }

}

function getObj(type) {
    if (type === "function") {
        return new Equation();
    } else if (type === "label") {
        return new Label();
    }
}

function createHTML(type, obj) {
    if (type === "function") {
        return `
            <div class="obj-header">
                <ul>
                    <li class="obj-title"><strong>Function</strong></li>
                    <li class="obj-delete" onclick="workspace.remove(` + obj.id +`);"><button>X</button></li>
                </ul>
            </div>
            <div class="obj-body">
                <ul>
                    <li class="function">f(x) = <input id="function` + obj.id + `" value="Math.sin(2*Math.PI*x)*0.8"></input></li>
                    <li class="color">color = <select id="color` + obj.id + `">
                        <option value="BLUE_D">BLUE_D</option>
                        <option value="MAROON_D">MAROON_D</option>
                    </select></li>
                </ul>
            </div>
        `;
    } else if (type === "label") {
        return new Label();
    }
}
