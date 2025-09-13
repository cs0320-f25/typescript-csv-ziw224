# Link to my Github Repo:
- https://github.com/cs0320-f25/typescript-csv-ziw224?tab=readme-ov-file#link-to-github-repo

# Sprint 1: TypeScript CSV

### Task B: Proposing Enhancement

- #### Step 1: Brainstorm on your own.
    - Quoted field parsing: doesn't handle commas inside quoted fields
    - Whitespace handling: Incorrectly trims whitespace inside quoted fields
    - Header handling: no way to specify if first row contains headers
    - Type safety: returns only strings, no data type conversion

- #### Step 2: Use an LLM to help expand your perspective.
- (1) Try modifying the above prompt in at least 2 different ways. Create new sessions with the LLM and ask the variant prompts separately. 
 - modification 1: I'm building a CSV parser in TypeScript for other developers to use as a library. The parser currently has a very basic API that just takes a file path and returns string arrays. What configuration options and customization features would make this parser more flexible and useful for different types of applications? What parameters or settings should developers be able to control?
 - modification 2: I'm developing a CSV parser that will be used in production applications where data quality can vary significantly. The current implementation provides minimal error feedback when things go wrong. What kind of error handling, validation, and debugging features are essential for a robust CSV parser? What could go wrong when parsing real-world CSV files, and how should the parser help developers handle these issues?

- (2)  How did the results differ, or remain the same? 

The three prompts revealed different angles on the same parser problems. The original broad prompt provided a comprehensive feature inventory, covering everything from quoted field parsing to streaming capabilities. The second prompt shifted toward specific API design with concrete TypeScript interfaces, offering detailed parameter specifications like `delimiter?: string and fieldParsers?: { [column: string]: (value: string) => any }` for actual implementation. The third one took a risk-management approach identifying failure scenarios and error recovery strategies, such as handling unclosed quotes, encoding mismatches, and providing options to "fill missing columns with null" rather than failing completely. While all three identified core issues like header handling, their framing differed significantly: the original explained what features do, the configuration prompt showed how to implement them, and the production prompt focused on what could go wrong and how to handle it gracefully.


- #### Step 3: use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

- (1) Proper Quoted Field Parsing (Functionality)
    - Source: Homework instruction and Self-identified
    - User Story: As a developer parsing CSV files with address data, I want the parser to correctly handle quoted fields containing commas so that "123 Main St, Apt 2B" remains as one field instead of being split into multiple columns.
    - Acceptance Criteria:
        - Fields enclosed in double quotes are treated as single values
        - Commas inside quoted fields do not trigger column split
        - Escaped quotes (`""`) within quoted fields are converted to literal quotes
        - Whitespace inside quoted fields is preserved exactly
    - Note: I identified this issue while writing additional tests in Task A. One test specifically dealt with comma parsing problems, where "parseCSV fails with quoted fields containing commas" by failing on rows like `Bob,"works at Google, Inc"`. The parser incorrectly recognizes this as three columns instead of two, since the description should remain as one entity and not be separated.

- (2) Configurable Header Handling (Extensibility)
    - Source: Self-identified and Homework instruction
    - User Story: As a developer integrating CSV data into my application, I want to specify whether the first row contains headers and validate them against my expected schema so that I can reliably map CSV columns to my data objects without guessing the file structure.
    - Acceptance Criteria:
        - Parser accepts an optional `hasHeaders` boolean parameter
        - Commas inside quoted fields do not trigger column split
        - Escaped quotes (`""`) within quoted fields are converted to literal quotes
        - Whitespace inside quoted fields is preserved exactly
    - Note: I discovered this limitation while writing tests in Task A, particularly when dealing with header recognition like "name1,name2,course,role". The parser has no way to tell the caller that row 0 contains headers. A better parser would let the caller specify if headers are present.

- (3) Meaningful Error Reporting (Extensibility)
    - Source: LLM suggestion + confirmed by CSV spec research
    - User Story: As a developer debugging CSV parsing issues, I want detailed error messages with line numbers and specific problems so that I can quickly identify and fix data quality issues instead of getting silent failures or generic error messages.
    - Acceptance Criteria:
        - Specific error types (e.g., "MismatchedQuotes", "InconsistentColumns", "InvalidRowLength")
        - Error messages include line/row numbers where problems occur
        - Multiple error collection (don't stop at first error)
        - Errors returned in structured format, not just console.log
    - Note: While testing my parser with various malformed CSV files, I realized how frustrating it is when parsing fails silently or with vague error messages. When my test for escaped quotes failed, I had no idea which specific row caused the problem or what exactly went wrong. Better error reporting would save significant debugging time.

- (4) Row Consistency Validation (Functionality)
    - Source: Self-identified + confirmed by CSV spec research
    - User Story: As a developer processing structured data, I want the parser to validate that all rows have the same number of columns as the header row so that I can detect malformed CSV files early and handle them appropriately rather than getting inconsistent data structures.
    - Acceptance Criteria:
        - Optional strict mode that enforces consistent column counts
        - Configurable behavior for handling inconsistent rows (skip, error, or pad with empty values)
        - Report which rows have mismatched column counts
        - Preserve original row numbers in error reporting
    - Note: During my testing, I created a file with inconsistent row lengths and noticed the parser blindly accepted rows with different column counts. This creates unpredictable data structures that could crash downstream code. A production parser should catch these structural inconsistencies early rather than passing malformed data to the application.

### Design Choices

### 1340 Supplement

- #### 1. Correctness

- #### 2. Random, On-Demand Generation

- #### 3. Overall experience, Bugs encountered and resolved
#### Errors/Bugs:
#### Tests:
#### How To…

#### Team members and contributions (include cs logins):

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):
#### Total estimated time it took to complete project:
#### Link to GitHub Repo:  
