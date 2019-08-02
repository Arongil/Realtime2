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

    generateCode() {
        var graphCode = "";
        for (var i = 0; i < this.objs.length; i++) {
            graphCode += this.objs[i].generateCode();
            if (i < this.objs.length - 1) {
                graphCode += "\n\n";
            }
        }
        var code = `// X and Y ranges of the graph
var X_RANGE = [` + realtime.range[0][0] + `, ` + realtime.range[0][1] + `];
var Y_RANGE = [` + realtime.range[1][0] + `, ` + realtime.range[1][1] + `];

// var STEP = [<x tick step>, <y tick step>];
// var STEP = [10, 25];
var STEP = "auto";

// Width of the graph in pixels
// Let's use 320 for "normal" graphs and 170 for "small" graphs.
// If this is for the background of a widget (transformer, interactive graph, etc), use 400.
var SIZE = 320;

var xScale;
var yScale;
setup();
//////////////////////////////////////////////////////////////


` + graphCode + `


//////////////////////////////////////////////////////////////
// Setup grid, ticks, and labels and initialize graph.
function setup() {
    var dimensions = [SIZE, SIZE];
    var range = [X_RANGE, Y_RANGE];
    var step = STEP;
    if (step === "auto") {
        step = _.map(range, function(extent, i) {
            return Perseus.Util.tickStepFromExtent(
                    extent, dimensions[i]);
        });
    }
    var gridConfig = _.map(range, function(extent, i) {
        return Perseus.Util.gridDimensionConfig(
                step[i],
                extent,
                dimensions[i]);
    });
    var scale = _.pluck(gridConfig, "scale");
    xScale = scale[0];
    yScale = scale[1];
    var paddedRange = _.map(range, function(extent, i) {
        var padding = 25 / scale[i];
        return [extent[0], extent[1] + padding];
    });
    graphInit({
        gridRange: range,
        range: paddedRange,
        scale: scale,
        axisArrows: "<->",
        labelFormat: function(s) {
            return "\\\\small{" + s + "}";
        },
        gridStep: _.pluck(gridConfig, "gridStep"),
        tickStep: _.pluck(gridConfig, "tickStep"),
        labelStep: 1,
        unityLabels: _.pluck(gridConfig, "unityLabel")
    });
    style({
        clipRect: [[X_RANGE[0], Y_RANGE[0]],
                [X_RANGE[1] - X_RANGE[0],
                Y_RANGE[1] - Y_RANGE[0]]]
    });

    label([0, Y_RANGE[1]], "y", "above");
    label([X_RANGE[1], 0], "x", "right");
}`;
        return code;
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

function generateCode() {
    var generateButton = document.getElementById("generate-button");
    generateButton.textContent = "working ...";

    var copyText = document.getElementById("hidden-copier");
    copyText.value = workspace.generateCode();
    copyText.style.display = "inline";
    copyText.select();
    document.execCommand("copy");
    copyText.style.display = "none";

    generateButton.textContent = "Copied to Clipboard";
    window.setTimeout(() => {
        generateButton.textContent = "Generate Code";
    }, 1000);
}
