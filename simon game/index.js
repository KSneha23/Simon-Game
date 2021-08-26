var buttonColours = ["blue", "yellow", "red", "green"];

var gamePattern=[];
var userClickedPattern=[];

let level=0;
let count=0;

for(let j=0; j<4; j++){
  document.querySelectorAll(".button")[j].addEventListener("click", function(){

    let userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    console.log(userClickedPattern);

    checkAnswer(userClickedPattern.length-1);
  });
}

document.addEventListener("keydown", function(event){
  if(count==0){nextSequence(); }
  count++;
});

function nextSequence(){
  userClickedPattern=[];

  level++;
  document.querySelector(".heading").innerHTML="Level "+level;

  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  document.querySelector("."+randomChosenColour).classList.add("pressed");
  setTimeout(function () {
    document.querySelector("."+randomChosenColour).classList.remove("pressed");
  }, 200);

  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
}

function checkAnswer(currentLevel){

  if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
    if(currentLevel==gamePattern.length-1){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else{
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    document.querySelector("body").classList.add("game-over");
    setTimeout(function () {
      document.querySelector("body").classList.remove("game-over");
    }, 200);
    document.querySelector(".heading").innerHTML="Game Over, Press Any Key to Restart";
    startOver();
  }
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){

  let activeKey=document.querySelector("."+currentColor);
  activeKey.classList.add("userPressed");

  setTimeout(function () {
    activeKey.classList.remove("userPressed");
  }, 100);
}
function startOver(){
  level=0;
  gamePattern=[];
  count=0;
}
