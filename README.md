## How To Run

To start the simulation run:

### `node controller.js`

**Note: The simulation always starts with direction north.**

First input decides the size of the board and the start postion for the piece, **width, height, x, y**, example: `4,4,2,2`.

Second input is taking a stream of commands, example: `1,4,1,3,2,3,2,4,1,0`, the peice will end up on postion `0,1`.

**NOTE: If the input format is incorrect or missing values the program will not return anything.**

#### Available commands:
  0 = quit simulation and print results <br />
  1 = move forward one step <br />
  2 = move backwards one step <br />
  3 = rotates the piece clockwise 90 degrees (eg north to east) <br />
  4 = rotates the piece counterclockwise 90 degrees (eg west to south) <br />

If simulations is succesfull the you will be returned the piece final postion, if the stream of commands makes the piece end up on a nonexistent position the piece "falls" of the board and will return `-1,-1`.
