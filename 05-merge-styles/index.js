const fs = require('fs').promises;
const path = require('path');
const way = path.join(__dirname, 'styles');
const projectWay = path.join(__dirname, 'project-dist');

async function main() {
  const ac = new AbortController();
  const { signal } = ac;
  const watcher = fs.watch(way, { signal });

  await fs.mkdir(projectWay, { recursive: true });
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

  return fs.writeFile(path.join(projectWay, 'bundle.css'), content);
}