const request = require("request");
const fs = require("fs");
const readline = require("readline");
const filePath = "./test.html";

const argv = process.argv.slice(2).join("");
request(argv, (error, response, body) => {
  if (error) {
    console.error(`Please check the adress ${argv}`);
  } else {
    fs.readFile(filePath, (err, data) => {
      if (!err) {
        askToProceed("File exists already. Do you want overwrite? y/n\n", body);
      } else {
        askToProceed(
          `There is no file for this path ${filePath}. Do you want to create file? y/n\n`,
          body
        );
      }
    });
  }
});

const writeAndSizeFile = function(body) {
  fs.writeFile(filePath, body, (err) => {
    if (err) {
      console.error(err);
    } else {
      fs.stat(filePath, (error, stats) => {
        if (error) {
          console.log(error);
        } else {
          console.log(
            `Downloaded and saved ${stats.size} bytes to ${filePath}`
          );
        }
      });
    }
  });
};

const askToProceed = function(message, body) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question(message, (answer) => {
    if (answer.toLocaleLowerCase() === "y") {
      writeAndSizeFile(body);
    } else {
      console.log("No changes!");
    }
    rl.close();
  });
};
