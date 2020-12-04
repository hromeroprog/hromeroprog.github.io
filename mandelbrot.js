$(document).ready(function(){
    var canvas = $("canvas")[0];
    canvas.width = (window.innerWidth * 0.8);
    canvas.height = (window.innerHeight * 0.5);
    alert(window.innerWidth);
    var c = canvas.getContext("2d");


    for (var col = 0; col < canvas.width; col++){
        for(var row = 0; row < canvas.height; row++){
            var greyscale = ((row+col)/(canvas.width+canvas.height))*255;
            var color = "rgb(" + greyscale + "," + greyscale + "," + greyscale + ")";
            c.fillStyle = color;
            c.fillRect(col, row, 1, 1);
        }
    }
});

