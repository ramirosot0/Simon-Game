
var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").on("click", function(){
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence(){
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColors = buttonColors[randomNumber];
  gamePattern.push(randomChosenColors);

  playSound(randomChosenColors);
  console.log(gamePattern);
}

function playSound(name){
  $("#" + name).fadeOut(100).fadeIn(100);
  var colour = new Audio("sounds/" + name + ".mp3");
  colour.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass('pressed');

  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success!!");

    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence()
      }, 1000);
    }
  }
  else {
    console.log("wrong!!");
    var colour = new Audio("sounds/wrong.mp3");
    colour.play();

    $("body").addClass('game-over');
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}