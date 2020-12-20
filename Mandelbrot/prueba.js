var canvas = $("canvas")[0];
var c = canvas.getContext("2d");

canvas.width = $(".canvas_container").outerWidth();
canvas.height = $(".canvas_container").outerHeight();

c.fillStyle = "red";
c.fillRect(50,50, 50, 50);