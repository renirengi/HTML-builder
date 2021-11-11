const fs = require('fs');
const path = require('path');

const way = path.join(__dirname, '/secret-folder');

fs.readdir(way, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  files.forEach((file) => resultConstructor(file)); //обход с применением функции;
});

function resultConstructor(fileDirent) {
  fs.stat(path.join(way, `/${fileDirent.name}`), (err, stats) => {
    if (err) throw err;
    if (fileDirent.isFile()) {
      const type = path.extname(fileDirent.name);
      const name = path.basename(fileDirent.name, type);
      const weight = stats.size;

      console.log(`<${name}> - <${type.replace('.','')}> - <${weight} bytes>`);
    }
  });
}