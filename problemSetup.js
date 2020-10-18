const fs = require('fs');
const path = require('path');

const { getArgvs } = require('./helpers');

const main = () => {
  const [problemName] = getArgvs(1);
  const folderPath = path.join('problems', problemName);

  if (!fs.existsSync(folderPath)){
    fs.mkdirSync(folderPath);
  }

  fs.closeSync(fs.openSync(path.join(folderPath, `${problemName}.js`), 'w'));
  fs.closeSync(fs.openSync(path.join(folderPath, `case.in`), 'w'));
  fs.closeSync(fs.openSync(path.join(folderPath, `case.out`), 'w'));
}

main();
