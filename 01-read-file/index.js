const fs = require('fs');
const path = require('path');


const way = path.join(__dirname, '/text.txt');
const stream = fs.createReadStream(way);

stream.on('data', chunk => {
  console.log(chunk.toString());
});

