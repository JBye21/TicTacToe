const gameBoard = {
  boardBlocks: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  turn: null,

  createBoard() {
    const blockContainer = document.querySelector('#blockContainer');
    blockContainer.getAttribute('id', 'blockContainer');

    for (let i = 0; i < this.boardBlocks.length; i++) {
      const newBlock = document.createElement('div');
      newBlock.classList.add('block');
      newBlock.setAttribute('id', `block${i}`);
      newBlock.addEventListener('click', (e) => this.blockActivator(newBlock));
      blockContainer.appendChild(newBlock);
    }
    this.turn = playerOne;
  },

  blockActivator(block) {
    if ((block.innerText !== 'X' && block.innerText !== 'O') && (playerOne.score !== 4 && playerTwo.score !== 4)) {
      block.innerText = this.turn.icon;
      this.turn.clickedBlocks.push(block.id);

      const currentArray = this.turn.clickedBlocks;
      console.log(currentArray);

      if (currentArray.length > 2) {
        for (let i = 0; i < 3; i++) {
          if (currentArray.includes(`block${i}`) && currentArray.includes(`block${i + 3}`) && currentArray.includes(`block${i + 6}`)) {
            this.winDeclaration(this.turn);
          }
        }
        for (let i = 0; i < 7; i += 3) {
          if (currentArray.includes(`block${i}`) && currentArray.includes(`block${i + 1}`) && currentArray.includes(`block${i + 2}`)) {
            this.winDeclaration(this.turn);
          }
        }
        if (currentArray.includes(`block${0}`) && currentArray.includes(`block${4}`) && currentArray.includes(`block${8}`)) {
          this.winDeclaration(this.turn);
        }
        if (currentArray.includes(`block${6}`) && currentArray.includes(`block${4}`) && currentArray.includes(`block${2}`)) {
          this.winDeclaration(this.turn);
        }
        if (playerOne.clickedBlocks.length == 5 && playerTwo.clickedBlocks.length == 4) {
          declarationDiv.innerText = "It's a Draw!";
          return this.newRound();
        }
        if (playerOne.clickedBlocks.length == 4 && playerTwo.clickedBlocks.length == 5) {
          declarationDiv.innerText = "It's a Draw!";
          return this.newRound();
        }
      }
    }
    if (this.turn == playerOne) {
      this.turn = playerTwo;
    } else {
      this.turn = playerOne;
    }
  },

  winDeclaration(player) {
    declarationDiv.innerText = `${player.name} won that round!`;
    player.score += 1;

    if (player.score == 4) {
      playerOneScore.innerText = `${playerOne.name}'s score = ${playerOne.score}`;
      playerTwoScore.innerText = `${playerTwo.name}'s score = ${playerTwo.score}`;
      return declarationDiv.innerText = `Game over - ${player.name} is the champion!`;
    }
    this.newRound();
  },

  newRound() {
    // Take players array of blocks and erase

    playerOne.clickedBlocks = [];
    playerTwo.clickedBlocks = [];

    // Change inner text of board blocks

    const blockContainer = document.querySelector('#blockContainer');
    const blocks = blockContainer.childNodes;

    for (let i = 0; i < this.boardBlocks.length; i++) {
      blocks[i].innerText = ' ';
    }

    // Update scoreboard

    playerOneScore.innerText = `${playerOne.name}'s score = ${playerOne.score}`;
    playerTwoScore.innerText = `${playerTwo.name}'s score = ${playerTwo.score}`;
  },

  newGame() {
    this.newRound();

    declarationDiv.innerText = 'New game started! First round.';

    playerOne.score = 0;
    playerTwo.score = 0;

    playerOneScore.innerText = `${playerOne.name}'s score = ${playerOne.score}`;
    playerTwoScore.innerText = `${playerTwo.name}'s score = ${playerTwo.score}`;
  },

};

const Player = (name) => {
  const icon = 'X';
  const clickedBlocks = [];
  const score = 0;
  return {
    name, icon, clickedBlocks, score,
  };
};

const playerOne = Player('Jerem');
const playerTwo = Player('Levi');
playerTwo.icon = 'O';

function changeP1Name() {
  const text = document.getElementById('playerOneName').value;
  playerOne.name = text;
  playerOneScore.innerText = `${playerOne.name}'s score = ${playerOne.score}`;
  console.log(text);
}

function changeP2Name() {
  const text = document.getElementById('playerTwoName').value;
  playerTwo.name = text;
  playerTwoScore.innerText = `${playerTwo.name}'s score = ${playerTwo.score}`;
  console.log(text);
}

const bottomDiv = document.querySelector('#declareDiv');

const declarationDiv = document.createElement('div');
declarationDiv.classList.add('winnerBox');
bottomDiv.appendChild(declarationDiv);

const playerOneScore = document.createElement('div');
playerOneScore.classList.add('playerOneScore');
bottomDiv.appendChild(playerOneScore);

const playerTwoScore = document.createElement('div');
playerTwoScore.classList.add('playerTwoScore');
bottomDiv.appendChild(playerTwoScore);

const newGameButton = document.querySelector('#newGameButton');
newGameButton.addEventListener('click', (e) => {
  gameBoard.newGame();
});

gameBoard.createBoard();
