#!/usr/bin/env node
const Executer = require('./Runner/Runner.js'); // this will create the helper functions in the global scope
const { getArgvs } = require('./helpers');

const main = async () => {
  const [folderPath, testCase] = getArgvs(1);

  const runner = new Executer(folderPath, testCase);

  await runner.prepare();
  runner.run();
}

main();
