import express from "express";
import { askLLM } from "../configdb/groqClient.js";

const router = express.Router();

router.post("/hint", async (req, res) => {
  try {
    const { question } = req.body;   
const hintPrompt = `
You are an SQL tutor helping a student solve a database question.

Your task:
Give EXACTLY 3 helpful hints that guide the student toward the solution.

Rules:
- Do NOT write the final query.
- Do NOT mention SQL keywords (example: SELECT, WHERE, JOIN, GROUP BY, etc.).
- Do NOT mention exact table or column names.
- Focus on thinking steps, not syntax.
- Hints must be short (1 sentence each).
- Each hint should progressively guide the student closer to the solution.

Question:
${question}

Output format:
 Hint one
 Hint two
 Hint three
`;
    const hints = await askLLM(hintPrompt);

   
    const sortedHints = hints.split("\n").filter((hint) => hint.trim() !== "");

    res.json({ hints: sortedHints });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate hints" });
  }
});

export default router;