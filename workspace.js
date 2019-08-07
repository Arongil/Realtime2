var ID = 0;

class Workspace {

    constructor() {
        this.objs = [];
        this.objsElement = document.getElementById("objs");
    }

    init() {
        this.add("function");
        this.add("label");
        this.add("point");
    }

    add(type = null) {
        if (type === null) {
            var type = document.getElementById("type-select").value;
        }
        var obj = getObj(type);
        this.objs.push(obj);
        var objDiv = document.createElement("div");
        objDiv.className = "obj " + type;
        objDiv.innerHTML = createHTML(type, obj);
        this.objsElement.appendChild(objDiv);
        obj.init();
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
            this.objs[i].update();
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
        return new Label(realtime.center);
    } else if (type === "point") {
        return new Point((x) => Math.sin(2*Math.PI*x)*0.8);
    }
}

function getColorOptions() {
    return `
<option value="BLACK">BLACK</option>
<option value="BLUE_A">BLUE_A</option>
<option value="BLUE_B">BLUE_B</option>
<option value="BLUE_C">BLUE_C</option>
<option value="BLUE_D" selected="selected">BLUE_D</option>
<option value="BLUE_E">BLUE_E</option>
<option value="GREEN_A">GREEN_A</option>
<option value="GREEN_B">GREEN_B</option>
<option value="GREEN_C">GREEN_C</option>
<option value="GREEN_D">GREEN_D</option>
<option value="GREEN_E">GREEN_E</option>
<option value="TEAL_A">TEAL_A</option>
<option value="TEAL_B">TEAL_B</option>
<option value="TEAL_C">TEAL_C</option>
<option value="TEAL_D">TEAL_D</option>
<option value="TEAL_E">TEAL_E</option>
<option value="MAROON_A">MAROON_A</option>
<option value="MAROON_B">MAROON_B</option>
<option value="MAROON_C">MAROON_C</option>
<option value="MAROON_D">MAROON_D</option>
<option value="MAROON_E">MAROON_E</option>
<option value="PURPLE_A">PURPLE_A</option>
<option value="PURPLE_B">PURPLE_B</option>
<option value="PURPLE_C">PURPLE_C</option>
<option value="PURPLE_D">PURPLE_D</option>
<option value="PURPLE_E">PURPLE_E</option>
<option value="GRAY_A">GRAY_A</option>
<option value="GRAY_B">GRAY_B</option>
<option value="GRAY_C">GRAY_C</option>
<option value="GRAY_D">GRAY_D</option>
<option value="GRAY_E">GRAY_E</option>
<option value="GOLD_A">GOLD_A</option>
<option value="GOLD_B">GOLD_B</option>
<option value="GOLD_C">GOLD_C</option>
<option value="GOLD_D">GOLD_D</option>
<option value="GOLD_E">GOLD_E</option>
<option value="RED_A">RED_A</option>
<option value="RED_B">RED_B</option>
<option value="RED_C">RED_C</option>
<option value="RED_D">RED_D</option>
<option value="RED_E">RED_E</option>
    `;
}

function createHTML(type, obj) {
    if (type === "function") {
        return `
            <div class="obj-header">
                <ul>
                    <li class="obj-title"><strong>Function</strong></li>
                    <li class="obj-delete" onclick="workspace.remove(` + obj.id + `);"><button>X</button></li>
                </ul>
            </div>
            <div class="obj-body">
                <ul>
                    <li class="fx">f(x) = <input id="function` + obj.id + `" value="Math.sin(2*Math.PI*x)*0.8"></input></li>
                    <li class="color">color = <select id="color` + obj.id + `">
                        ` + getColorOptions() + `
                    </select></li>
                </ul>
            </div>
        `;
    } else if (type === "label") {
        return `
            <div class="obj-header">
                <ul>
                    <li class="obj-title"><strong>Label</strong></li>
                    <li class="obj-delete" onclick="workspace.remove(` + obj.id + `);"><button>X</button></li>
                </ul>
            </div>
            <div class="obj-body">
                <ul>
                    <li class="text">text = <input id="text` + obj.id + `" value="x_0"></input></li>
                    <li class="color">color = <select id="color` + obj.id + `">
                        ` + getColorOptions() + `
                    </select></li>
                    <li class="mathy">mathy = <select id="mathy` + obj.id + `">
                        <option value="yes">yes</option>
                        <option value="no">no</option>
                    </select></li>
                    <li class="reposition"><button id="reposition` + obj.id + `">Reposition</button></li>
                </ul>
            </div>
        `;
    } else if (type === "point") {
        return `
            <div class="obj-header">
                <ul>
                    <li class="obj-title"><strong>Point</strong></li>
                    <li class="obj-delete" onclick="workspace.remove(` + obj.id + `);"><button>X</button></li>
                </ul>
            </div>
            <div class="obj-body">
                <ul>
                    <li class="fx">f(x) = <input id="function` + obj.id + `" value="Math.sin(2*Math.PI*x)*0.8"></input></li>
                    <li class="color">color = <select id="color` + obj.id + `">
                        ` + getColorOptions() + `
                    </select></li>
                    <li class="reposition"><button id="reposition` + obj.id + `">Reposition</button></li>
                </ul>
            </div>
        `;
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
