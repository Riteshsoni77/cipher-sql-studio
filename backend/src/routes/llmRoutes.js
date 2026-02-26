import express from "express";
import { askLLM } from "../configdb/groqClient.js";

const router = express.Router();

router.post("/hint", async (req, res) => {
  try {
    const { question } = req.body;   
const hintPrompt = `
Provide exactly 3 high-level hints for the following SQL question.
- Do NOT mention SQL keywords (like SELECT, WHERE, JOIN, etc.)
- Do NOT mention exact column names.
- Do NOT provide the final query.
- Keep hints conceptual, concise, and easy to understand.

Question:
${question}

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