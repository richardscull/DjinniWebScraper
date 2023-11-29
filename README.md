Low-effort project to get most popular requirements from Djinni.co

Usage:

0. npm install with all dep.

1. If you want to use OpenAi, add your Api Token like so:

```env
OPENAI_API_KEY=your-api-token
```

2. Run the program using `npm run start`

3. Enter the query you're wishing to look for.

4. Get the result!

How get stats from raw data:

1. be sure you have builded version (use tsc if not)

2. Run node build/main.js with path to file. Example: `node build/main.js "C:\DjinniWebScraper\rawData\Node.js-2023-07-27T07-0000.json"
