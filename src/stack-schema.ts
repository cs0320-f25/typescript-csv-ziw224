// Supplemental Challenge: Zod schema implementation for Stack data structure

import { z } from "zod";

/**
 * This implementation represents a stack as a JSON object with two properties:
 * - `items`: An array of strings representing the stack contents, where the last 
 *   element is conceptually the "top" of the stack
 * - `maxSize`: A positive integer defining the maximum capacity of the stack
 * 
 * JSON Format Example:
 * {
 *   "items": ["bottom", "middle", "top"],
 *   "maxSize": 10
 * }
 * 
 * The Zod schema validates:
 * 1. Structure: Ensures the object has the required `items` and `maxSize` properties
 * 2. Type safety: `items` must be an array of strings, `maxSize` must be a number
 * 3. Constraints: `maxSize` must be at least 1 (using .min(1))
 * 
 * Limitations of this JSON representation:
 * - Cannot enforce LIFO (Last-In-First-Out) access patterns - that's behavioral, not structural
 * - No validation that current items count doesn't exceed maxSize (could be added with .refine())
 * - Represents state only, not stack operations (push/pop methods)
 */
export const StackSchema = z.object({
  items: z.array(z.string()),
  maxSize: z.number().min(1),
});
export type Stack = z.infer<typeof StackSchema>;

// Example JSON data that would validate against this schema
export const sampleStackData = {
  items: ["item1", "item2", "item3"],
  maxSize: 5,
};

// If the structure is invalid, it will throw a ZodError
// If valid, it returns the object typed as Stack
export const safeValidateStack = (data: unknown) => {
  const result = StackSchema.safeParse(data);
  if (!result.success) {
    console.error("Validation failed:", result.error);
  }
  return result;
};