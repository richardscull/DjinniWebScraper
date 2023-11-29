import puppeteer from "puppeteer";
import { StartDataScience } from "./lib/dataScience";
import chalk from "chalk";
import cliProgress from "cli-progress";
import { getQuery, getUseAI } from "./lib/prompts";
import { getOffersFromPage, getPagesNumber } from "./lib/puppeteer";
import { saveJsonFile } from "./lib/filesManipulation";
import { getRequirements } from "./lib/openAi";
require("dotenv").config();

async function main() {
  // If user specified a file, we can skip the scraping part
  if (process.argv[2]) {
    return StartDataScience(require(`${process.argv[2]}`));
  }

  // Get user input
  const query = await getQuery();
  const useAI = await getUseAI();

  if (useAI) {
    if (!process.env.OPENAI_API_KEY) {
      console.log(
        chalk.bold.red("❌ ERROR: ") +
          chalk.bold.white("OPENAI_API_KEY is not defined in .env file")
      );
      process.exit(1);
    }
  }

  // Create progress bar and browser
  const progressBar = new cliProgress.SingleBar(
    cliProgress.Presets.shades_classic
  );
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const allOffers = [];
  const pages = Number(await getPagesNumber(query, browser));

  // Start scraping
  printStartProgress(query, pages);
  progressBar.start(pages, 0, {
    speed: "N/A",
  });

  for (let i = 1; i <= pages; i++) {
    progressBar.increment();
    const offers = await getOffersFromPage(query, browser, i);
    allOffers.push(...offers);
  }

  progressBar.stop();
  console.log(); // new line

  // Use OpenAI if user wants
  if (useAI) {
    printOpenAiProgress(allOffers.length);
    progressBar.start(allOffers.length, 0, {
      speed: "N/A",
    });
    for (let i = 0; i < allOffers.length; i++) {
      progressBar.increment();
      const offer = allOffers[i];
      if (!offer) continue;
      const requirements = await getRequirements(offer.requirements as any);
      offer.requirements = requirements as any;
    }
    progressBar.stop();
    console.log(); // new line
  }

  // Save data
  saveJsonFile(
    `${query}-${new Date().toISOString().replace(":", "-").slice(0, 19)}`,
    allOffers
  );

  // Start data science
  StartDataScience(allOffers as any);
}
main();

function printStartProgress(query: string, pages: number) {
  console.log(chalk.bold.blue("< --- SCRAPING --- >"));
  console.log(chalk.bold.green("🔍 Query: ") + chalk.bold.white(query));
  console.log(chalk.bold.yellow("📄 Pages: ") + chalk.bold.white(pages));
  console.log(); // new line
  console.log(chalk.italic("🕐 Please wait..."));
}

function printOpenAiProgress(offers: number) {
  console.log(chalk.bold.blue("< --- USING OPENAI --- >"));
  console.log(chalk.bold.green("📄 Offers: ") + chalk.bold.white(offers));
  console.log(); // new line
  console.log(chalk.italic("🕐 Please wait..."));
}
