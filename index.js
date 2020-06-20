



//--MODEL
/**
 *createGrid - returns a grid and a starting postion for the piece
 * @param {Array} values - array containing 4 values, the first two determine the size
 * of the grid and the last towo determine the piece starting postion
 */
const createGrid = (values) => {
  const grid = Array(parseInt(values[0]))
    .fill(null)
    .map((_) => Array(parseInt(values[1])).fill('space'));

  grid[parseInt(values[2])][parseInt(values[3])] = 'block';

  // {facing: {x: parseInt(values[2]), y: parseInt(values[3]) + 1 }, position:{x: parseInt(values[2]), y: parseInt(values[3])}  };
  return grid;
};

let initialRun = true;

let values = ['4', '4', '2', '2'];

let commands = ['1', '4', '1', '3', '2', '3', '2', '4', '1', '0'];

let grid = createGrid(values);

let piece = {
  facing: ['n', 'e', 's', 'w'],
  position: { x: parseInt(values[2]), y: parseInt(values[3]) },
};

//--CONTROLLER

/**
 *  checkMove - checks if the next move is possible to do, if so executing move otherwise logging "LOST"
 * @param {Array} grid - two dimensional array representing the grid
 * @param {Number} currentPostion - current positon of the piece
 * @param {Number} newPosition - the positon the piece is moving to
 * @param {String} axis - the axis the piece is moving in
 */
const checkMove = (grid, currentPostion, newPosition, axis) => {
  /**
   * swapArrayElements - used to swap place of two indexes so that the piece can move in different directions
   * @param {Array} arr - the array the piece is moving in
   * @param {Number} currentIndex - the current index of the array or piece we want to move
   * @param {Number} newIndex - the new index the old index is swapping to.
   */
  const swapArrayElements = (arr, currentIndex, newIndex) => {
    let temp = arr[currentIndex];
    arr[currentIndex] = arr[newIndex];
    arr[newIndex] = temp;
  };

  if (grid[newPosition]) {
    swapArrayElements(grid, currentPostion, newPosition);
    piece = { ...piece, position: { ...piece.position, [axis]: newPosition } };
  } else {
    console.log('\n\nLOST: [-1,-1]');
  }
};

const move = {
  forward: () => {
    let currentDirection = piece.facing[0];
    switch (currentDirection) {
      case 'n':
        checkMove(grid, piece.position.y, piece.position.y - 1, 'y');
        console.log('\n\ngrid', grid);
        console.log('\n\npice ', piece);

        break;
      case 'e':
        checkMove(grid[piece.position.y], piece.position.x, piece.position.x + 1, 'x');
        console.log('\n\ngrid', grid);
        console.log('\n\npice ', piece);
        break;
      case 's':
        checkMove(grid, piece.position.y, piece.position.y + 1, 'y');
        console.log('\n\ngrid', grid);
        console.log('\n\npice ', piece);
        break;
      case 'w':
        checkMove(grid[piece.position.y], piece.position.x, piece.position.x - 1, 'x');
        console.log('\n\ngrid', grid);
        console.log('\n\npice ', piece);
        break;
    }
  },
  backward: () => {
    let currentDirection = piece.facing[0];
    switch (currentDirection) {
      case 'n':
        checkMove(grid, piece.position.y, piece.position.y + 1, 'y');
        console.log('\n\ngrid', grid);
        console.log('\n\npice ', piece);
        break;
      case 'e':
        checkMove(grid[piece.position.y], piece.position.x, piece.position.x - 1, 'x');
        console.log('\n\ngrid', grid);
        console.log('\n\npice ', piece);
        break;
      case 's':
        checkMove(grid, piece.position.y, piece.position.y - 1, 'y');
        console.log('\n\ngrid', grid);
        console.log('\n\npice ', piece);
        break;
      case 'w':
        checkMove(grid[piece.position.y], piece.position.x, piece.position.x + 1, 'x');
        console.log('\n\ngrid', grid);
        console.log('\n\npice ', piece);
        break;
    }
  },
  rotateClockWise: () => {
    piece.facing.push(piece.facing.shift());
    // piece = { ...piece, facing: [...piece.facing.slice(1), piece.facing[0]] };
  },
  rotateCounterClockWise: () => {
    // piece = {
    //   ...piece,
    //   facing: [
    //     piece.facing[piece.facing.length - 1],
    //     ...piece.facing.slice(0, piece.facing.length - 1),
    //   ],
    // };
    piece.facing.unshift(piece.facing.pop());
  },
};

for (let command of commands) {
  switch (command) {
    case '0':
      process.exit();
      break;
    case '1':
      move.forward();
      break;
    case '2':
      move.backward();
      break;
    case '3':
      move.rotateClockWise();
      break;
    case '4':
      move.rotateCounterClockWise();
      break;
  }
}

//--VIEW



// process.stdin.on('data', (data) => {

// });
