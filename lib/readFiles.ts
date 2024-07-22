import "server-only";
import fs from "fs";
import path from "path";

export const readCsvFile = (filePath: string) => {
  return fs.readFileSync(path.join(process.cwd(), filePath), "utf8");
};

export const readGeoJsonFile = (filePath: string) => {
  return JSON.parse(
    fs.readFileSync(path.join(process.cwd(), filePath), "utf8"),
  );
};
