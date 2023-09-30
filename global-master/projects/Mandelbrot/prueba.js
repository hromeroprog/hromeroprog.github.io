$(document).ready(function(){
var canvas = $("canvas")[0];
var c = canvas.getContext("2d");

canvas.width = $(".canvas_container").outerWidth();
canvas.height = $(".canvas_container").outerHeight();

var c1 = new Circle(40,40,50,"red", 1, 2, c);
var c2 = new Circle(150,200,50,"red", -1, 2, c);
var circle_array = [c1, c2];

animate();

function animate() {
	requestAnimationFrame(animate);
    clearCanvas();
    
    for(let circle of circle_array){
        circle.draw();
        circle.update();
    }
};

});

function clearCanvas(){
    var canvas = $("canvas")[0];
    var c = canvas.getContext("2d");
    c.clearRect(0, 0, canvas.width, canvas.height);
}

