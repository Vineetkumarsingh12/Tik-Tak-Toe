let gameInfo = document.querySelector(".gameInfo");
let boxes = document.querySelectorAll(".box");
let newGame = document.querySelector(".newGame");
let cntPlayer;
let fill;
let isGameOver; // Variable to track winning condition
const winningPos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let gridPos;

function startGame() {
  isGameOver = false;
  cntPlayer = "X";
  fill=0;
  gameInfo.textContent = `Current Player - ${cntPlayer}`;
  gridPos = ["", "", "", "", "", "", "", "", ""];

  newGame.classList.remove("active");
  
  gameInfo.classList.remove("win");
  boxes.forEach((box, index) => {
    boxes[index].textContent = "";
    boxes[index].classList.remove("win");
    boxes[index].style.pointerEvents = "all";
  });
}

startGame();


function swap() {
  //swaping function
  if (cntPlayer === "X") cntPlayer = "O";
  else cntPlayer = "X";
  gameInfo.textContent = `Current Player - ${cntPlayer}`;
}

function checkGameOver() {
    
  fill++;
    winningPos.forEach((position) => {
      if (
        gridPos[position[0]] !== "" &&
        gridPos[position[0]] === gridPos[position[1]] &&
        gridPos[position[1]] === gridPos[position[2]]
      ) {
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");
        newGame.classList.add("active");
        gameInfo.textContent = `Winner Player - ${cntPlayer}`;
        gameInfo.classList.add("win");
      
        isGameOver = true; // Set the variable to true if a winning condition is found
      }
    });
  
    console.log("false");
    return isGameOver; // Return the variable indicating the winning condition
  }

function handleClick(index) {
  if (gridPos[index] === "" && !isGameOver) {
    boxes[index].textContent = `${cntPlayer}`;
    gridPos[index] = `${cntPlayer}`;
    boxes[index].style.pointerEvents = "none";

    if (checkGameOver() == true) {
        newGame.textContent="New Game";
  
  } else {
  
    if(fill===9)
    {
        gameInfo.textContent = "Game Draw";
        newGame.textContent="New Game";
    }else if(fill==1){
        swap();
        newGame.classList.add("active");
        newGame.textContent="Reset Game";
        
        }
    else
    swap();
  }
}
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newGame.addEventListener("click", startGame);
