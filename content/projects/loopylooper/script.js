/*
Copyright 2016-2024 Hyperagon (https://hyperagon.github.io/)

    This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

    For more informtion, visit <https://www.gnu.org/license1s/agpl-3.0.html>.
*/
// https://stackoverflow.com/questions/69888029/how-to-call-a-function-declared-in-a-javascript-module-type-module-from-an-htm
const GLOBAL = {};
const canvas = document.getElementById("canvas");
let context = null;
var step = 216.0;
var detail = 10;
var maxr = 100;
var minr = 0;
var lw = 20;
var ic = "#ffff64";
var oc = "#ffc832";
var delay = 0;
function deg2rad(deg) {
    return (deg * Math.PI) / 180.0;
}
function hex2rgb(hex) {
    if (hex.substring(0, 1) != "#") return { red: 0, green: 0, blue: 0 };
    var r = parseInt(hex.substring(1, 3), 16);
    var g = parseInt(hex.substring(3, 5), 16);
    var b = parseInt(hex.substring(5, 7), 16);
    return { red: r, green: g, blue: b };
}
function rgb2hex(red, green, blue) {
    var black = "#000000";
    if (red < 0 || red > 255) return black;
    if (green < 0 || green > 255) return black;
    if (blue < 0 || blue > 255) return black;
    var color = blue | (green << 8) | (red << 16);
    return "#" + color.toString(16);
}
function getColorStep(spos, epos, scol, ecol) {
    var pdif = parseInt(epos) - parseInt(spos);
    pdif = Math.abs(pdif);
    var cdif = parseInt(ecol) - parseInt(scol);
    return cdif / pdif;
}
function render() {
    let canvas = GLOBAL.canvas;
    let context = GLOBAL.context;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    var cwidth = canvas.width;
    var chwidth = cwidth / 2;
    var cheight = canvas.height;
    var chheight = cheight / 2;
    var angle = -90.0;
    var position = chwidth;
    context.strokeStyle = oc;
    context.lineWidth = lw / 10;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.miterLimit = 700;
    var or = maxr / 100;
    var ir = or * (minr / 100);
    var rad = deg2rad(angle),
        dstep = detail / 10;
    var iposition = chwidth * or;
    var fposition = chwidth * ir;
    if (delay == 0) {
        GLOBAL.iteration = 0;
        GLOBAL.itercap = iposition;
    }
    var x = chwidth + Math.cos(rad) * iposition,
        px = 0;
    var y = chheight + Math.sin(rad) * iposition,
        py = 0;
    var icolor = hex2rgb(oc);
    var fcolor = hex2rgb(ic);
    var r = icolor.red;
    var g = icolor.green;
    var b = icolor.blue;
    var rs = getColorStep(iposition, fposition, r, fcolor.red) * (detail / 10);
    var gs = getColorStep(iposition, fposition, g, fcolor.green) * (detail / 10);
    var bs = getColorStep(iposition, fposition, b, fcolor.blue) * (detail / 10);
    for (position = iposition; position > fposition; position -= dstep) {
        rad = deg2rad(angle);
        px = x;
        py = y;
        x = chwidth + Math.cos(rad) * position;
        y = chheight + Math.sin(rad) * position;
        context.beginPath();
        context.moveTo(px, py);
        context.lineTo(x, y);
        context.strokeStyle = rgb2hex(r, g, b);
        r += rs;
        r = r > 255 ? 255 : r;
        r = r < 0 ? 0 : r;
        g += gs;
        g = g > 255 ? 255 : g;
        g = g < 0 ? 0 : g;
        b += bs;
        b = b > 255 ? 255 : b;
        b = b < 0 ? 0 : b;
        context.stroke();
        context.moveTo(x, y);
        angle += step;
        angle -= angle > 360 ? 360 : 0;
        GLOBAL.iteration += 1;
        if (GLOBAL.iteration > GLOBAL.itercap) {
             break;
        }
    }
    context.restore();

    if(GLOBAL.timer) {
        clearTimeout(GLOBAL.timer);
    }
    if (position > fposition) {
        GLOBAL.itercap += 1;
        GLOBAL.timer = setTimeout(render, parseInt(GLOBAL.delay / 100));
    }
    GLOBAL.iteration = 0;
}
function animate(canvas, context) {
    GLOBAL.canvas = canvas;
    GLOBAL.context = context;
    GLOBAL.iteration = 0;
    GLOBAL.itercap = 1;
    let del = 0;
    if (typeof delay !== 'undefined') { del = delay * 10; }
    GLOBAL.delay = del;
    render();
}
function rerender() {
    if(context == null) {
         redraw();
    }
    animate(canvas, context);
}
function redraw() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    animate(canvas, context);
}
function addControls() {
    var i = 0;
    document.write('<form name=controls onchange="javascript:updateValues()" onkeypress="javascript:updateValues()">');
    document.write("<div>");
    document.write("Step:");
    document.write('<select name=step size=1 tabindex=1  onMouseOver="javascript:updateDescription(1)" onMouseOut="javascript:updateDescription(0)">');
    for (i = 1; i <= 359; i++) {
        document.write('<option value="' + i + '">' + i + "");
    }
    document.write("</select>");
    document.write(",Detail:");
    document.write('<select name=detail size=1 tabindex=2  onMouseOver="javascript:updateDescription(2)" onMouseOut="javascript:updateDescription(0)">');
    for (i = 5; i <= 100; i++) {
        document.write('<option value="' + i + '">' + (i / 10).toFixed(1) + "");
    }
    document.write("</select>,Maximum Radius:");
    document.write('<select name=maxr  size=1  tabindex=3  onMouseOver="javascript:updateDescription(3)" onMouseOut="javascript:updateDescription(0)">');
    for (i = 10; i <= 300; i += 10) {
        document.write('<option value="' + i + '">' + i + "");
    }
    document.write("</select>%,Minimum Radius:");
    document.write('<select name=minr  size=1  tabindex=4  onMouseOver="javascript:updateDescription(4)" onMouseOut="javascript:updateDescription(0)">');
    for (i = 0; i <= 95; i += 5) {
        document.write('<option value="' + i + '">' + i + "");
    }
    document.write("</select>%,Line Width:");
    document.write('<select name=lw  size=1  tabindex=5  onMouseOver="javascript:updateDescription(5)" onMouseOut="javascript:updateDescription(0)">');
    for (i = 1; i.toFixed(1) <= 100; i += 1) {
        document.write('<option value="' + i + '">' + (i / 10).toFixed(1) + "");
    }
    document.write("</select>");
    document.write("</div><br/>");
    document.write("<div>");
    document.write('Inner Color:<input type=color  tabindex=6  name=ic  onMouseOver="javascript:updateDescription(6)" onMouseOut="javascript:updateDescription(0)"/>');
    document.write(',Outter Color:<input type=color  tabindex=7  name=oc  onMouseOver="javascript:updateDescription(7)" onMouseOut="javascript:updateDescription(0)"/>');
    document.write(',Delay: <input type="range" tabindex=8 name=delay min="0" max="1000" step="0.1" value="0" onMouseOver="javascript:updateDescription(8)" onMouseOut="javascript:updateDescription(0)">');
    document.write("</div><br/>");
    document.write("<div id=description>");
    document.write("Hold your mouse over a control to view its description.");
    document.write("</div>");
    document.write("</form>");
    document.controls.step.value = step;
    document.controls.detail.value = detail;
    document.controls.maxr.value = maxr;
    document.controls.minr.value = minr;
    document.controls.lw.value = lw;
    document.controls.ic.value = ic;
    document.controls.oc.value = oc;
    document.controls.delay.value = delay;
}
function updateValues() {
    step = parseInt(document.controls.step.value, 10);
    detail = parseInt(document.controls.detail.value, 10);
    maxr = parseInt(document.controls.maxr.value, 10);
    minr = parseInt(document.controls.minr.value, 10);
    lw = parseInt(document.controls.lw.value, 10);
    ic = document.controls.ic.value;
    oc = document.controls.oc.value;
    delay = document.controls.delay.value;
    redraw();
}
function updateDescription(object) {
    var text = "";
    if (object == 1) {
        text = "The angle between vertexes of the loop.(determines the overall shape)";
    } else if (object == 2) {
        text = "The decrease in radius per vertex.(the lower the more detailed)";
    } else if (object == 3) {
        text = "The radius of the first vertex.";
    } else if (object == 4) {
        text = "The radius of the last vertex relative to the first vertex.(can be used to make holes inside the loop)";
    } else if (object == 5) {
        text = "Controls how thick the lines are.";
    } else if (object == 6) {
        text = "The color of the last vertex.(must be a hex value)";
    } else if (object == 7) {
        text = "The color of the first vertex.(must be a hex value)";
    } else if (object == 8) {
        text = "The delay of drawing (Return/Enter to restart)";
    } else if (object == 9) {
        text = "Restart Drawing if delay > 0.";
    } else {
        text = "Hold your mouse over a control to view its description.";
    }
    document.getElementById("description").innerHTML = text;
}
