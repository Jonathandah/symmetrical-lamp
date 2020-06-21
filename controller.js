const view = require("./view");
const model = require("./model");

/**
 * runSimulation - runs the set of commands sent from the command line.
 * @param {Array} commands - array containing strings representing the commands
 */
const runSimulation = (commands) => {



  for (let command of commands) {
      //if command is not found the command will be ignored and the rest will keep on executing
    switch (command) {
      case "0":
        model.checkResult(handleResult);
        break;
      case "1":
        model.move.forward();
        break;
      case "2":
        model.move.backward();
        break;
      case "3":
        model.move.rotateClockWise();
        break;
      case "4":
        model.move.rotateCounterClockWise();
        break;
    }
  }
};

/**
 * handleIncomingData - binds incoming data from view with modal. First run triggers createGrid, second run triggers runSimulation.
 * @param {Array} data - array containing strings
 */
const handleIncomingData = (data) => {

  if (!model.grid.length) {
    model.createGrid(data);
  } else {
    runSimulation(data);
  }
};

/**
 * handleResult - binds data from model to view, sends the result
 * @param {string} result - the result of the simulation.
 */
const handleResult = (result) => {
  view.showResult(result);
};

view.incomingData(handleIncomingData);
