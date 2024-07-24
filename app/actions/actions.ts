"use server";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

export async function readCsvFile(filename: string) {
  try {
    const filePath = path.join(process.cwd(), filename);
    const csvData = await fs.promises.readFile(filePath, "utf8");

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
