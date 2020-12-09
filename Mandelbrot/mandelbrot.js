var canvas = $("canvas")[0];
var c = canvas.getContext("2d");
var MAX_COMPUTE_PER_POINT_MAX_ITER = 100;
var MAX_COMPUTE_PER_POINT;

var currentMinX, currentMaxX, currentMinY, currentMaxY;
const defaultMinX = -2.2;
const defaultMaxX = 1.6;

$(document).ready(function(){
    var x_scaler = 0.6;
    setupCanvas(x_scaler);
    setupCanvasCursor();

    var default_min_y = -(defaultMaxX-defaultMinX)*(canvas.height/canvas.width)/2;

    parcialMandelbrot(defaultMinX, defaultMaxX, default_min_y);
    const cursor = $('.cursor');

    var left_limit = $(canvas).offset().left + cursor.outerWidth()/2; 
    var top_limit = $(canvas).offset().top + cursor.outerHeight()/2;
    var right_limit = left_limit + $(canvas).outerWidth() - cursor.outerWidth();
    var bottom_limit = top_limit + $(canvas).outerHeight() - cursor.outerHeight();
    

    $(function(){
        $(window).resize(function(){
            left_limit = $(canvas).offset().left + cursor.outerWidth()/2; 
            top_limit = $(canvas).offset().top + cursor.outerHeight()/2;
            right_limit = left_limit + $(canvas).outerWidth() - cursor.outerWidth();
            bottom_limit = top_limit + $(canvas).outerHeight() - cursor.outerHeight();
        });

        $(canvas).mousemove(function(e){
            cursor.show();
            cursor.css("cursor", "none");
            var x = e.pageX;
            var y = e.pageY;

            cursor.css({"left": x - cursor.outerWidth()/2, "top": y - cursor.outerHeight()/2});
            if (x < left_limit) cursor.css("left", $(canvas).offset().left);
            if (x > right_limit) cursor.css("left", $(canvas).offset().left + $(canvas).outerWidth() - cursor.outerWidth());
            if (y < top_limit) cursor.css("top", $(canvas).offset().top);
            if (y > bottom_limit) cursor.css("top", $(canvas).offset().top +$(canvas).outerHeight() - cursor.outerHeight());
        });

        $(cursor).mousemove(function(e){
            var x = e.pageX;
            var y = e.pageY;
            
            cursor.css({"left": x - cursor.outerWidth()/2, "top": y - cursor.outerHeight()/2});
            if (x < left_limit) cursor.css("left", $(canvas).offset().left);
            if (x > right_limit) cursor.css("left", $(canvas).offset().left + $(canvas).outerWidth() - cursor.outerWidth());
            if (y < top_limit) cursor.css("top", $(canvas).offset().top);
            if (y > bottom_limit) cursor.css("top", $(canvas).offset().top +$(canvas).outerHeight() - cursor.outerHeight());
        });

        $(cursor).mouseleave(function(e){
            cursor.hide();
        });

        $(cursor).click(function(e){
            var x = e.pageX;
            var y = e.pageY;
            //cuidado con los casos extremos: falta corregirlos
            var left_box = x - cursor.outerWidth()/2;
            var right_box = x + cursor.outerWidth()/2;
            var bottom_box = y + cursor.outerHeight()/2;

            var x_left_percent = ((left_box-$(canvas).offset().left)/$(canvas).outerWidth());
            var x_right_percent = ((right_box-$(canvas).offset().left)/$(canvas).outerWidth());

            var y_bottom_percent = (($(canvas).offset().top + $(canvas).outerHeight() - bottom_box)/$(canvas).outerHeight());
            console.log(y_bottom_percent);

            
            var minX = currentMinX + (currentMaxX - currentMinX)*x_left_percent;
            var maxX = currentMinX + (currentMaxX - currentMinX)*x_right_percent;
            var minY = currentMinY + (currentMaxY - currentMinY)*y_bottom_percent;

            parcialMandelbrot(minX, maxX, minY);
        });

    });

});

async function parcialMandelbrot(min_x, max_x, min_y){
    currentMaxX = max_x;
    currentMinX = min_x;
    currentMinY = min_y;

    console.log("computing x: " + min_x + " - " + max_x);
    console.log("computing y: " + min_y);

    $(canvas).css("cursor", "wait");
    for(var i = 1; i < 5; i++){
        MAX_COMPUTE_PER_POINT = Math.floor(MAX_COMPUTE_PER_POINT_MAX_ITER*i/4);
        paintMandelbrot(min_x, max_x, min_y);
        await sleep(1);
    }
    $(canvas).css("cursor", "pointer");
}

function setupCanvas(width_resize){
    canvas.width = (window.innerWidth * width_resize);
    canvas.height = Math.floor(canvas.width * (2/3));
}

function setupCanvasCursor(){
    $(".cursor").css({"width": $(canvas).outerWidth()/6, "height": $(canvas).outerHeight()/6});
}

function paintMandelbrot(min_x, max_x, min_y){
    var step = (max_x - min_x) / canvas.width;

    currentMaxY = min_y + step*(canvas.height - 1);

    var x = min_x;
    var y = currentMaxY;

    for (var col = 0; col < canvas.width; col++){
        for(var row = 0; row < canvas.height; row++){
            var computed_color = obtain_color(x, y);
            var color = "rgb(" + computed_color[0] + "," + computed_color[1] + "," + computed_color[2] + ")";
            c.fillStyle = color;
            c.fillRect(col, row, 1, 1);
            y-=step;

        }
        y = currentMaxY;
        x += step;
    }

    
    console.log("currentMaxY: " + currentMaxY);
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }






