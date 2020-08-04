require("regenerator-runtime/runtime");

const path = require("path");
const { exec } = require("child_process");
const notifier = require("node-notifier");

const args = process.argv;
const img = path.join(__dirname, "icon.jpg");

(async () => {
  await schedule(args[2], args[3], args[4], args[5]);
  await terminate();
})();

async function schedule(work, gap, set, message) {
  if (work === "  25 Minutes") work = toMilliseconds(25);
  else if (work === "  1 Hour") work = toMilliseconds(60);
  else if (work === "  2 Hours") work = toMilliseconds(120);
  else work = toMilliseconds(25);

  if (gap === "  5 Minutes") gap = toMilliseconds(5);
  else if (gap === "  10 Minutes") gap = toMilliseconds(10);
  else if (gap === "  20 Minutes") gap = toMilliseconds(20);
  else gap = toMilliseconds(5);

  set = parseInt(set);
  set = Number.isInteger(set) ? set : 2;

  while (set--) {
    await doing(work);
    notifier.notify({
      title: "Take a Break 😄",
      message: message,
      icon: img,
    });
    await doing(gap);
    notifier.notify({
      title: "Time's Up 😔",
      message: "Go back to the bugs!",
      icon: img,
    });
  }
}
async function terminate() {
  notifier.notify({
    title: "Done!",
    message: "All sets complete. Good Job 😄",
    icon: img,
  });
  await exec("pm2 stop notify");
}
function toMilliseconds(minute) {
  return minute * 60 * 1000;
}
function doing(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}
