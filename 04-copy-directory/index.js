const fs = require('fs');
const path = require('path');

const wayCopy = path.join(__dirname, 'files-copy');
const way = path.join(__dirname, 'files');

fs.mkdir(wayCopy, { recursive: true }, errorHandler);
makeCopy();

function makeCopy() {
  fs.readdir(way, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(err);
    }

    files.forEach((file) => {
      let newWay = path.join(way, file.name);
      let copyNewWay = path.join(wayCopy, file.name);

      fs.copyFile(newWay, copyNewWay, errorHandler);

      console.info(`Copied ${newWay} to ${copyNewWay}`);
    });
  });
}

function errorHandler(err) {
  if (err) {
    console.error(err);
  }
}