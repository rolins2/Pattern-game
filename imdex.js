var buttonColors = ["red", "blue", "green", "yellow"];
var gamePatteerns = [];
var userClickedPatterns = [];
var level = 0;

function nextSequence() {
  var seqNumber = Math.round(Math.random() * 3);
  level += 1;
  userClickedPatterns = [];

  var randomChosenColor = buttonColors[seqNumber];

  gamePatteerns.push(randomChosenColor);
  playSound(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn();

  $("h1").text("Level " + level);
}

$(".btn").click(function () {
  var vals = $(this).attr("id");
  userClickedPatterns.push($(this).attr("id"));
  playSound(vals);
  animatePress(vals);
  checkAnswer(userClickedPatterns.length - 1);
});

function playSound(name) {
  var aud = new Audio("./sounds/" + name + ".mp3");
  aud.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 500);
}

$(document).keydown(function (event) {
  if (level === 0) {
    $("h1").text("Level " + level);
    nextSequence();
  }
});

function checkAnswer(currentLevel) {
  if (userClickedPatterns[currentLevel] === gamePatteerns[currentLevel]) {
    console.log("Success");
    if (userClickedPatterns.length === gamePatteerns.length) {
      setTimeout(function () {
        nextSequence();
      }, 500);
    }
  } else {
    console.log("failure");
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePatteerns = [];
}
