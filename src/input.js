require("regenerator-runtime/runtime");

const inquirer = require("inquirer");
const chalk = require("chalk");

const { exec } = require("child_process");

module.exports.start = () => {
  try {
    inquirer
      .prompt([
        {
          type: "list",
          name: "work",
          message: chalk.blueBright("  Pick Work Duration : "),
          choices: ["  25 Minutes", "  1 Hour", "  2 Hours"],
          default: "  25 Minutes",
        },
        {
          type: "list",
          name: "gap",
          message: chalk.yellowBright("  Pick Break duration : "),
          choices: ["  5 Minutes", "  10 Minutes", "  20 Minutes"],
          default: "  5 Minutes",
        },
        {
          type: "input",
          name: "set",
          message: chalk.magentaBright("  Enter Number of Work-Break Sets : "),
          default: "2",
        },
        {
          type: "input",
          name: "msg",
          message: chalk.cyanBright("  Enter a notification message : "),
          default: "Get up and Drink Water!",
        },
      ])
      .then(async (answers) => {
        const { work, gap, set, msg } = answers;
        const pm2Path = await exec("npm list -g pm2");
        pm2Path.stdout.on("data", async (data) => {
          if (!data.includes("pm2@")) {
            await exec(`npm install pm2 -g`);
          }
        });
        await exec(
          `pm2 start ${__dirname}/notify.js -- "${work}" "${gap}" "${set}" "${msg}"`
        );
        console.log(
          chalk.bgGreen.white.bold("\nScheduled Notification turned on!")
        );
      });
  } catch (err) {
    console.log(chalk.bgRed.white.bold("Error Occurred!"));
    console.log(err);
  }
};

module.exports.stop = async () => {
  await exec(`pm2 stop notify`);
  console.log(chalk.bgRed.white.bold("\nScheduled Notification turned off!"));
};
