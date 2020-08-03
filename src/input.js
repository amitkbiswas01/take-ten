require("regenerator-runtime/runtime");

const inquirer = require("inquirer");

const { exec } = require("child_process");

module.exports.start = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "work",
        message: "  Pick Work Duration : ",
        choices: ["  25 Minutes", "  1 Hour", "  2 Hours"],
        default: "  25 Minutes",
      },
      {
        type: "list",
        name: "gap",
        message: "  Pick Break duration : ",
        choices: ["  5 Minutes", "  10 Minutes", "  20 Minutes"],
        default: "  5 Minutes",
      },
      {
        name: "set",
        message: "  Enter Number of Work-Break Sets : ",
        default: "2",
      },
      {
        name: "msg",
        message: "  Enter a notification message : ",
        default: "Get up and Drink Water!",
      },
    ])
    .then(async (answer) => {
      const { work, gap, set, msg } = answer;
      const pm2Path = await exec("npm list -g pm2");

      if (pm2Path.toString().includes("pm2@")) {
        await exec(
          `pm2 start ${__dirname}/notify.js -- "${work}" "${gap}" "${set}" "${msg}"`
        );
      } else {
        await exec(
          `npm install pm2 -g && pm2 start ${__dirname}/notify.js -- "${work}" "${gap}" "${set}" "${msg}"`
        );
      }
      console.log("Scheduled Notification turned on!");
    })
    .catch(console.error());
};

module.exports.stop = async () => {
  await exec(`pm2 stop notify`);
  console.log("Scheduled Notification turned off!");
};
