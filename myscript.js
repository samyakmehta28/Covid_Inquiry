/*global document*/
var questions = [{
    question: "Are you covid positive?",
    choices: ["Yes", "No"],
    correctAnswer: 1
}, {
    question: "Do you have any symptoms of covid?",
    choices: ["Yes", "No"],
    correctAnswer: 1
}, {
    question: "Have you been in contact with anyone who has covid or is showing symptoms of covid?",
    choices: ["Yes", "No"],
    correctAnswer: 1
}, {
    question: "Have you travelled out of your city/town in the last two weeks?",
    choices: ["Yes", "No"],
    correctAnswer: 1
}, {
    question: "Have you received atleast one dose of vaccination?",
    choices: ["Yes", "No"],
    correctAnswer: 0
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function() {
        displayCurrentQuestion();
     $(this).find(".quizMessage").hide();
     $(this).find(".nextButton").on("click", function() {
        if(!quizOver){
         value = $("input[type='radio']:checked").val();
         if(value==undefined){
             $(document).find(".quizMessage").text("Please select an option");
             $(document).find(".quizMessage").show();
         } else {
             $(document).find(".quizMessage").hide();
             if(value == questions[currentQuestion].correctAnswer){
                 correctAnswers++;
             }
             currentQuestion++;
             if(currentQuestion < questions.length){
                 displayCurrentQuestion();
             } else {
                 displayScore();
                 $(document).find(".nextButton").text("Submit Again?");
                 quizOver = true;
             }
         }
        } else {
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }   
 });
});
function displayCurrentQuestion() {
    //console.log("In display current Question");
    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;
    $(questionClass).text(question);
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    if(correctAnswers == questions.length){
        $(document).find(".quizContainer > .result").text("You are safe!");
    $(document).find(".quizContainer > .result").show();
    } else {
        $(document).find(".quizContainer > .result").text("You are NOT safe!");
    $(document).find(".quizContainer > .result").show();
    }
}

function hideScore() {
    $(document).find(".result").hide();
}
