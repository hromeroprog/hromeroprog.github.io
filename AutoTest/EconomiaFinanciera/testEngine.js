$(document).ready(function(){
    $("#SelectAll").click(function(){
            console.log("entering");
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
            comenzarCuestionario(temas, 20);
        }
        $("body .setup").hide();
        
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
    console.log(indexes_of_start_of_question);
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
        if (option[option.length-1]=="*" && option[option.length-2]== "*") break;
    }
    
    for(i = 1; i < questionAndAnswers.length; i++){
        var html_to_inyect = "<button class ='";
        option = questionAndAnswers[i];
        if(i == correcta){
            option = option.slice(0, option.length-2);
            html_to_inyect+="correcta'>"
        }
        else{
            html_to_inyect+="incorrecta'>"
        }
        //METER OPCION EN EL HTML
        html_to_inyect += option + "</button>"
        var object_topic_message = $(".question .respuestas");
        console.log("INYECTANDO");
        $(object_topic_message).append(html_to_inyect);
    }
    
}

function getQuestiondAndAnswersFromLines(questionLines){
    console.log("Question_lines");
    console.log(questionLines.length);
    var i;
    for(i = 0; i < questionLines.length; i++){
        if(questionLines[i].indexOf("a.") == 0)
            break;
    }
    end_of_question = i;
    console.log("End of question:")
    console.log(end_of_question);
    
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
    file = "./BaseDeDatos/" + tema + ".txt";
    text = askQuestion(file);

    //parseFile(file);
    
}