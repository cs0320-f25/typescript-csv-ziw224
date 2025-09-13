// Tests for stack Zod schemas

import { StackSchema, sampleStackData, safeValidateStack } from "../src/stack-schema";

describe("Stack Schema with CSV Tests", () => {
  
  test("StackSchema validates sample data", () => {
    const result = StackSchema.parse(sampleStackData);
    expect(result.items).toEqual(["item1", "item2", "item3"]);
    expect(result.maxSize).toBe(5);
  });

  test("safeValidateStack returns success for valid data", () => {
    const result = safeValidateStack(sampleStackData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.items).toHaveLength(3);
    }
  });

});