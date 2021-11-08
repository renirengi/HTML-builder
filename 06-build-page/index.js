const fs = require('fs').promises;
const path = require('path');

const assetsFolderName = 'assets';

const pathToProject = path.join(__dirname, 'project-dist');
const assetsPath = path.join(__dirname, assetsFolderName);
const pathToStyles = path.join(__dirname, 'styles');

main();

async function main() {
  await generate();
}

async function generate() {
  const htmlTemplate = await fs.readFile(path.join(__dirname, 'template.html'), 'utf-8');
  const components = await readComponents();
  const updatedHtmlTemplate = components.reduce((acc, cmp) => acc.replace(cmp.tag, cmp.template), htmlTemplate);

  await fs.mkdir(pathToProject, { recursive: true });
  await fs.writeFile(path.join(pathToProject, 'index.html'), updatedHtmlTemplate);
  await mergeStyles(pathToStyles, pathToProject);
  await copyFolder(assetsPath, path.join(__dirname, 'project-dist', assetsFolderName));
}

async function readComponents() {
  const cmpPath = path.join(__dirname, 'components');
  const cmpFiles = await fs.readdir(cmpPath);
  const cmpTemplatesPromises = cmpFiles.map((fileName) => fs.readFile(path.join(cmpPath, fileName), 'utf-8'));
  const cmpTemplates = await Promise.all(cmpTemplatesPromises);
  const components = cmpFiles.map((fileName, i) => ({tag: getCmpTag(fileName), template: cmpTemplates[i]}));

  return components;
}

async function mergeStyles(stylesPath, projectPath) {
  const files = await fs.readdir(stylesPath);
  const cssFiles = files.filter((fileName) => path.extname(fileName) === '.css');
  const cssFilesDataPromises = cssFiles.map((fileName) => fs.readFile(path.join(stylesPath, fileName), 'utf8'));
  const cssFilesData = await Promise.all(cssFilesDataPromises);
  const content = cssFilesData.join('\n');

  return fs.writeFile(path.join(projectPath, 'style.css'), content);
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

function getCmpTag(fileName) {
  return `{{${fileName.replace('.html', '')}}}`;
}

