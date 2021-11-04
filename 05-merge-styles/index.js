const fs = require("fs");
const path = require("path");

const way = path.join(__dirname, 'styles');


fs.readdir(way, { withFileTypes: true }, (err, files) => {
    if(err) throw err;
    files.forEach(function(file){
        if (path.extname(file.name)=='.css'){
            let newWay=path.join(way, file.name);
            let stream = fs.createReadStream(newWay);
            let content=[];
            stream.on('data', chunk => {
             content.push(chunk.toString())
            });
            console.log(content);    
        }
    });
    
})