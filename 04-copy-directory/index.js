const fs = require("fs");
const path = require("path");

const wayCopy = path.join(__dirname, 'files-copy');
const way = path.join(__dirname, 'files');


fs.mkdir(wayCopy, { recursive: true }, (err) => {
    if (err) throw err;
  });
  makeCopy();

fs.watch(way, "utf-8", function (event, trigger){
    if (err) throw err;
    else{
        makeCopy();
    }
});

function makeCopy(){
fs.readdir(way, { withFileTypes: true }, (err, files) => {
    if(err) throw err;
    files.forEach(function(file){
    let newWay=path.join(way, file.name);
    let copyNewWay=path.join(wayCopy,file.name);
    //console.log(copyNewWay);
    fs.copyFile(newWay, copyNewWay, (err) => {
        if(err) throw err});
    });
});
}
///console.log (way);