var chalk = require("chalk");

export async function StartDataScience(offers: Offer[]) {
  console.log(chalk.bold.blue("< --- DATA SCIENCE TIME --- >"));
  console.log(chalk.bold.green("📗 English level:"));
  getBestValues(offers, "englishLevel");

  console.log(chalk.bold.yellow("⌚ Expirience:"));
  getBestValues(offers, "expirience");

  console.log(chalk.bold.red("🏢 Work place:"));
  getBestValues(offers, "workPlace");

  console.log(chalk.bold.magenta("📝 Requirements:"));
  getBestValues(parseRequirements(offers), "requirement");
}

function getBestValues(offers: any[], str: any) {
  const levelCounts: Record<string, number> = {};
  offers.forEach((obj) => {
    levelCounts[obj[str]] = (levelCounts[obj[str]] || 0) + 1;
  });

  const percentages: {
    level: string;
    percentage: number;
    totalNumber: number;
  }[] = Object.keys(levelCounts).map((level) => ({
    level,
    percentage: (levelCounts[level] / offers.length) * 100,
    totalNumber: levelCounts[level],
  }));

  percentages.sort((b, a) => a.percentage - b.percentage);
  percentages.forEach((entry) => {
    console.log(
      chalk.bold.white(`${entry.level}: ${entry.percentage.toFixed(2)}%`) +
        ` with ${entry.totalNumber} entries`
    );
  });
  console.log(); // new line
}

function parseRequirements(offers: Offer[]) {
  const requirements: any[] = [];
  offers.forEach((offer) => {
    offer.requirements.forEach((requirement) => {
      requirements.push({ requirement: requirement.toLowerCase() });
    });
  });
  return requirements;
}
