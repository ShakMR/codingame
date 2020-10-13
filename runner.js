#!/usr/bin/env node
const Runner = require('./Runner/Runner.js'); // this will create the helper functions in the global scope

const main = async () => {
  if (process.argv.length < 3) {
    console.error('Usage: runner.js <problem folder path>');
    process.exit(-1);
  }
  const argv = process.argv.slice(2);

  const folderPath = argv[0];
  const testCase = argv.length > 1 ? argv[1] : '';

  const runner = new Runner(folderPath, testCase);

  await runner.prepare();
  runner.run();
}

main();
