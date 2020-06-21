let model = {
  succesfull: undefined,

  piece: {
    facing: ["n", "e", "s", "w"],
    position: { x: null, y: null },
  },
  grid: [],

  createGrid: (data) => {
    let values = data.toString().trim().match(/\d+/g);

    model.grid = Array(parseInt(values[0]))
      .fill(null)
      .map((_) => Array(parseInt(values[1])).fill("space"));

    model.grid[parseInt(values[2])][parseInt(values[3])] = "block";

    model.piece = { ...model.piece, position: { x: parseInt(values[3]), y: parseInt(values[2]) } };

    console.log("created grid: ", model.grid);
  },

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
          console.log("\n\npice ", model.piece);
          console.log("grid", model.grid);

          break;
        case "e":
          model.checkMove(
            model.grid[model.piece.position.y],
            model.piece.position.x,
            model.piece.position.x + 1,
            "x"
          );
          console.log("\n\npice ", model.piece);
          console.log("grid", model.grid);
          break;
        case "s":
          model.checkMove(model.grid, model.piece.position.y, model.piece.position.y + 1, "y");
          console.log("\n\npice ", model.piece);
          console.log("grid", model.grid);
          break;
        case "w":
          model.checkMove(
            model.grid[model.piece.position.y],
            model.piece.position.x,
            model.piece.position.x - 1,
            "x"
          );
          console.log("\n\npice ", model.piece);
          console.log("grid", model.grid);
          break;
      }
    },
    backward: () => {
      let currentDirection = model.piece.facing[0];
      switch (currentDirection) {
        case "n":
          model.checkMove(model.grid, model.piece.position.y, model.piece.position.y + 1, "y");
          console.log("\n\npice ", model.piece);
          console.log("grid", model.grid);
          break;
        case "e":
          model.checkMove(
            model.grid[model.piece.position.y],
            model.piece.position.x,
            model.piece.position.x - 1,
            "x"
          );
          console.log("\n\npice ", model.piece);
          console.log("grid", model.grid);
          break;
        case "s":
          model.checkMove(model.grid, model.piece.position.y, model.piece.position.y - 1, "y");
          console.log("\n\npice ", model.piece);
          console.log("grid", model.grid);
          break;
        case "w":
          model.checkMove(
            model.grid[model.piece.position.y],
            model.piece.position.x,
            model.piece.position.x + 1,
            "x"
          );
          console.log("\n\npice ", model.piece);
          console.log("grid", model.grid);
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
