let model = {
  succesfull: undefined,

  piece: {
    facing: ["n", "e", "s", "w"],
    position: { x: null, y: null },
  },

  grid: [],

  /**
  createGrid - returns a grid and a starting postion for the piece
  @param {object} data - user value sent from command line
 */
  createGrid: (data) => {
    let values = data.toString().trim().match(/\d+/g);
    let sizeX = parseInt(values[0]);
    let sizeY = parseInt(values[1]);
    let positionX = parseInt(values[2]);
    let positionY = parseInt(values[3]);

    if (positionX > sizeX || positionY > sizeY) {
      process.exit();
    }

    let grid = Array(sizeY)
      .fill(null)
      .map((_) => Array(sizeX).fill("space"));

    grid[positionY][positionX] = "block";

    model.grid = grid;

    model.piece = { ...model.piece, position: { x: positionX, y: positionY } };

    console.log("created grid: ", model.grid);
  },

  /**
   *  checkMove - checks if the next move is possible to do, if so executing move otherwise logging "LOST"
   * @param {Array} grid - two dimensional array representing the grid
   * @param {Number} currentPostion - current positon of the piece
   * @param {Number} newPosition - the positon the piece is moving to
   * @param {String} axis - the axis the piece is moving in
   */
  checkMove: (grid, currentPostion, newPosition, axis) => {
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
      model.piece = { ...model.piece, position: { ...model.piece.position, [axis]: newPosition } };
    } else {
      model.succesfull = false;
    }
  },
  move: {
    forward: () => {
      let currentDirection = model.piece.facing[0];

      switch (currentDirection) {
        case "n":
          model.checkMove(model.grid, model.piece.position.y, model.piece.position.y - 1, "y");
          break;
        case "e":
          model.checkMove(
            model.grid[model.piece.position.y],
            model.piece.position.x,
            model.piece.position.x + 1,
            "x"
          );
          break;
        case "s":
          model.checkMove(model.grid, model.piece.position.y, model.piece.position.y + 1, "y");
          break;
        case "w":
          model.checkMove(
            model.grid[model.piece.position.y],
            model.piece.position.x,
            model.piece.position.x - 1,
            "x"
          );
          break;
      }
    },
    backward: () => {
      let currentDirection = model.piece.facing[0];

      switch (currentDirection) {
        case "n":
          model.checkMove(model.grid, model.piece.position.y, model.piece.position.y + 1, "y");
          break;
        case "e":
          model.checkMove(
            model.grid[model.piece.position.y],
            model.piece.position.x,
            model.piece.position.x - 1,
            "x"
          );
          break;
        case "s":
          model.checkMove(model.grid, model.piece.position.y, model.piece.position.y - 1, "y");
          break;
        case "w":
          model.checkMove(
            model.grid[model.piece.position.y],
            model.piece.position.x,
            model.piece.position.x + 1,
            "x"
          );
          break;
      }
    },
    rotateClockWise: () => {
      model.piece.facing.push(model.piece.facing.shift());
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
      model.piece.facing.unshift(model.piece.facing.pop());
    },
  },

  /**
   * checkResults - sends the result of the simulation to the view
   * @param {Function} handler - functions from controller that binds the value from the model with view.
   */
  checkResult: (handler) => {
    if (model.succesfull === undefined) model.succesfull = true;

    if (model.succesfull) {
      handler(JSON.stringify([model.piece.position.x, model.piece.position.y]));
    } else if (model.succesfull === false) {
      handler(JSON.stringify([-1, -1]));
    }
  },
};

module.exports = model;
