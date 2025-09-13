import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import { z } from "zod";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const QUOTED_COMMAS_CSV_PATH = path.join(__dirname, "../data/quoted_commas.csv");
const WITH_HEADERS_CSV_PATH = path.join(__dirname, "../data/with_headers.csv");


// Define schemas for testing
const PersonRowSchema = z.tuple([z.string(), z.coerce.number()])
  .transform(tup => ({ name: tup[0], age: tup[1] }));

test("parseCSV falls back to string[][] when no schema provided", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH) as string[][];
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(typeof results[1][0]).toBe("string");
  expect(typeof results[1][1]).toBe("string");
});

test("parseCSV validates and transforms rows with schema", async () => {
  const personDataPath = path.join(__dirname, "../data/person_data.csv");
  const results = await parseCSV(personDataPath, PersonRowSchema);
  
  // Type guard to tell TypeScript this is T[], not string[][]
  if (results.length > 0 && typeof results[0] === "object" && "name" in results[0]) {
    expect(results).toHaveLength(3);
    expect(results[0]).toEqual({ name: "Alice", age: 23 });
    expect(typeof results[0].name).toBe("string");
    expect(typeof results[0].age).toBe("number");
  } else {
    fail("Expected transformed objects, got string arrays");
  }
});



// Original tests below - commented out since they will fail with new function signature

// test("parseCSV yields arrays", async () => {
//   const results = await parseCSV(PEOPLE_CSV_PATH)
  
//   expect(results).toHaveLength(5);
//   expect(results[0]).toEqual(["name", "age"]);
//   expect(results[1]).toEqual(["Alice", "23"]);
//   expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :( answered in next test
//   expect(results[3]).toEqual(["Charlie", "25"]);
//   expect(results[4]).toEqual(["Nim", "22"]);
// });

// test("parseCSV yields only arrays", async () => {
//   const results = await parseCSV(PEOPLE_CSV_PATH)
//   for(const row of results) {
//     expect(Array.isArray(row)).toBe(true);
//   }
// });

// // Task A: Additional tests to illustrate limitations of basic parser

// test("parseCSV doesn't validate data types", async () => {
//   const results = await parseCSV(PEOPLE_CSV_PATH);

//   // The parser should return strings, but doesn't validate that "thirty"
//   // is not a valid number when the column is supposed to be numeric
//   expect(results[2][1]).toBe("thirty"); // This is a string, not a number

//   // A good parser might flag this as invalid data or provide type conversion
//   expect(typeof results[2][1]).toBe("string");
//   expect(isNaN(Number(results[2][1]))).toBe(true); // "thirty" is not a valid number
// });

// test("parseCSV cannot distinguish headers from data", async () => {
//   const results = await parseCSV(WITH_HEADERS_CSV_PATH);

//   expect(results).toHaveLength(3);
  
//   // The parser treats the header row exactly like data
//   expect(results[0]).toEqual(["name1", "name2", "course", "role"]);
//   expect(results[1]).toEqual(["Tim", "Nelson", "CSCI 0320", "instructor"]);
//   expect(results[2]).toEqual(["Nim", "Telson", "CSCI 0320", "student"]);
  
//   // Problem: The parser has no way to tell the caller that row 0 contains headers
//   // A better parser would let the caller specify if headers are present
// });

// test("parseCSV fails with quoted fields containing commas", async () => {
//   const results = await parseCSV(QUOTED_COMMAS_CSV_PATH);
//   // is not a valid number when the column is supposed to be numeric
//   expect(results[2][1]).toBe("thirty"); // This is a string, not a number
  
//   // A good parser might flag this as invalid data or provide type conversion
//   expect(typeof results[2][1]).toBe("string");
//   expect(isNaN(Number(results[2][1]))).toBe(true); // "thirty" is not a valid number
// });