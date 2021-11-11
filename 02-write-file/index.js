const fs = require('fs');
const path = require('path');
const readline = require('readline');

const greeting = 'Please type your next input here: ';
const goodbye = 'See you next time!';

const way = path.join(__dirname, '/testFile.txt');
const writableStream = fs.createWriteStream(way);

const userInput = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const recursiveDialogue = function () {
  userInput.question('', function (answer) {
    if (answer !== 'exit') {
      writableStream.write(answer + '\n');
      return recursiveDialogue();
    }
    userInput.close();
    writableStream.end();
  });
};

userInput.on('close', () => {
  console.log(goodbye);
});

console.log(greeting);
recursiveDialogue();