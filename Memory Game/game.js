
var buttonColours = ["red", "blue", "green", "yellow"];

//empty array to store the sequence of the game
var gameSequence = [];
var userClickedSequence = [];

//boolenas to help for the conditional statement and control flow
var started = false;
var level = 0;

//detect if a key has been pressed to start the game
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//when a button on the webapp has been clicked
$(".btn").click(function() {
  //get the colour clicked by the user and push it into the array
  var userChosenColour = $(this).attr("id");
  userClickedSequence.push(userChosenColour);

  //play sound and animate
  playSound(userChosenColour);
  animatePress(userChosenColour);

  //call the checkanswer functoin to determine what to do next
  checkAnswer(userClickedSequence.length-1);
});

//checkAnswer function determines if the user has gotten a correct answer and continue the game or will
//tell them they have lost
function checkAnswer(currentLevel) {
//if they got it right
    if (gameSequence[currentLevel] === userClickedSequence[currentLevel]) {
      if (userClickedSequence.length === gameSequence.length){//they get all of then correct go to next level
        setTimeout(function () {
          nextSequence();
        }, 1000);
      } // else they failed and end game
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  userClickedSequence = [];
  level++;
  $("#level-title").text("Level " + level); //update level on html
  var randomNumber = Math.floor(Math.random() * 4); // create a randon one ot add to sequence
  var randomChosenColour = buttonColours[randomNumber];
  gameSequence.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gameSequence = [];
  started = false;
}
