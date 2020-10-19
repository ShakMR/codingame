/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var inputs = readline().split(' ');
const W = parseInt(inputs[0]);
const H = parseInt(inputs[1]);
const topLabels = readline().split('').filter(c => c !== ' '); // ABC etc
let lanes = []; 
// it will contain an object for each lane, each object containing a number representing how far is the crossroad and the value will be the lane to which leads
for (let label of topLabels) {
  lanes.push({});
}

for (let i = 0; i < H-2; i++) {
  const line = readline();
  if (line.includes('--')) {
    let currentLane = 0;
    for (let group of line.split('  ')) {
      // |--| indicates a lane change | means nope
      if (group === '|--|') {
        lanes[currentLane][i] = currentLane + 1;
        lanes[currentLane+1][i] = currentLane;
        currentLane += 2;
      } else {
        currentLane += 1;
      }
    }
  }  
}
const bottomLabels = readline().split('').filter(c => c !== ' '); // 123 etc

topLabels.forEach((ghost, initLane) => {
  let position = 0;
  let currentLane = initLane;
  while (position < H-2) {
    let change = lanes[currentLane][position];
    if (change || change === 0) {
      currentLane = change;
      position++;
    } else {
      position++;
    }
  }
  console.log(`${ghost}${bottomLabels[currentLane]}`);
});
