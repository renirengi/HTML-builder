const fs = require('fs').promises;
const path = require('path');

const assetsFolderName = 'assets';

const wayProject = path.join(__dirname, 'project-dist');
const assetsPath = path.join(__dirname, assetsFolderName);
const way = path.join(__dirname, 'styles');



async function main() {
  const ac = new AbortController();
  const { signal } = ac;
  const watcher = fs.watch(way, { signal });

  await fs.mkdir(wayProject, { recursive: true });
  await mergeStyles();

  for await (const event of watcher) {
    await mergeStyles();
  }

}

main();

async function mergeStyles() {
  const files = await fs.readdir(way);
  const cssFiles = files.filter((fileName) => path.extname(fileName) === '.css');
  const cssFilesDataPromises = cssFiles.map((fileName) => fs.readFile(path.join(way, fileName), 'utf8'));
  const cssFilesData = await Promise.all(cssFilesDataPromises);
  const content = cssFilesData.join('\n');

  return fs.writeFile(path.join(wayProject, 'style.css'), content);
}

readTemplate();

async function readTemplate(){
  const controller = new AbortController();
  const { signal } = controller;
  const promise= fs.readFile(path.join(__dirname, 'template.html'),'utf-8',{ signal });
  controller.abort();

  await promise;
  let newStr='';
  let buffer= ((await promise).match(/{{[a-z]+}}/mg)).forEach(elem=> newStr+=' ' +elem.slice(2,-2));
  return newStr;
} 

readComponents();

async function readComponents(){
  const files = await fs.readdir(path.join(__dirname, 'components'));
   for (const file of files){
    let result=file.slice(0,-5)
    return result;
  }
}

copyFolder(assetsPath, path.join(__dirname, 'project-dist', assetsFolderName));

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
  

