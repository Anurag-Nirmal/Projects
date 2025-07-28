let inputDir = {x : 0 , y : 0};
const foodsound = new Audio("food.mp3");
const gameOverSound = new Audio ("gameover.mp3");
const moveSound = new Audio( "move.mp3");
const musicSound = new Audio ("music.mp3");
let speed = prompt("4-6 easy , 7-9  medium , 10-yourwish hard : ")
//let speed = 4.5;
let lastPaintTime = 0;
let score = 0 ;
let snakearr = [
  {x : 13 , y : 15}
];

food =   {x : 12 , y : 10};

//Game function
function main(ctime){
  window.requestAnimationFrame(main);
  if((ctime - lastPaintTime)/1000 < 1/speed){
    return;
  };
  lastPaintTime = ctime;
 gameEngine();

}

function isCollide(snakearr){
  //if you bump into yourself
  for(let i=1 ; i<snakearr.length ; i++){
    if(snakearr[i].x === snakearr[0].x && snakearr[i].y === snakearr[0].y){
      return true;
    }
  }
    if (snakearr[0].x >= 18 || snakearr[0].x <=0 || snakearr[0].y >= 18 || snakearr[0].y <=0 ){
     return true;
    }

  
}


function gameEngine(){musicSound.play();
 //Updating the snake array & food
 if(isCollide(snakearr)){
  gameOverSound.play();
  musicSound.pause();
  inputDir = {x : 0, y : 0};
  alert ("Game Over. Press any key to play again!");
  snakearr = [ {x : 13 , y : 15} ];
  musicSound.play();
  score = 0;

 }
 
 //If you have eaten the food , increment the score and regenerate the food 
 if (snakearr[0].y=== food.y && snakearr[0].x=== food.x){
  foodsound.play();
  score +=1;
  if (score > highscoreval){
    highscoreval=score;
    localStorage.setItem("highscore", JSON.stringify(highscoreval));
    highScoreBox.innerHTML = "HighScore : " + highscoreval; 
  }
  scoreBox.innerHTML = "Score : " + score;
  snakearr.unshift({x : snakearr[0].x + inputDir.x , y : snakearr[0].y + inputDir.y});
  let a = 2;
  let b = 16; 

  food = {x : Math.round(a + (b-a) * Math.random()),y : Math.round(a + (b-a) * Math.random())};
 }

 //Moving the snake
 for (let i = snakearr.length-2; i>=0; i--){
  const element = snakearr[i];
  snakearr[i+1] = {...snakearr[i]};
 }

 snakearr[0].x += inputDir.x;
 snakearr[0].y += inputDir.y;



  //Display the snake
  board.innerHTML = " ";
  snakearr.forEach((e,index)=>{
   snakeElement = document.createElement("div");
   snakeElement.style.gridRowStart = e.y;
   snakeElement.style.gridColumnStart = e.x;
   
   if (index === 0){
    snakeElement.classList.add("head");
   }
   else {
    snakeElement.classList.add("snake");
   }
   board.appendChild(snakeElement);
  });
  //Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//Main logic starts here 
let highscore = localStorage.getItem("highscore");

if(highscore === null){
  highscoreval = 0 ;
  localStorage.setItem("highscore", JSON.stringify(highscoreval))
}
 else {
  highscoreval = JSON.parse(highscore);
  highScoreBox.innerHTML = "HighScore : " + highscoreval; 
 }
window.requestAnimationFrame(main);
window.addEventListener("keydown",e => {
  inputDir = {x: 0 , y: 1} //start the game
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console .log("arrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

      case "ArrowDown":
      console .log("arrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

      case "ArrowLeft":
      console .log("arrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

      case "ArrowRight":
      console .log("arrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      break;
        }
});