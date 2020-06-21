module.exports = {
    bindIncomingData: (handler) => {
      process.stdin.on('data', (data) => {
        handler(data);
      });
    },
  
    showResult: (result) => {
      process.stdout.write(`RESLUT: ${result}`);
      process.exit();
    },
  };
  
  
  