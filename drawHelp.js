var pi = Math.PI;

// New context fuctions here.
function fill(red, green, blue, alpha) {
  if (alpha === undefined) {
    alpha = 1;
  }
  ctx.fillStyle = "rgba("+Math.floor(red)+","+Math.floor(green)+","+Math.floor(blue)+","+alpha+")";
}
function stroke(red, green, blue) {
  ctx.strokeStyle = "rgb("+Math.floor(red)+","+Math.floor(green)+","+Math.floor(blue)+")";
}
function strokeWeight(weight) {
  ctx.lineWidth = weight;
}
function style(styleObj) {
  if (!!styleObj.fill) {
    var rgb = hexToRgb(styleObj.fill);
    fill(rgb.r, rgb.g, rgb.b);
  }
  if (!!styleObj.stroke) {
    if (styleObj.stroke === "none") {
        strokeWeight(0);
    }
    var rgb = hexToRgb(styleObj.stroke);
    stroke(rgb.r, rgb.g, rgb.b);
  }
  if (!!styleObj.strokeWidth) {
    strokeWeight(styleObj.strokeWidth);
  }
}
function rect(x, y, width, height) {
  ctx.beginPath();
  ctx.rect(x - width/2, y - height/2, width, height);
  ctx.closePath();
  ctx.fill();
}
function triangle(x1, y1, x2, y2, x3, y3) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  // Line to the from the first point to the second.
  ctx.lineTo(x2, y2);
  // Line to the from the second point to the third.
  ctx.lineTo(x3, y3);
  // Line to the from the third point to the first.
  ctx.lineTo(x1, y1);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}
function ellipse(x, y, xRadius, yRadius, s) {
  style(s);
  ctx.beginPath();
  ctx.ellipse(x, y, xRadius, yRadius, 0, 0, 2*pi);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}
function path(points, s, close = true) {
  style(s);
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  // Do lines between each point.
  for (var i = 0; i < points.length; i++) {
    ctx.lineTo(points[i][0], points[i][1]);
  }
  if (close) {
    ctx.lineTo(points[0][0], points[0][1]);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
  } else {
    ctx.stroke();
    ctx.closePath();
  }
}
function textSize(size) {
  ctx.font = size + "px Arial";
}
function text(str, x, y, alignment) {
  if (alignment === undefined) {
    alignment = "center";
  }
  ctx.textAlign = alignment;
  ctx.fillText(str, x, y);
}

function millis() {
  return Date.now() - start;
}

var colors = {
    "BLACK": "#000000",
    "BLUE_A": "#CCFAFF",
    "BLUE_B": "#80F6FF",
    "BLUE_C": "#63D9EA",
    "BLUE_D": "#11ACCD",
    "BLUE_E": "#0C7F99",
    "GREEN_A": "#B6FFB0",
    "GREEN_B": "#8AF281",
    "GREEN_C": "#74CF70",
    "GREEN_D": "#1FAB54",
    "GREEN_E": "#0D923F",
    "TEAL_A": "#94FFF5",
    "TEAL_B": "#26EDD5",
    "TEAL_C": "#01D1C1",
    "TEAL_D": "#01A995",
    "TEAL_E": "#208170",
    "MAROON_A": "#FFBDE0",
    "MAROON_B": "#FF92C6",
    "MAROON_C": "#ED5FA6",
    "MAROON_D": "#CA337C",
    "MAROON_E": "#9E034E",
    "PURPLE_A": "#DDD7FF",
    "PURPLE_B": "#C6B9FC",
    "PURPLE_C": "#AA87FF",
    "PURPLE_D": "#7854AB",
    "PURPLE_E": "#543B78",
    "GRAY_A": "#F6F7F7",
    "GRAY_B": "#F0F1F2",
    "GRAY_C": "#E3E5E6",
    "GRAY_D": "#D6D8DA",
    "GRAY_E": "#BABEC2",
    "GOLD_A": "#FFD0A9",
    "GOLD_B": "#FFBB71",
    "GOLD_C": "#FF9C39",
    "GOLD_D": "#E07D10",
    "GOLD_E": "#A75A05",
    "RED_A": "#FCA9A9",
    "RED_B": "#FF8482",
    "RED_C": "#F9685D",
    "RED_D": "#E84D39",
    "RED_E": "#BC2612"
}
