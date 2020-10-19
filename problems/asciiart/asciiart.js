/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const L = parseInt(readline()); // letter width
const H = parseInt(readline()); // letter height
const T = readline(); // characters to represent in ascii art

// read alphabet
const alphabet = {};

for (let i = 0; i < H; i++) {
  const ROW = readline();
  const re = new RegExp(`.{1,${L}}`, 'g');
  const characterParts = ROW.match(re); // it contains
  let currentCharacter = 'A'.charCodeAt(0);
  for (let part of characterParts) {
    if (!(currentCharacter in alphabet)) {
      alphabet[currentCharacter] = [part];
    } else {
      alphabet[currentCharacter].push(part);
    }
    currentCharacter++;
  }
}

console.error(L, H, T);

const charBetween = (charCode, from, to) => charCode <= to.charCodeAt(0) && charCode >= from.charCodeAt(0);

for (let i = 0; i < H; i++){
  let line = '';
  for (let c of T) {
    let charCode = c.toUpperCase().charCodeAt(0);
    line += alphabet[charBetween(charCode, 'A', 'Z')? charCode : 91][i];
  }
  console.log(line);
  
}
