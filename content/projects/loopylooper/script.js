/*
Copyright 2016-2024 Hyperagon (https://hyperagon.github.io/)

    This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

    For more informtion, visit <https://www.gnu.org/licenses/agpl-3.0.html>.
*/
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
    for (i = 1; i.toFixed(1) <= 50; i += 1) {
        document.write('<option value="' + i + '">' + (i / 10).toFixed(1) + "");
    }
    document.write("</select>");
    document.write("</div><br/>");
    document.write("<div>");
    document.write('Inner Color:<input type=color  tabindex=6  name=ic  onMouseOver="javascript:updateDescription(6)" onMouseOut="javascript:updateDescription(0)"/>');
    document.write(',Outter Color:<input type=color  tabindex=7  name=oc  onMouseOver="javascript:updateDescription(7)" onMouseOut="javascript:updateDescription(0)"/>');
    document.write(',Delay: <input type="range" tabindex=8 name=delay min="0" max="10" step="0.1" value="0" onMouseOver="javascript:updateDescription(8)" onMouseOut="javascript:updateDescription(0)">');

    document.write('&nbsp;<input type="button" id="draw" tabindex=9 value="Draw" onclick="javascript:rerender();" onMouseOver="javascript:updateDescription(9)" onMouseOut="javascript:updateDescription(0)"></input>');

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
        text = "(re)Start Drawing if delay > 0.";
    } else {
        text = "Hold your mouse over a control to view its description.";
    }
    document.getElementById("description").innerHTML = text;
}
