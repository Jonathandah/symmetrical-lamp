let model = {
    /**
     * incomingData
     * @param {Function} handler - function in controller which binds the input data with the model
     */
    incomingData: (handler) => {
      process.stdin.on('data', (data) => {
        handler(data);
      });
    },
    /**
     * showResult - writes the reslut
     * @param {string} result - the result sent from the model
     */
    showResult: (result) => {
      process.stdout.write(`RESLUT: ${result}`);
      process.exit();
    },
  };

  module.exports = model;