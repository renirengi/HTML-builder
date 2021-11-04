const fs = require("fs");
const path = require("path");

const way = path.join(__dirname, 'styles');
///const stream = fs.createReadStream(way);


fs.readdir(way, { withFileTypes: true }, (err, files) => {
    if(err) throw err;
    files.forEach(function(file){
        if (path.extname(file.name)=='.css'){
            file.on('data', chunk => {
                console.log(chunk.toString());
              });    
        }
    });
    
})