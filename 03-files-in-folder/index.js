const fs = require('fs');
const path = require('path');

const way = path.join(__dirname, '/secret-folder');

fs.readdir(way, { withFileTypes: true }, (err, files) => {
    if(err) throw err;
    //console.log(files);
    files.forEach(file=>resultConstructor(file));//обход с применением функции;
});

function resultConstructor(fileDirent){
    fs.stat(path.join(way, `/${fileDirent.name}`), (err,stats)=>{
        if (err) throw err;
        if(fileDirent.isFile()){
            let name=fileDirent.name.split('.')[0];
            let type=path.extname(fileDirent.name).replace('.', '');//убираю реплэйсом точку
            let weight=stats.size;
            //console.log(name);
            //console.log(type);
            //console.log(weight);
            console.log(`<${name}> - <${type}> - <${weight} bytes>`);
        } 
    });
}
