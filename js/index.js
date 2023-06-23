
let inputDir = {x:0,y:0};
let foodSound = new Audio('music/food.mp3');
let gameOverSound = new Audio('music/gameover.mp3');
let moveSound = new Audio('music/move.mp3');
let musicSound = new Audio('music/music.mp3');
let speed = 2;
let score = 0;
let big = false;
let cld = false;
let lastPaintTime = 0;
let bigFoodTimeout; // V
let snakeArr = [
    {x:13,y:15}
];
let food = {x:6,y:7};

if(snakeArr[0].x>25)snakeArr[0].x = (snakeArr[0].x)%25;
if(snakeArr[0].y>25)snakeArr[0].y = (snakeArr[0].y)%25;

function resetBigFood() {
    big = false;
    let a = 4;
    let b = 18;
    food = {x:Math.round(a + (b-a)*Math.random()),y:Math.round(a + (b-a)*Math.random())}
  }



const freewallElement = document.getElementById('FreeWall');
freewallElement.addEventListener('click', () => {
  cld = !cld; // Toggle the value of 'cld'
});

function isCollide(snake){

for(let i = 1;i<snake.length;i++){
    if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
        return true;
    }
}

if(!cld){
    if(snake[0].x >= 25 || snake[0].x <= 0 || snake[0].y >= 25 || snake[0].y <= 0){
        return true;
    }
}

    return false;
}




function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed){
       return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function gameEngine(){
    musicSound.play();
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0,y:0};
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x:13,y:15}];
        musicSound.play();
        scoreBox.innerHTML = "Score: 0";
        score = 0;
    }
    if(snakeArr[0].x>25)snakeArr[0].x = (snakeArr[0].x)%25;
    if(snakeArr[0].y>25)snakeArr[0].y = (snakeArr[0].y)%25;
if(snakeArr[0].x === food.x  && snakeArr[0].y  === food.y){
    foodSound.play();
   
    score+=1;
    if(big===true){
        score+=4;
    }

    if(score>hiscoreval){
        hiscoreval = score;
        localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
        highScoreBox.innerHTML = "High Score: " + hiscoreval;
    }
    big = false;
    scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({x:snakeArr[0].x + inputDir.x,y:snakeArr[0].y + inputDir.y})
    let a = 2;
    let b = 22;
    speed+=0.07
    const t = Math.round(a + (b-a)*Math.random());
 
    food = {x:Math.round(a + (b-a)*Math.random()),y:Math.round(a + (b-a)*Math.random())}
    if(t%7===0){
        big = true;
        bigFoodTimeout = setTimeout(resetBigFood, 9500)
       
    }

   
}


for(let i = snakeArr.length - 2;i>=0;i--){
    snakeArr[i+1] = {...snakeArr[i]};
    console.log(snakeArr[i+1]);
}

snakeArr[0].x += inputDir.x;
snakeArr[0].y += inputDir.y;
   
   if(snakeArr[0].x>25)snakeArr[0].x = (snakeArr[0].x)%25;
    if(snakeArr[0].y>25)snakeArr[0].y = (snakeArr[0].y)%25;
    if(snakeArr[0].x<0)snakeArr[0].x = snakeArr[0].x +25;
    if(snakeArr[0].y<0)snakeArr[0].y = snakeArr[0].y +25;
    board.innerHTML = "";
   
    if (!cld) {
        board.classList.add("wall");
    } else {
        board.classList.remove("wall");
    }

    snakeArr.forEach((e,index)=>{
    

        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
       
        if (big) {
            foodElement.classList.add("big-food","food-animation"); // Add CSS class for big food
        }

        else{
            foodElement.classList.add("food", "food-animation"); 
        }
        board.appendChild(foodElement);
       
    }
    );
}


let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    highScoreBox.innerHTML = "High Score: " + hiscore;
}
window.requestAnimationFrame(main);


window.addEventListener('touchmove', (e) => {
    const touchMoveX = e.touches[0].clientX;
    const touchMoveY = e.touches[0].clientY;
  
    const diffX = touchMoveX - touchStartX;
    const diffY = touchMoveY - touchStartY;
  
    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > touchThreshold) {
        inputDir = { x: 1, y: 0 };
      } else if (diffX < -touchThreshold) {
        inputDir = { x: -1, y: 0 };
      }
    } else {
      if (diffY > touchThreshold) {
        inputDir = { x: 0, y: 1 };
      } else if (diffY < -touchThreshold) {
        inputDir = { x: 0, y: -1 };
      }
    }
  });
  

window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }; //start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
        case "w":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
        case "s":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
        case "a":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        
        case "ArrowRight":
        case "d":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});