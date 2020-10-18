const fs = require('fs');
const path = require('path');
const readlineModule = require('readline');
const assert = require('assert');

class Runner {
  constructor(testPath, testCase) {
    const listOfFiles = fs.readdirSync(testPath);

    this.testPath = testPath;
    this.caseInput = listOfFiles.filter(f => f === `case${testCase}.in`)[0];
    if (!this.caseInput) {
        throw new Error(`Input data for case is missing. Expecting case${testCase}.in file in ${testPath}`);
    }

    this.caseOutput = listOfFiles.filter(f => f === `case${testCase}.out`)[0];
    if (!this.caseInput) {
      throw new Error(`Output data for case is missing. Expecting case${testCase}.out file in ${testPath}`);
    }

    const regex = new RegExp(/.*.js$/)
    this.codeFile = listOfFiles.filter(f => f.match(regex))[0];
    this.runOutput = [];
    this.outLine = 0;
  }

  async prepare() {
    let rl = readlineModule.createInterface({
      input: fs.createReadStream(path.join(this.testPath, this.caseInput)),
      crlfDelay: Infinity
    })

    const lines = [];

    for await (const line of rl) {
      lines.push(line);
    }

    global.readline = () => {
      return lines.shift();
    }
    this.oldLog = console.log;
    console.log = (...c) => {
      this.oldLog(...c);
      this.runOutput.push(...c);
      this.outLine++;
    }

    this.expectedOutLines = [];

    rl = readlineModule.createInterface({
      input: fs.createReadStream(path.join(this.testPath, this.caseOutput)),
      crlfDelay: Infinity
    })

    for await (const line of rl) {
      this.expectedOutLines.push(line);
    }
  }

  run() {
    require(path.resolve(path.join(this.testPath, this.codeFile)));
    assert.deepStrictEqual(this.runOutput, this.expectedOutLines);
  }
}

module.exports = Runner;
