import { Router } from "express";
import { analyzeText } from "../services/openai";
const router = Router();

router.post("/analyze", async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: "content required" });
  const result = await analyzeText(content);
  res.json(result);
});

export default router;
