# **Take-Ten**

**take-ten** is a node.js CLI based timer to schedule breaks and send push notifications directly to your computer! It loosely follows the Pomodoro technique of working and taking breaks in-between.

## **Pre-requisites :**

- Node.js : Installation guideline [here.](https://nodejs.dev/)
- PM2 : PM2 is a process manager for running background tasks. **take-ten** requires pm2 to run notification daemon so it'll be installed automatically while running **take-ten** for the first time. Can be installed explicitly from [here.](https://www.npmjs.com/package/pm2)
- Basic notification libraries/drivers to run [node-notifier.](https://www.npmjs.com/package/node-notifier) These are mostly installed as defaults in various OS. List can be found [here.](https://github.com/mikaelbr/node-notifier#requirements)

## **Installation**

```bash
npm install take-ten -g
```

## **Usage:**

To start take-ten , run `take-ten start` from command-line.
To stop, run `take-ten stop`.

```bash
take-ten [options][command]

Options:
-V, --version output the version number
-h, --help display help for command

Commands:
start START background process for push-notification
stop STOP background process for push-notification
help [command] display help for command

```

after starting , user will be prompted as below,

1. Pick a work duration. **take-ten** will send a push-notification after this amount of time. _**default: 25 minutes**_

```bash
?   Pick Work Duration :  (Use arrow keys)
❯   25 Minutes
    1 Hour
    2 Hours
```

2. Pick a break duration. **take-ten** will send a push-notification after this amount of time informing the break session is over! _**default: 5 minutes**_

```bash
?   Pick Break duration :  (Use arrow keys)
❯   5 Minutes
    10 Minutes
    20 Minutes
```

3. Enter how many cycles of work-break set wll be needed. _**default: 2**_

```bash
?   Enter Number of Work-Break Sets :  (2)
```

4. Any custom message to remind that break-time has began! _**Get up and Drink Water!**_

```bash
?   Enter a notification message :  (Get up and Drink Water!)
```

## **To be noted :**

Remember to run the _stop_ command after you're done otherwise a small _pm2_ process will keep running in the background. Also you can monitor/edit/stop the app directly using _pm2_. For that, run `pm2 ls` and look for the process named `notify`. That process can treated as a normal _pm2_ process.

## **Issues :**

- None that I know of. The app is very simple and straightforward at this stage. I have never developed anything publishable till now and am very new to JS altogether. so if there is a problem, There is a high chance might have missed that! Please open an issue or pull to fix any problem 😊

## **Upcoming features :**

- automatic stop process \*\*
- custom work and break time \*\*
- adding notification sound \*
- option to add image and title to the notification \*
