var buttonColors = ["red", "blue", "green", "yellow"];

var sequencePattern = [];
var userPattern = [];

var gameStarted = false;
var currentLevel = 0;

$(document).keypress(function() {
  if (!gameStarted) {
    $("#level-title").text("Level " + currentLevel);
    generateNextSequence();
    gameStarted = true;
  }
});

$(".btn").click(function() {

  var chosenColor = $(this).attr("id");
  userPattern.push(chosenColor);

  playSound(chosenColor);
  animatePress(chosenColor);

  verifyAnswer(userPattern.length - 1);
});

function verifyAnswer(level) {

  if (sequencePattern[level] === userPattern[level]) {
    if (userPattern.length === sequencePattern.length) {
      setTimeout(function () {
        generateNextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    resetGame();
  }
}

function generateNextSequence() {
  userPattern = [];
  currentLevel++;
  $("#level-title").text("Level " + currentLevel);
  var randomIndex = Math.floor(Math.random() * 4);
  var chosenColor = buttonColors[randomIndex];
  sequencePattern.push(chosenColor);

  $("#" + chosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(chosenColor);
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function playSound(color) {
  var audio = new Audio("All_Sounds/" + color + ".mp3");
  audio.play();
}

function resetGame() {
  currentLevel = 0;
  sequencePattern = [];
  gameStarted = false;
}
