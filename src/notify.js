require("regenerator-runtime/runtime");

const path = require("path");
const notifier = require("node-notifier");

const args = process.argv;
schedule(args[2], args[3], args[4], args[5]);

async function schedule(work, gap, set, message) {
  if (work === "  25 Minutes") work = toMilliseconds(25);
  if (work === "  1 Hour") work = toMilliseconds(60);
  if (work === "  2 Hours") work = toMilliseconds(120);

  if (gap === "  5 Minutes") gap = toMilliseconds(5);
  if (gap === "  10 Minutes") gap = toMilliseconds(10);
  if (gap === "  20 Minutes") gap = toMilliseconds(20);

  set = parseInt(set);
  // const img = String(`${__dirname}/icon.jpg`);

  while (set--) {
    await doing(work);
    notifier.notify({
      title: "Take a Break 😄",
      message: `${message}`,
    });
    await doing(gap);
    notifier.notify({
      title: "Back to Work 😔",
      message: `Time to go back!`,
    });
  }
}
function toMilliseconds(minute) {
  return minute * 60 * 1000;
}
function doing(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}
