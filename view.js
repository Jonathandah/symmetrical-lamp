const view = {
    /**
     * incomingData - runs eventlistener on input data
     * @param {Function} handler - function in controller which binds the input data with the model
     */
    incomingData: (handler) => {
      process.stdin.on('data', (data) => {
        let regexData = data.toString().trim().match(/\d+/g);
        if(regexData === null) return;
        handler(regexData);
      });
    },
    /**
     * showResult - writes the reslut
     * @param {string} result - the result sent from the model
     */
    showResult: (result) => {
      process.stdout.write(`${result}`);
      process.exit();
    },
  };

  module.exports = view;
