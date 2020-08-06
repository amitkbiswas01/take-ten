require("regenerator-runtime/runtime");

const inquirer = require("inquirer");
const chalk = require("chalk");

const { execSync } = require("child_process");

module.exports.start = () => {
  try {
    inquirer
      .prompt([
        {
          type: "list",
          name: "work",
          message: chalk.hex("ff00ff")("  Pick Work Duration : "),
          choices: ["  25 Minutes", "  1 Hour", "  2 Hours"],
          default: "  25 Minutes",
          prefix: "►",
        },
        {
          type: "list",
          name: "gap",
          message: chalk.hex("#009cdf")("  Pick Break duration : "),
          choices: ["  5 Minutes", "  10 Minutes", "  20 Minutes"],
          default: "  5 Minutes",
          prefix: "►",
        },
        {
          type: "input",
          name: "set",
          message: chalk.hex("#f78200")("  Enter Number of Work-Break Sets : "),
          default: "2",
          prefix: "►",
        },
        {
          type: "input",
          name: "msg",
          message: chalk.hex("#28b572")("  Enter a notification message : "),
          default: "Get up and Drink Water!",
          prefix: "►",
        },
      ])
      .then((answers) => {
        // extract answers
        const { work, gap, set, msg } = answers;
        try {
          // check if pm2 already exists
          const pkgList = execSync("npm list -g --depth 0");
          if (!pkgList.includes("pm2")) {
            console.log(
              chalk.hex("#ffff00").bold("\nInstalling PM2 Globally .....")
            );
            execSync(`npm install pm2 -g`);
            console.log(chalk.hex("#7fff00").bold("Installation Complete."));
          }
          // start notify.js
          execSync(
            `pm2 start ${__dirname}/notify.js -- "${work}" "${gap}" "${set}" "${msg}"`
          );
          console.log(
            chalk
              .bgHex("#7fff00")
              .hex("#000000")
              .bold("\nScheduled Notification turned on !")
          );
        } catch (error) {
          console.log(chalk.bgRed.white.bold("Error Occurred !"));
          console.log(
            chalk.bgRed.white.bold(
              `Issues with Internet Connection / NPM / Node !`
            )
          );
        }
      });
  } catch (err) {
    console.log(chalk.bgRed.white.bold("Error Occurred !"));
  }
};

module.exports.stop = () => {
  try {
    // check if pm2 was installed
    const pkgList = execSync("npm list -g --depth 0");
    if (pkgList.includes("pm2")) {
      execSync(`pm2 stop notify`);
      console.log(
        chalk.bgRed.white.bold("\nScheduled Notification turned off !")
      );
    } else {
      console.log(chalk.bgRed.white.bold("\nRun `take-ten start` first !"));
    }
  } catch (error) {
    console.log(err);
  }
};
