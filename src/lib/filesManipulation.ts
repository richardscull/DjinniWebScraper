import fs from "fs";

function stringifyForWidnows(str: string) {
  return str.replace(/[\\/:*?"<>|]/g, "").slice(0, 255);
}

function saveJsonFile(fileName: string, data: any) {
  const dataJson = JSON.stringify(data, null, 2);
  fs.writeFileSync(`./rawData/${stringifyForWidnows(fileName)}.json`, dataJson);
}

function openJsonFile(filePath: string) {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data.toString());
}

export { saveJsonFile, openJsonFile };
