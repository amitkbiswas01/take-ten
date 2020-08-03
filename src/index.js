#!/usr/bin/env node

require("regenerator-runtime/runtime");

const program = require("commander");

const pkg = require("../package.json");
const { start, stop } = require("./input");

program
  .version(pkg.version)
  .command("start")
  .description("START background process for push-notification")
  .action(start);
program
  .command("stop")
  .description("STOP background process for push-notification")
  .action(stop);

program.parse(process.argv);
