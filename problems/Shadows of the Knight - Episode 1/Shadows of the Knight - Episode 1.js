/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var inputs = readline().split(' ');
const W = parseInt(inputs[0]); // width of the building.
const H = parseInt(inputs[1]); // height of the building.
const N = parseInt(readline()); // maximum number of turns before game over.
var inputs = readline().split(' ');
const X0 = parseInt(inputs[0]);
const Y0 = parseInt(inputs[1]);

let verticalLimit = [0, H];
let horizontalLimit = [0, W];
let position = [X0, Y0];
const visited = {};
// game loop
while (true) {
  const bombDir = readline(); // the direction of the bombs from batman's current location (U, UR, R, DR, D, DL, L or UL)
  let [nextX, nextY] = position;

  console.error(bombDir);

  if (bombDir.includes('U')) {
    // nextY = Math.floor((nextY - 1) / 2);
    verticalLimit = [verticalLimit[0], position[1]];
  } else if (bombDir.includes('D')) {
    // nextY = nextY + Math.floor((H - nextY) / 2);
    verticalLimit = [position[1], verticalLimit[1]];
  } else {
    verticalLimit = [position[1], position[1]];
  }

  if (bombDir.includes('L')) {
    // nextX = Math.floor((nextX - 1) / 2);
    horizontalLimit = [horizontalLimit[0], position[0]];
  } else if (bombDir.includes('R')) {
    // console.error(nextX, W, Math.floor((W - nextX) / 2));
    // nextX = nextX + Math.floor((W - nextX) / 2);
    horizontalLimit = [position[0], horizontalLimit[1]];
  } else {
    horizontalLimit = [position[0], position[0]];
  }

  nextX = horizontalLimit[0] + Math.floor((horizontalLimit[1] + horizontalLimit[0]) / 2);
  nextY = verticalLimit[0] + Math.floor((verticalLimit[1] + verticalLimit[0]) / 2);
  
  console.log(nextX, nextY);
  position = [nextX, nextY];
}
