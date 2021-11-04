const fs = require('fs');
const path = require('path');
const readline = require('readline');

const way = path.join(__dirname, '/testFile.txt');
const writableStream = fs.createWriteStream(way);
  
let greeting = 'Please type your next input here: ';
let goodbye = 'See you next time!';


  fs.open('02-write-file/testFile.txt', 'w', (err) => {
    if(err) throw err;
});



let userInput = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


let recursiveDialogue = function() {
  userInput.question('', function (answer) {  
    if(answer !== 'exit') {
      writableStream.write(answer + '\n');
      return recursiveDialogue();
    }
    userInput.close();
    writableStream.end();
    }
    );
};

userInput.on('close', () => {console.log(goodbye)});

console.log(greeting);
recursiveDialogue();