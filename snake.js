let canvas = document.querySelector('canvas');

let ctx = canvas.getContext('2d');

let cellSize = 50;// food or square size

// Intial length of snake and intial position
let snakeCells = [[0,0], [50,0]];

let boardwidth = 1000;
let boardheight = 600;
 
//intialising foodcell
let foodCells = genereteRandomCoords();

let Score = 0;

let direction = 'right';

let gameOver = 'false';

//Math.round(Math.random()*100/10)*10 // 10 ke multiple

let intervalid = setInterval(function() {
    update();
    draw();
}, 100);

document.addEventListener('keydown', function(event) {
    // console.log(event);
    if(event.key === 'ArrowUp'){
        direction = 'up';
    }
    else if(event.key === 'ArrowDown') {
        direction = 'down';
    }
    else if(event.key === 'ArrowLeft') {
        direction = 'left';
    }
    else {
        direction = 'right';
    }
})

function update() {
    //getting snake head
    let headX = snakeCells[snakeCells.length - 1][0];
    let headY = snakeCells[snakeCells.length - 1][1];

    //updating snake head
    let newHeadX ;
    let newHeadY ;

    if(direction === 'right') {
         newHeadX = headX + cellSize;
         newHeadY = headY;

         if(newHeadX === boardwidth) {
            gameOver = true;
         }
    }
    else if(direction === 'down') {
         newHeadX = headX;
         newHeadY = headY + cellSize;

         if(newHeadY === boardheight){
            gameOver = true;
         }
    }
    else if(direction === 'up') {
         newHeadX = headX;
         newHeadY = headY - cellSize;

         if(newHeadY < 0) {
            gameOver = true;
         }
    }
    else{
         newHeadX = headX - cellSize;
         newHeadY = headY;

         if(newHeadX < 0) {
            gameOver = true;
         }
    }
    
    //updateing snakecells array
    snakeCells.push([newHeadX, newHeadY]);

    if(newHeadX === foodCells[0] && newHeadY === foodCells[1]) {
        foodCells = genereteRandomCoords();
        Score += 1;
    }
    else{
        snakeCells.shift(); // this will tremove the first position of the snake
    }    
}

function draw() {

    //gameOver function
    if(gameOver === true) {
        clearInterval(intervalid);
        ctx.font = '50px sans-serif';
        ctx.fillText('GameOver !!!', 100, 100);
        return;
    }

    ctx.clearRect(0 , 0 , boardwidth ,boardheight);

    //snake draw
    for(let cell of snakeCells) {
        ctx.fillStyle = 'red';
        ctx.fillRect(cell[0], cell[1], cellSize, cellSize);
        // for making boarder of the snake
        ctx.strokeStyle = 'white';
        ctx.strokeRect(cell[0], cell[1], cellSize, cellSize);
    }

    //food draw
    ctx.fillStyle = "green";
    ctx.fillRect(foodCells[0], foodCells[1], cellSize, cellSize);

    //Score draw
    ctx.font = '24px sans-serif'
    ctx.fillText(`Score: ${Score}`, 20,20);


}

// Genrating food
function genereteRandomCoords() {
    return [
        Math.round((Math.random()*(boardwidth - cellSize)) / cellSize) * cellSize,
        Math.round((Math.random()*(boardheight - cellSize)) / cellSize) * cellSize,
    ]
}

