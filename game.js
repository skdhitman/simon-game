var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStart = false;

function nextSequence() {
  userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor((Math.random()*4));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    animatePress(randomChosenColour);
    var sound = new Audio("sounds/" + randomChosenColour + ".mp3");
    sound.play();
    console.log(gamePattern);
}

function playSound(currentAudio) {
  var sound = new Audio("sounds/" + currentAudio + ".mp3");
  sound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  $("#" + currentColour).fadeOut(100).fadeIn(100);
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
    },
    100);
}

function comparePatterns(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").html("<span>Game Over!</span><br><h2>Your final level was " + level + ".<br><br>Press Any Key to Restart..</h2>");
    $("h1 h2").addClass("rem-2");
    $("h1 span").addClass("game-over-title");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver() {
  gameStart = false;
  gamePattern = [];
  level = 0;
}

// $("#" + chosenColour).animate({opacity: 0.5});
// $("#" + chosenColour).fadeOut(100).fadeIn(100);


// Defining event handler on any 'Key Press' in the start

$(document).keypress(function () {
  if (!gameStart) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStart = true;
    // $("h1 h2").removeClass("rem-2");
    // $("h1 span").removeClass("game-over-title");
  }
});


// Defining event handler on click
$(".btn").on("click", function (event) {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  console.log(userClickedPattern);
  comparePatterns(userClickedPattern.length - 1);
})
