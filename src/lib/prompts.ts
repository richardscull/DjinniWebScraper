import chalk from "chalk";
import inquirer from "inquirer";

async function getQuery() {
  return await inquirer
    .prompt([
      {
        type: "input",
        name: "query",
        message: "For what job are you looking for? (query)",
      },
    ])
    .then((options) => {
      return options.query;
    });
}

async function getUseAI() {
  return await inquirer
    .prompt([
      {
        type: "confirm",
        name: "useAI",
        message: "Do you want to use AI to generate the JSON?",
      },
    ])
    .then((options) => {
      if (options.useAI) {
        console.log(
          chalk.bold.yellow(
            "⚠️  WARNING: " +
              chalk.bold.white("💰💰💰 THIS COST MONEY  U DUMMY! YOU SURE?")
          )
        );
        return inquirer
          .prompt([
            {
              type: "confirm",
              name: "useAI",
              message: "You sure you want to use AI?",
            },
          ])
          .then((options) => {
            return options.useAI;
          });
      }

      return options.useAI;
    });
}

export { getQuery, getUseAI };
