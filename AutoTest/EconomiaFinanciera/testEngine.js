$(document).ready(function(){
    LONGITUD_CUESTIONARIO = 10;
    $("#SelectAll").click(function(){
            var inputs = $('form input');
            for(i = 0; i < inputs.length - 1; i++){
                $(inputs[i]).prop("checked", $("#SelectAll").prop("checked"));  
            }
    });

    $( "#COMENZAR" ).click(function() {
        var inputs = $('form input');
        var temas = [];
        for(i = 0; i < inputs.length - 1; i++){
            if ($(inputs[i]).prop("checked")){
                temas.push(inputs[i].id);
            }
        }
        if(temas.length > 0){
            comenzarCuestionario(temas, LONGITUD_CUESTIONARIO);
        }
        $("body .setup").hide();
        $("body .question").show();
        $("body .fin_de_cuestionario").show();
        
    });

    

});

class Texto {
    constructor(text) {
      this.text = text;
    }
    set setText(text){
        this.text = text;
    }
  }
function askQuestion(filename){
    fetch(filename)
  .then(response => response.text())
  .then(data => {
  	// Do something with your data
  	parseFile(data);
  });
}

function isNumeric(num){
    numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    return numbers.indexOf(num) != -1
}

function parseFile(text){

    lines = text.split("\n");
    indexes_of_start_of_question = [];
    for(i = 0; i < lines.length;i++){
        startingchar = lines[i][0];
        afterDot = lines[i][lines[i].indexOf(".") +1];
        if(isNumeric(startingchar) && !isNumeric(afterDot)){
            indexes_of_start_of_question.push(i);
        }
    }
    index = getRandomInt(0, indexes_of_start_of_question.length-1)
    startOfQuestion = indexes_of_start_of_question[index]
    endOfQuestion = 0
    if (index != indexes_of_start_of_question.length-1){
        endOfQuestion = indexes_of_start_of_question[index+1]
    }
    else{
        endOfQuestion = lines[lines.length];
    }
    questionLines = lines.slice(startOfQuestion,endOfQuestion);
    questionAndAnswers = getQuestiondAndAnswersFromLines(questionLines); 
    setQuestion(questionAndAnswers)
    
}

function setQuestion(questionAndAnswers){
    $(".question .enunciado").html(questionAndAnswers[0]);
    var correcta;
    for(correcta = 1; correcta < questionAndAnswers.length; correcta++){
        option = questionAndAnswers[correcta];

        if (option[option.length - 2]=="*" && option[option.length-1] == "*"){
            break;
        }
    }
    if(correcta == questionAndAnswers.length){
        alert("Esta pregunta no tiene guardada la respuesta correcta, si quieres mandame el resultado y trataré de añadirlo cuanto antes");
    }
    
    for(i = 1; i < questionAndAnswers.length; i++){
        var html_to_inyect = "<button class ='";
        option = questionAndAnswers[i];
        if(i == correcta){
            option = option.slice(0, option.length-3);
            html_to_inyect+="correcta'>"
        }
        else{
            html_to_inyect+="incorrecta'>"
        }
        //METER OPCION EN EL HTML
        html_to_inyect += option + "</button>"
        var object_topic_message = $(".question .respuestas");
        $(object_topic_message).append(html_to_inyect);
    }
    
}

function getQuestiondAndAnswersFromLines(questionLines){
    var i;
    for(i = 0; i < questionLines.length; i++){
        if(questionLines[i].indexOf("a.") == 0)
            break;
    }
    end_of_question = i;
    
    lines_of_question = questionLines.slice(0, end_of_question);
    question = lines_of_question.join("\n");
    result = [question];

    lines_of_answers = questionLines.slice(end_of_question, questionLines.length);
    vocals = ["a", "b", "c", "d"]
    answer = "";
    for(i = 0; i < lines_of_answers.length;i++){

        if (lines_of_answers[i].indexOf(".") == 1 && vocals.indexOf(lines_of_answers[i][0]) != -1){
            if (answer != ""){
                result.push(answer);
            }
            answer = lines_of_answers[i];
        }
        else{
            answer = answer + "\n" + lines_of_answers[i];
        }   
    }
    result.push(answer);
    return result;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function comenzarCuestionario(temas, numero_de_preguntas){
    tema = temas[getRandomInt(0, temas.length-1)];
    $("body .question h2").html("Pregunta del tema: " + tema.slice(4, tema.length));
    $("body .question .nota_actual").html("Nota: 0/0");
    $("body .question .avance_cuestionario").html("Avance: 1/" + numero_de_preguntas);
    file = "./BaseDeDatos/" + tema + ".txt";
    text = askQuestion(file);
    not_answered = true;
    question_number = 1;
    aciertos = 0;

    //parseFile(file);
    $(document).on("click", ".respuestas button" , function() {
        if ($(this).attr("class") == "correcta"){
            $(this).css({"color": "rgba(20, 240,20,0.8)", "border-color":"rgba(20, 240,20,0.5)"});
            if(not_answered){
                aciertos++;
            }
        }
        else{
            $(this).css({"color": "rgba(240, 20,20,0.8)", "border-color":"rgba(240, 20,20,0.5)"});
        }
        
        html_to_inyect = "<button id = 'siguiente'> SIGUIENTE </button>"
        var object_topic_message = $(".question .respuestas");
        if(not_answered){
            $(object_topic_message).after(html_to_inyect);
            not_answered = false;
            question_number++;
        }
        string_current_nota = "Nota: " + aciertos + "/" + (question_number - 1);
        console.log(string_current_nota);
        $("body .question .nota_actual").html(string_current_nota);
    });

    $(document).on("click", "#siguiente" , function() {
        $(".respuestas button").remove();
        $("#siguiente").remove();
        not_answered = true;
        if (question_number <= numero_de_preguntas){
            tema = temas[getRandomInt(0, temas.length-1)];
            $("body .question h2").html("Pregunta del tema: " + tema.slice(4, tema.length));
            string_avance = "Avance: " + question_number + "/" + numero_de_preguntas;
            console.log(string_avance);
            $("body .question .avance_cuestionario").html(string_avance);
            file = "./BaseDeDatos/" + tema + ".txt";
            text = askQuestion(file); 
        }
        else{
            nota_final = "" + aciertos + "/" + numero_de_preguntas;
            $(".nota_final").html(nota_final);
            $(".enunciado").html("");
            $("body .question h2").html("");
        }

    });

    $(".fin_de_cuestionario").click(function(){
        $("body .setup").show();
        $("body .question").hide();
        $("body .fin_de_cuestionario").hide();
    })
}