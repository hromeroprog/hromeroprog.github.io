var canvas = $("canvas")[0];
var c = canvas.getContext("2d");
const MAX_COMPUTE_PER_POINT = 80;

$(document).ready(function(){
    var x_scaler = 0.6;
    setupCanvas(x_scaler);
    var min_x = -2.2;
    var max_x = 2;
    var min_y = -(max_x-min_x)*(canvas.height/canvas.width)/2;

    paintMandelbrot(min_x, max_x, min_y);
    
});

function setupCanvas(width_resize){
    canvas.width = (window.innerWidth * width_resize);
    canvas.height = Math.floor(canvas.width * (2/3));
}

function paintMandelbrot(min_x, max_x, min_y){
    var step = (max_x - min_x) / canvas.width;

    var x = min_x;
    var y = min_y;

    for (var col = 0; col < canvas.width; col++){
        for(var row = 0; row < canvas.height; row++){
            var computed_color = obtain_color(x, y);
            var color = "rgb(" + computed_color[0] + "," + computed_color[1] + "," + computed_color[2] + ")";
            c.fillStyle = color;
            c.fillRect(col, row, 1, 1);
            y+=step;
        }
        y = min_y;
        x += step;
    }
}

function obtain_color(x, y){
    var diverge_ratio = diverge(x, y);
    var red = Math.floor(diverge_ratio*255/MAX_COMPUTE_PER_POINT);
    var green = 0;
    var blue = 0;
    var color = [red, green, blue];
    return color;
}

function diverge(x, y){
    var cont = 1;
    var current_p = [x, y];
    while (true){
        if (cont >= MAX_COMPUTE_PER_POINT) break;
        if (module(current_p) > 4) break;
        current_p = nextTerm([x, y], current_p);
        cont++;
    }
    return cont;
}

function nextTerm(c_point, current_term){
    var a =  c_point[0] + current_term[0]**2 - current_term[1]**2
    var b = c_point[1] + (2*current_term[0]*current_term[1])
    return [a,b]
}

function module(point){
    return point[0]**2 + point[1]**2
}






