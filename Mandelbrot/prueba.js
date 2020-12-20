$(document).ready(function(){


var canvas = $("canvas")[0];
var c = canvas.getContext("2d");

canvas.width = $(".canvas_container").outerWidth();
canvas.height = $(".canvas_container").outerHeight();

c.fillStyle = "red";
c.fillRect(50,50, 50, 50);

let x = 20;
let y = 20;


animate();

function animate() {
	requestAnimationFrame(animate);
    clearCanvas();

	c.beginPath();
		c.arc(x, y, 20, 0, Math.PI * 2, false);
		c.fillStyle = "blue";
		c.fill();
		c.stroke();
    c.closePath();
    x++;
    y++;
    y++;
}

function clearCanvas(){
    c.clearRect(0, 0, canvas.width, canvas.height);
}



});