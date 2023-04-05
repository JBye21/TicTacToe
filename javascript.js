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
      newBlock.innerText = i;
      newBlock.addEventListener('click', (e) => this.blockActivator(newBlock));
      blockContainer.appendChild(newBlock);
    }
    this.turn = playerOne;
  },

  blockActivator(block) {
    if (block.innerText !== 'X' && block.innerText !== 'O') {
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
          return console.log("It's a draw!");
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
    const div = document.createElement('div');
    div.classList.add('winnerBox');
    div.innerText = `${player.name} has won!`;
    document.body.appendChild(div);
  },

  gameReset() {

  },

};

const Player = (name) => {
  const icon = 'X';
  const clickedBlocks = [];
  return { name, icon, clickedBlocks };
};

const playerOne = Player('Jerem');
const playerTwo = Player('Levi');
playerTwo.icon = 'O';

gameBoard.createBoard();
