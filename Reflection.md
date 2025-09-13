Reflection Questions - Sprint 1: TypeScript CSV Parser

1. Correctness

A "correct" CSV parser needs to handle several key properties:

First, it must preserve data integrity. For example, when I have `Bob,"works at Google, Inc"`, the parser should not split that into three separate fields just because there's a comma inside the quotes. My test for quoted fields failed because the current parser was producing three columns instead of two, revealing this fundamental issue.

The parser should handle edge cases gracefully without crashing. During testing, I found that the basic parser accepts files with inconsistent row lengths and provides no feedback about potential data quality issues. A correct parser should either validate structural consistency or clearly communicate when it encounters unexpected formats.

Finally, the parser should behave consistently - the same input should always produce the same output with no unexpected variations.

2. Random, On-Demand Generation

Random CSV generation would significantly expand testing capabilities beyond manually crafted test cases.

For schema validation testing, random data could systematically violate schemas in different ways to ensure comprehensive error handling. This includes generating files with mismatched column counts, invalid data types, or unexpected field structures.

The random approach would likely uncover edge cases that I wouldn't consider during manual test design. While I focused on obvious failure scenarios, randomly generated data might reveal subtle interactions between features that cause unexpected behavior.

3. Overall Experience, Bugs Encountered and Resolved

Unlike typical assignments where I start with a blank file and build from scratch, this sprint required understanding existing code and identifying its limitations. The testing-first approach was initially challenging - instead of writing code and then verifying it works, I had to write tests to demonstrate where existing code fails.

I encountered several bugs, primarily due to misunderstanding requirements:

The most significant issue was making the schema parameter required instead of optional in my parseCSV function. TypeScript generated confusing error messages when I attempted to call parseCSV without a schema. After considerable debugging time, I realized I needed to add the "?" operator to make the parameter optional. The requirements clearly stated the parser should "fall back to its previous behavior," but I initially overlooked this detail.

What helped prevent other bugs was careful attention to the assignment requirements and frequent reference to the handout when encountering confusion. Starting with simple tests and gradually increasing complexity allowed me to identify problems early rather than facing multiple simultaneous failures.

The emphasis on documentation and error handling was notably different from previous assignments. Rather than just implementing functionality, this sprint required considering how other developers would use the code, which reflects real-world software development practices.