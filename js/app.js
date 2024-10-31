// Tic-tac-toe
const gameBoard = document.querySelector(".gameboard");
const infoDisplay = document.querySelector(".info");
const startCells = ["", "", "", "", "", "", "", "", ""];
// Go
let go = "circle";

// Create Board Squares
const createBoard = () => {
  startCells.forEach((_cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    infoDisplay.textContent = "Circle goes First";
    cellElement.addEventListener("click", addGo);
    gameBoard.append(cellElement);
  });
};

createBoard();

// Add-Go
function addGo(e) {
  const goDisplay = document.createElement("div");
  goDisplay.classList.add(go);
  e.target.append(goDisplay);
  go = go === "circle" ? "cross" : "circle";
  infoDisplay.textContent = `It's Now ${go}'s go`;
  e.target.removeEventListener("click", addGo);
  checkScore();
}

// Check Score
function checkScore() {
  const allSquares = document.querySelectorAll(".square");
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  winningCombos.forEach((array) => {
    const circleWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("circle")
    );
    if (circleWins) {
      infoDisplay.textContent = "Circle Wins!";
      updateStyles("circle");
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
    }
  });

  winningCombos.forEach((array) => {
    const crossWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("cross")
    );
    if (crossWins) {
      infoDisplay.textContent = "Cross Wins!";
      updateStyles("cross");
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
    }
  });
}

// Update Styles And Reload
function updateStyles(winner) {
  const color = winner === "circle" ? "rgb(58, 79, 235)" : "red";
  infoDisplay.style.backgroundColor = color;
  infoDisplay.style.boxShadow = `0 0 20px ${color}`;
  gameBoard.style.borderColor = color;
  gameBoard.style.boxShadow = `0 0 20px ${color}`;
  setTimeout(() => {
    window.location.reload();
  }, 3000);
}
