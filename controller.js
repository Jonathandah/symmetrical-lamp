const view = require("./view");
const model = require("./model");

const createSimulation = (data) => {
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

const handleIncomingData = (data) => {
  console.log("incoming data, ", data.toString().trim().match(/\d+/g));
  
  if (!model.grid.length) {
    model.createGrid(data);
  } else {
    console.log("running simualtion...");
    createSimulation(data);
  }
};

const handleResult = (data) => {
  view.showResult(data);
};

view.bindIncomingData(handleIncomingData);
