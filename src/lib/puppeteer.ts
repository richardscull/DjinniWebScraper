import { Browser } from "puppeteer";
import { englishLevels, workPlaces } from "../utils";

async function getPagesNumber(query: string, browser: Browser) {
  const page = await browser.newPage();
  await page.goto(`https://djinni.co/jobs/?all-keywords=${query}`, {
    waitUntil: "domcontentloaded", // Wait for page to load
  });
  const pages = await page.evaluate(() => {
    const pages = document.querySelector(".pagination")?.querySelectorAll("a");
    if (!pages) return 1;
    const pagesArray = Array.from(pages!);
    const lastPage = pagesArray[pagesArray.length - 2].textContent;
    return lastPage;
  });
  return pages;
}

async function getOffersFromPage(
  query: string,
  browser: Browser,
  pageNum?: number
) {
  const page = await browser.newPage();
  await page.goto(
    `https://djinni.co/jobs/?all-keywords=${query}${
      pageNum ? `&page=${pageNum}` : ""
    }`,
    {
      waitUntil: "domcontentloaded", // wait for page to load
    }
  );
  const offers = await page.evaluate(
    (englishLevels, workPlaces) => {
      const offers = document.querySelectorAll(".list-jobs__item");
      const offersArray = Array.from(offers);

      const offersData = offersArray.map((offer) => {
        if (!offer) return null;

        // ? not sure if we need it
        // const offerId = offer.id.split("-")[2];

        const jobDescription = offer
          .querySelector("span[data-original-text]")
          ?.getAttribute("data-original-text")!
          .replace(/<\/?b>/g, "")
          .replace(/<br>/g, "\n");
        const subInfo = offer.querySelector(".job-list-item__job-info");
        let expirience = "";
        let workPlace = "";
        let englishLevel = "None";

        Array.from(subInfo!.querySelectorAll("span")).forEach((span) => {
          const text = span.textContent?.split(" ").slice(2).join(" ") || "";

          if (text.includes("experience")) {
            expirience = text;
          }

          if (workPlaces.includes(text)) {
            workPlace = text;
          }

          if (englishLevels.includes(text)) {
            englishLevel = text;
          }
        });

        const offerData = {
          date: offer
            .querySelector(".job-list-item__counts")
            ?.querySelector("span")
            ?.querySelector(".mr-2[title]")
            ?.textContent!.trim(),
          expirience: expirience || undefined,
          workPlace: workPlace || undefined,
          englishLevel: englishLevel,
          requirements: jobDescription!.split("\n").filter((str) => str),
        };
        return offerData;
      });
      return offersData;
    },
    englishLevels,
    workPlaces
  );

  return offers;
}

export { getPagesNumber, getOffersFromPage };
