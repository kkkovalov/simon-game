$('body').keypress(function (){
  if(level == 0) nextSequence();
})

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [], userClickedPattern = [], level = 0;

function nextSequence(){
  level++;
  userClickedPattern = [];
  let newText = "Level " + level;
  $('h1').text(newText);
  let randomNumber = Math.floor(Math.random()*4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

$(".btn").click(function(event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
  console.log(userClickedPattern);
});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    if(currentLevel+1 == level){
      setTimeout(function () {
        nextSequence();
      }, 1000);}
  }
  else gameOver();
}

function playSound(name){
  var audio = new Audio ("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass('pressed');
  setTimeout(function () {$("#"+currentColour).removeClass('pressed');}, 100);
}


function gameOver(){
  $('body').addClass("game-over");
  setTimeout(function () {
    $('body').removeClass("game-over");
  }, 200);
  $('h1').text("Game Over, Press Any Key to Restart");
  level = 0;
  gamePattern = [];
}
