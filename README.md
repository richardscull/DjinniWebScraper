### Low-effort project to get most popular requirements from Djinni.co

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

2. Run node build/main.js with path to file. Example: `node build/main.js "C:\DjinniWebScraper\rawData\Node.js-2023-07-27T07-0000.json"`

Example result with query `Node.js`: 

```
< --- DATA SCIENCE TIME --- >
📗 English level:
Upper-Intermediate: 55.04% with 153 entries
Intermediate: 27.34% with 76 entries
None: 16.19% with 45 entries
Pre-Intermediate: 1.44% with 4 entries

⌚ Expirience:
5 years of experience: 45.68% with 127 entries
3 years of experience: 31.29% with 87 entries
2 years of experience: 10.79% with 30 entries
1 year of experience: 10.43% with 29 entries
No experience: 1.80% with 5 entries

🏢 Work place:
Full Remote: 51.80% with 144 entries
Office or Remote: 29.14% with 81 entries
Hybrid Remote: 11.15% with 31 entries
Office Work: 7.91% with 22 entries

📝 Requirements:
node.js: 8.39% with 241 entries
typescript: 4.45% with 128 entries
javascript: 4.00% with 115 entries
mongodb: 2.57% with 74 entries
aws: 2.47% with 71 entries
postgresql: 2.40% with 69 entries
...
```
