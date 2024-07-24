"use server";
// import fs from "fs";
import { promises as fs } from "fs";

import { parse } from "csv-parse/sync";
import process from "process"; // Ensure process is imported

export async function readCsvFile(filename: string) {
  try {
    // const filePath = path.join(
    //   process.env.FILE_DIRECTORY || process.cwd(),
    //   filename,
    // );

    console.info(`Current working directory: ${process.cwd()}`);
    // console.info(`Reading file from: ${filePath}`);

    const csvData = await fs.readFile(process.cwd() + "/" + filename, "utf8");
    console.info("File read successfully.");

    // Parse CSV data
    const records = parse(csvData, {
      columns: (header) => header.map((h: string) => h.replace(/^\uFEFF/, "")), // Return an array of objects with key-value pairs
      skip_empty_lines: true,
    });

    // Return parsed data
    return records;
  } catch (error) {
    console.error(`Error reading the file ${filename}:`, error);
    throw error;
  }
}
