$(document).ready(function(){
    var canvas = $("canvas")[0];
    canvas.width = (window.innerWidth * 0.8);
    alert(window.innerWidth);
    var c = canvas.getContext("2d");


    //LINE
    c.beginPath();
    c.moveTo(40, 40);
    c.lineTo(200, 100);
    c.strokeStyle = "white";
    c.stroke();
});

