const fs = require('fs').promises;
const path = require('path');
const way = path.join(__dirname, 'styles');
const projectWay=path.join(__dirname, 'project-dist')

fs.mkdir(projectWay, { recursive: true }, (err) => {
    if (err) throw err;
  });

  fs.watch(way, 'utf-8', (filename) => {
    if (filename) {
      load();
    }
  });

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
        path.join(projectWay, 'bundle.css'),
        x,
        (err) => {
            if (err) throw err;
            
        }
    );
    
}