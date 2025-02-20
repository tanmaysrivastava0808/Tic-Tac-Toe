const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game-winner-info");
const btn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [2, 5, 8],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    box.classList = `box box${index + 1}`;
  });
  btn.classList.remove("active");
  gameinfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();

btn.addEventListener("click", initGame);

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleclick(index);
  });
});

function handleclick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    swapTurn();
    checkGameover();
  }
}

function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  gameinfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameover() {
  let answer = "";

  winningPositions.forEach((positions) => {
    if (
      (gameGrid[positions[0]] != "" ||
        gameGrid[positions[1]] != "" ||
        gameGrid[positions[2]] != "") &&
      gameGrid[positions[0]] == gameGrid[positions[1]] &&
      gameGrid[positions[1]] == gameGrid[positions[2]]
    ) {
      if (gameGrid[positions[0]] === "X") {
        answer = "X";
      } else {
        answer = "O";
      }

      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      boxes[positions[0]].classList.add("win");
      boxes[positions[1]].classList.add("win");
      boxes[positions[2]].classList.add("win");
    }
  });

  if (answer !== "") {
    btn.classList.add("active");
    gameinfo.innerText = `Winner Player - ${currentPlayer}`;
    return;
  }

  let emptycount = 0;
  gameGrid.forEach((box) =>{
    if(box !== ""){
      emptycount++;
    }
  })

  if(emptycount === 9){
    gameinfo.innerText = "Game Tied!";
    btn.classList.add("active");
  }
}
