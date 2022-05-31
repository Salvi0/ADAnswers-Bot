# ADAnswers-Bot

[![CodeFactor](https://www.codefactor.io/repository/github/earthernsence/adanswers-bot/badge)](https://www.codefactor.io/repository/github/earthernsence/adanswers-bot)
[![Release](https://img.shields.io/github/v/release/earthernsence/ADAnswers-Bot?label=Release&color=brightgreen&cacheSeconds=3600)](https://github.com/earthernsence/ADAnswers-Bot/releases/latest)

## Image credits

Challenge art by @MrKrutaman#1705

## Commands

You may be looking for the commands list site. If so, go [here](https://earthernsence.github.io/ADAnswers-Bot/docs/)!

## Welcome

Hello! Welcome to the ADAnswersBot codebase. You may have noticed that the code is terrible. This is fine, because the bot works. However, here are some guidelines for contributing and how to contribute.

## Issues

The issues tab is my best friend for keeping track of what to do for each bot version. If you have anything you want to see but don't want to code it yourself, make an issue for it!

## How to contribute

### Step 1

Navigate to the /commands folder. In this folder, you can find all commands.

### Step 2

Quiz yourself! What kind of command are you trying to make?

```
`Page 1 covers until break infinity
 Page 2 rest of infinity era + achievements and swipe trick
 Page 3 is eternity, pre ECs
 Page 4 is ECs + Dilation
 Pages 5, 6, 7, 8 is some more common game info stuff and/or bot functions
 Page 69 is where the fun's at
```

Depending on what kind of command you want, this will determine the `number` attribute in your command. Everything else is handled in the backend.

### Step 3

Navigate back to /commands, and create a new file! There is also a readme there for further help. I recommend checking out something like meta.js to see how args work in action. Args are passed as an array in, so be wary of that.

### Step 3.5

I also do recommend checking out /classes as that will be an insight to what each class does. `Command` is the base class, with all of the others `extend`ing it. Most of these are appropriately named; however, TimeStudyCommand.js also is what's used in eternitychallenge.js. Most commands, however, do just stick with the base class as they need no further functionality. In the /commands readme I go into further depth on how to create a command. Just remember the number you came up with from step 2.

### Step 4 (Optional)

Run the code! You will need to have node.js installed and using a local copy of this code to test things out, as well as the dependencies. You'll need to set up a discord bot on your [Discord](https://discord.com/developers/applications) for testing.

### Step 5

Create a PR. I will take a look and see if it's something that should be added. Thanks for contributing!

## Guidelines

When contributing, be sure to be serious with your suggestion. This is a real, live, bot being used in a server with thousands of people!

### Code quality

Install an ESLint extension to be able to conform to style guidelines.

### Functions

When adding new functions, PLEASE use functions.js! You will need to add them as an export to the `module.exports` line, but it should be relatively straightforward. Also make sure to use JSDoc to document them. If you're unaware of what JSDoc is, see the next section.

## Other important information

### IDE and other important things for it

[**Visual Studio Code**](https://code.visualstudio.com/): Allows you to install these extensions and I know for a fact it will work. VSC is a generally good starting IDE. However, some people may prefer Visual Studio or maybe Atom. I have no idea about if Atom has these extensions or not, which is why I recommend VSC.

[**ESLint**](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint):
ESLint will take the two ESLint files in this repo and use them as the settings. Install it globally; it will improve any JS you do, as long as you have the ESLint files for it.

[**GitLens**](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens):
I only recommend having GitLens to see who worked in what files when. It is updated on commit.

[**GitHub Desktop**](https://desktop.github.com/): For contributing. It is (generally) easier to make new branches/commits/PRs and whatnot. However, if you are well versed in Git, unlike myself, you can get away with using it.

[**JSDoc**](https://jsdoc.app/) (and also the [**Github site**](https://github.com/jsdoc/jsdoc)): JSDoc is a simple and intuitive way of documenting JS files. It is used in functions.js exclusively. Every function will be documented. You may not need to install it to get the functionality of it in your IDE when typing `/**`, but for actually building it to the /out folder you will need to install it using NPM. Head to Command Prompt and paste in `npm install -g jsdoc`. This will install JSDoc to your machine and will allow you to build to /out. When you create a new function, document it like you see on previous commands, and then when you have done that, go to your Command Prompt once again and go to the directory the bot repository is in. Once you have done that, do `jsdoc functions.js` and it will build to /out. To make sure this is done, navigate to the /out folder in your browser and make sure your new command is there. If it is, cool, you're done! If not, you may have messed something up, but do not fret! Get in touch with me and I'll see what I can do.

### config.json

![image](https://i.imgur.com/WuAs6b5.png)

**^^^Mine looks like this^^^**

There is a file that I hold locally due to it having sensitive information surrounding the bot. I'm sure you see it in use all over the place. You will NEED to have your own copy of this. Navigate to config.txt to grab your own copy of it, and turn it into a .json file by renaming it with that extension. Be sure to put your application token there where it asks for token, or else your bot won't be able to log in when testing!

### Feel free to reach out to me!

I made this mess of a codebase, and I'm glad you're frolicking in it! But if you're ever confused on what to do, please get out to me on discord @earth#1337. I would be happy to help! I may not help for a few hours at a time due to schooling etc. but I will get back to you first chance I get!
