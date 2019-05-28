var panel = $("#quiz-area");
var counterStart 
var counterTime = 30;


//POTENTIAL CLICK EVENTS
$(document).on('click','#start-over', function() {
  reset();
  });
  
  $(document).on('click','.answer-button', function() {
  userGuess($(this).data("name"),questions[gamePlay.currentQuestion].correctAnswer);
  });
  
  $(document).on('click', '#start', function() {
    $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
    loadQuestion();
  });

var questions = [{
  question: "What fruit will you find floating in the drink called a Manhattan?",
  answers: ["Lemon", "Lime", "Cherry", "Olive"],
  correctAnswer: "Cherry",
  image:""
}, {
  question: "What does a cubra libra have that a rum and coke does not?",
  answers: ["A lime", "Whiskey", "Diet Coke", "Grenadine"],
  correctAnswer: "A lime",
  image:""
}, {
  question: "What kind of food is Chambord?",
  answers: ["Minty Flavored Liquor", "Coffee Liquor", "Orange Liquor", "Black Raspberry Liquor"],
  correctAnswer: "Black Raspberry Liquor",
  image:""
}, {
  question: "What drink has 4/5 tequila and 1/5 tabasco sauce?",
  answers: ["A dry Winter", "Prairie Fire", "Cool Breeze", "Hot Shot"],
  correctAnswer: "Prairie Fire",
  image:""
}, {
  question: "What is in the shot Liquid Cocaine?",
  answers: ["Blackhouse", "Vodka", "Goldschlager", "Peach Schnapps"],
  correctAnswer: "Goldschlager",
  image:""
}, {
  question: "What do you get when you mix orange juice, vanilla and vodka?",
  answers: ["Mad Vodka", "Russian Rolaid", "Tummy Fixer", "Phillips Screwdriver"],
  correctAnswer: "Phillips Screwdriver",
  image:""
}, {
  question: "Mixing Scotch whisky and Drambuie will produce which drink?",
  answers: ["Old Fashioned", "Rob Roy", "Rusty Nail", "Dry Manhattan"],
  correctAnswer: "Rusty Nail",
  image:""
}, {
  question: "What product is rum distilled from?",
  answers: ["Orange Peels", "Mashed Grapes and Berries", "Sugar Cane", "Douglas Firs"],
  correctAnswer: "Sugar Cane",
  image:""
}];

var gamePlay = {
    questions:questions,
    currentQuestion:0,
    counter: counterTime,
    correct:0,
    incorrect:0,
    countdown: function(){
        gamePlay.counter --;
        $('#counter-number').html(gamePlay.counter);

        if (gamePlay.counter === 0){
            console.log("TIME'S UP")
            gamePlay.timeUp();
        }
    }   
}
 var loadQuestion = function () {
  counterStart = setInterval(gamePlay.countdown, 1000);
  panel.html('<h2>' + questions[gamePlay.currentQuestion].question + '</h2>' );
  for (var i = 0; i<questions[gamePlay.currentQuestion].answers.length; i++){
    panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[gamePlay.currentQuestion].answers[i] + '">' + questions[gamePlay.currentQuestion].answers[i]+ '</button>');
  }
}
var nextQuestion = function() {
  gamePlay.counter = countStartNumber;
  $('#counter-number').html(gamePlay.counter);
  gamePlay.currentQuestion++;
  gamePlay.loadQuestion();
}
var reset = function() {
  gamePlay.currentQuestion = 0;
  gamePlay.counter = 30;
  gamePlay.correct = 0;
  gamePlay.incorrect = 0;
  loadQuestion();
}
var userGuess = function(userGuess,correctAnswer){
  console.log(userGuess,correctAnswer)
  if(userGuess === correctAnswer){
    answeredCorrectly();
    console.log("CORRECT")
    gamePlay.counter = 30;
    $('#counter-number').html(gamePlay.counter);
  }
  else {
    answeredIncorrectly();
    console.log("KEEP TRYING")
    gamePlay.counter = 30;
    $('#counter-number').html(gamePlay.counter);
  }
}
var results = function() {
clearInterval(counterStart)
panel.html('<h2> Finished! Here is how you did!')
panel.append('<h3> Correct Answers:'+ gamePlay.correct + '<h3>')
panel.append('<h3> Incorrect Answers:'+ gamePlay.incorrect + '<h3>')
panel.append('<h3> Unanswers:'+ (questions.length - (gamePlay.correct + gamePlay.incorrect)) + '<h3>');
panel.append('<br><button id="start-over">Start Over?</button>');
}

 var answeredIncorrectly = function() {
  gamePlay.incorrect++;
  gamePlay.currentQuestion ++;
  clearInterval(counterStart);
  panel.html('<h2>Nope!</h2>');
  panel.append('<h3>The Correct Answer was: ' + questions[gamePlay.currentQuestion].correctAnswer + '</h3>');
 

  if (gamePlay.currentQuestion > questions.length - 1){
    setTimeout(function(){
      results()
    }, 3 * 1000);
  } else {
    setTimeout(function(){
      loadQuestion()
    }, 3 * 1000);
  }
}
  var answeredCorrectly = function() {
  clearInterval(counterStart);
  gamePlay.currentQuestion ++;
  gamePlay.correct++;
  panel.html('<h2>Correct!</h2>');
  console.log("GAMEPLAY", gamePlay)

  if (gamePlay.currentQuestion > questions.length - 1){
    setTimeout(function(){
      results()
    }, 3 * 1000);
  } else {
    setTimeout(function(){
      loadQuestion()
    }, 3 * 1000);
  }
}