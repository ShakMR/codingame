module.exports = {
  getArgvs: (minimum) => {
    if (process.argv.length < minimum) {
      console.error(`${minimum} parameters expected but provided ${process.argv.length}`);
      process.exit(-1);
    }

    return process.argv.slice(2);
  }
}
