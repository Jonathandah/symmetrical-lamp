let model = {
  succesfull: undefined,

  piece: {
    facing: ["n", "e", "s", "w"], //first index in array represents the direction the piece is facing
    position: { x: null, y: null },
  },

  grid: [],

  /**
  createGrid - creates the gird/board and sets the starting postion for the piece
  @param {object} data - user value sent from command line
 */
  createGrid: (data) => {
    let values = data.toString().trim().match(/\d+/g);
    let sizeX = parseInt(values[0]);
    let sizeY = parseInt(values[1]);
    let positionX = parseInt(values[2]);
    let positionY = parseInt(values[3]);

    if (positionX > sizeX || positionY > sizeY || values.length < 4) { // if the input is incorrect or missing values the process exits
      process.exit();
    }

    let grid = Array(sizeY)
      .fill(null)
      .map((_) => Array(sizeX).fill("space"));

    grid[positionY][positionX] = "block";

    model.grid = grid;

    model.piece = { ...model.piece, position: { x: positionX, y: positionY } };
  },

  /**
   *  checkMove - checks if the next move is possible to do, if so executing move otherwise logging "LOST"
   * @param {Array} grid - two dimensional array representing the grid
   * @param {Number} currentPostion - current positon of the piece
   * @param {Number} newPosition - the positon the piece is moving to
   * @param {String} axis - the axis the piece is moving in
   */
  checkMove: (grid, currentPostion, newPosition, axis) => {

    if(model.succesfull === false) return;
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

    if (grid[newPosition]) { //if new postion exists, move.
      swapArrayElements(grid, currentPostion, newPosition);
      model.piece = { ...model.piece, position: { ...model.piece.position, [axis]: newPosition } };
    } else {
      /*
       Made the decision to keep the whole process/loop going even though the test faild since the documentation said
       to end and return result only on command "0"
       */
      model.succesfull = false;
      model.piece = { ...model.piece, position: {x: -1 , y: -1 }};
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
      let {piece} = model;
      piece = { ...piece, facing: [...piece.facing.slice(1), piece.facing[0]] };
    },
    rotateCounterClockWise: () => {
      let {piece} = model;
      model.piece = {
        ...piece,
        facing: [
          piece.facing[piece.facing.length - 1],
          ...piece.facing.slice(0, piece.facing.length - 1),
        ],
      };
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
      handler(JSON.stringify([model.piece.position.x, model.piece.position.y]));
    }
  },
};

module.exports = model;
