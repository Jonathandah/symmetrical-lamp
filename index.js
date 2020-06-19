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

let commands = ['1', '4', '1', '3', '2', '3', '2', '4', '1', "0"];

let grid = createGrid(values);

let piece = {
  facing: ['n', 'e', 's', 'w'],
  position: { x: parseInt(values[2]), y: parseInt(values[3]) },
};

const checkCommand = (grid, currentPostion, newPosition, axis) => {
  const swapArrayElements = (arr, indexA, indexB) => {
    let temp = arr[indexA];
    arr[indexA] = arr[indexB];
    arr[indexB] = temp;
  };

  if (grid[newPosition]) {
    swapArrayElements(grid, currentPostion, newPosition);
    console.log('current, ', currentPostion, 'new, ', newPosition);
    piece.position[axis] = newPosition;
  } else {
    console.log('\n\nLOST: [-1,-1]');
  }
};

const move = {
  forward: () => {
    let currentDirection = piece.facing[0];
    switch (currentDirection) {
      case 'n':
        checkCommand(grid, piece.position.y, piece.position.y - 1, 'y');
        console.log('\n\ngrid', grid);
        console.log('\n\npice ', piece);

        break;
      case 'e':
        checkCommand(grid[piece.position.y], piece.position.x, piece.position.x + 1, 'x');
        console.log('\n\ngrid', grid);
        console.log('\n\npice ', piece);
        break;
      case 's':
        checkCommand(grid, piece.position.y, piece.position.y + 1, 'y');
        console.log('\n\ngrid', grid);
        console.log('\n\npice ', piece);
        break;
      case 'w':
        checkCommand(grid[piece.position.y], piece.position.x, piece.position.x - 1, 'x');
        console.log('\n\ngrid', grid);
        console.log('\n\npice ', piece);
        break;
    }
  },
  back: () => {
    let currentDirection = piece.facing[0];
    switch (currentDirection) {
      case 'n':
        checkCommand(grid, piece.position.y, piece.position.y + 1, 'y');
        console.log('\n\ngrid', grid);
        console.log('\n\npice ', piece);
        break;
      case 'e':
        checkCommand(grid[piece.position.y], piece.position.x, piece.position.x - 1, 'x');
        console.log('\n\ngrid', grid);
        console.log('\n\npice ', piece);
        break;
      case 's':
        checkCommand(grid, piece.position.y, piece.position.y - 1, 'y');
        console.log('\n\ngrid', grid);
        console.log('\n\npice ', piece);
        break;
      case 'w':
        checkCommand(grid[piece.position.y], piece.position.x, piece.position.x + 1, 'x');
        console.log('\n\ngrid', grid);
        console.log('\n\npice ', piece);
        break;
    }
  },
};



// console.log('\n\ngrid', grid);
// console.log('\n\npice ', piece);

for (let command of commands) {
  switch (command) {
    case '0':
      process.exit();
      break;
    case '1':
      move.forward();
      break;
    case '2':
      move.back();
      break;
    case '3':
      piece.facing.push(piece.facing.shift());
      break;
    case '4':
      piece.facing.unshift(piece.facing.pop());
      break;
  }
}




// process.stdin.on('data', (data) => {




  

  
// });
