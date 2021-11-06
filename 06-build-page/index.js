const fs = require('fs').promises;
const path = require('path');

const assetsFolderName = 'assets';

const wayProject = path.join(__dirname, 'project-dist');
const assetsPath = path.join(__dirname, assetsFolderName);
const way = path.join(__dirname, 'styles');

copyFolder(assetsPath, path.join(__dirname, 'project-dist', assetsFolderName));


async function load() {
  const files = await fs.readdir(way);
  const cssFiles = files.filter((fileName) => path.extname(fileName) === '.css');
  const cssFilesDataPromises = cssFiles.map((fileName) => fs.readFile(path.join(way, fileName), 'utf8'));
  const cssFilesData = await Promise.all(cssFilesDataPromises);
  let content=cssFilesData.join('');
  fileHandler(content);
}

load();

function fileHandler(x){
    fs.writeFile(
        path.join(wayProject, 'style.css'),
        x,
        (err) => {
            if (err) throw err;
            
        }
    );
    
}


async function copyFolder(folderPath, copyPath) {
  await fs.mkdir(copyPath, { recursive: true });

  const contentInfoList = await fs.readdir(folderPath, { withFileTypes: true });
  const operationsPromises = contentInfoList.map((info) => {
    const sourcePath = path.join(folderPath, info.name);
    const targetPath = path.join(copyPath, info.name);

    return info.isDirectory() ? copyFolder(sourcePath, targetPath) : fs.copyFile(sourcePath, targetPath);
  });

  return Promise.all(operationsPromises);
}
  

///const wayComponents=path.join(way, 'components');
///console.log(wayComponents);

/*Копирование папки assets*/
  /*makeCopy();

  fs.watch(way, 'utf-8', (filename) => {
    if (filename) {
      makeCopy();
    }
  });

function makeCopy(){
fs.readdir(way, { withFileTypes: true }, (err, files) => {
    if(err) throw err;
    files.forEach(function(file){
    let newWay=path.join(way, file.name);
    let copyNewWay=path.join(wayProject,file.name);
    fs.copyFile(newWay, copyNewWay, (err) => {
        if(err) throw err});
    });
});
}*/