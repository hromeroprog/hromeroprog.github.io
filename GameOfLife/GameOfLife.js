
$(document).ready(function(){

    var down = false;
    var escenario = $("div.life_container");
    width = escenario.width();
    height = escenario.height();
    setProperDimensions(escenario, width, height);
    dim = insertarCelulas(escenario);
    map = createMap(dim[0], dim[1]);
    escape_simulation = false;
    
    iteration = 0;
    async function run_simulation(){
        console.log("Running");
        escape_simulation = false;
        processed_map = JSON.parse(JSON.stringify(map));
        while(!escape_simulation){
            for(row = 0; row < map.length;row++){
                for(col = 0; col< map[0].length; col++){
                    processed_map[row][col] = stepCell(row, col, map);
                }
            }
            map = JSON.parse(JSON.stringify(processed_map));
            await new Promise(r => setTimeout(r, 150));
            applyMap(map);
            iteration++;
            console.log(iteration);
        } 
        console.log("Escaping");
    }

    $("#comenzar").on("click", run_simulation);

    $("#parar").on("click", function(){
        escape_simulation = true;
    });

    $("div.life_container>.cell").on( "mouseenter", function() {
        if(down) switchCellState($(this));;
    });
    
    $("div.life_container>.cell").on( "mousedown", function(){
        switchCellState($(this));
    });

    $("div.life_container").on("drag", null);

    $(document).mousedown(function() {
        down = true;
    }).mouseup(function() {
        down = false;  
    });

    function switchCellState(cell){

        cell.toggleClass("active");
        cell_id = cell.attr("id");
        row_col = cell_id.substring(cell_id.indexOf("(")+1, cell_id.indexOf(")")).split(",");
        row = row_col[0];
        col = row_col[1];
        map[row][col] = (map[row][col]+1)%2;
    }

});

function applyMap(map){
    for(row = 0; row < map.length;row++){
        for(col = 0; col< map[0].length; col++){
            cell_id  = "#cell\(" +row +  "," + col + "\)";
            
            cell = $("#cell\\(" +row +  "\\," + col + "\\)");

            if (map[row][col] == 0){
                cell.removeClass("active");
            }
            if (map[row][col] == 1){
                cell.addClass("active");     
            }
        }
    }
}


function stepCell(row, col, current_map){
    currentStatus = current_map[row][col];
    surround = 0;
    for(i=-1; i <2; i++){
        for(j=-1; j<2; j++){
            if (!(i==0 && j== 0) && !(row+i < 0 || row+i>=current_map.length) && !(col+j<0 || col+j>=current_map[0].length)){
                surround += current_map[row+i][col+j];
            } 
        }
    }
    if (currentStatus == 1){
        if (surround!=2 && surround!=3){
            return 0;
        }
        return 1;
    }
    else{
        if (surround == 3) {
            return 1;
        }
        return 0;
    }
}


function setProperDimensions(escenario, width, height){
    cell_size = 20;
    new_width = width - width%cell_size + cell_size;
    new_height = height - height%cell_size + cell_size;
    escenario.width(new_width + "px");
    escenario.height(new_height + "px");
}

function insertarCelulas(escenario){
    cell_size = 20;
    rows = escenario.height()/20;
    cols = escenario.width()/20;
    result = "";
    escenario.html("");
    for (row = 0; row < rows; row++){
        for(col = 0; col < cols; col++){
            text = "<div class = 'cell' id = 'cell(" + row + "," + col + ")'></div>";
            escenario.append(text);
        }
    }
    return [rows, cols];
}

$( window ).resize(function() {
    escenario = $("div.life_container");
    setProperDimensions(escenario, $("body").width()*0.8, $("body").height()*0.5);
    insertarCelulas(escenario);
});

function createMap(rows, cols){
    return Array(rows).fill().map(() => Array(cols).fill(0));
}