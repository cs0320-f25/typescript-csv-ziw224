import { parseCSV } from "../src/basic-parser";
import * as path from "path";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const QUOTED_COMMAS_CSV_PATH = path.join(__dirname, "../data/quoted_commas.csv");
const WITH_HEADERS_CSV_PATH = path.join(__dirname, "../data/with_headers.csv");

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :( answered in next test
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

// new test cases added below

test("parseCSV doesn't validate data types", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH);

  // The parser should return strings, but doesn't validate that "thirty"
  // is not a valid number when the column is supposed to be numeric
  expect(results[2][1]).toBe("thirty"); // This is a string, not a number

  // A good parser might flag this as invalid data or provide type conversion
  expect(typeof results[2][1]).toBe("string");
  expect(isNaN(Number(results[2][1]))).toBe(true); // "thirty" is not a valid number
});
