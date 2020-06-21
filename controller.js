const view = require("./view");
const model = require("./model");

/**
 * runSimulation - runs the set of commands sent from the command line.
 * @param {object} data - the data sent from the command line.
 */
const runSimulation = (data) => {

  let commands = data.toString().trim().match(/\d+/g);

  for (let command of commands) {
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
 * @param {object} data - the data sent from the command line.
 */
const handleIncomingData = (data) => {
  console.log("incoming data, ", data.toString().trim().match(/\d+/g));

  if (!model.grid.length) {
    model.createGrid(data);
  } else {
    console.log("running simualtion...");
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
